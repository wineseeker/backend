import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createDeepFmModel } from "../lib/create-deepfm-model.js";
import { preprocessData } from "../lib/preprocess-data.js";
import {lucia} from "../lib/lucia-auth.js";
import {getSurveyResult} from "../lib/get-survey-result.js";

const prisma = new PrismaClient();

export async function recommend(req: Request, res: Response) {
    //로그인 여부 확인
    let userId = null
    const sessionId = lucia.readBearerToken(req.headers.authorization?.toString() ?? "");

    if (sessionId) {
        const {  user } = await lucia.validateSession(sessionId);
        if (user !== null) {
            userId = user.id;
        }
    }

    try {
        const characteristic = req.body[1];
        let wineTypeId = req.body[0];

        wineTypeId = Number(wineTypeId);

        if (!wineTypeId || !characteristic || isNaN(wineTypeId)) {
            return res.status(400).json({ msg: "Invalid request body" });
        }

        const filteredWines = await prisma.wines.findMany({
            where: {
                AND: [
                    { typeId: { equals: wineTypeId } },
                    { body: { gte: characteristic.body - 1.0, lte: characteristic.body + 1.0 } },
                    { alcohol: { gte: characteristic.alcohol - 1.0, lte: characteristic.alcohol + 1.0 } },
                    { acidity: { gte: characteristic.acidity - 1.0, lte: characteristic.acidity + 1.0 } },
                    { sweetness: { gte: characteristic.sweetness - 1.0, lte: characteristic.sweetness + 1.0 } },
                    { tannin: { gte: characteristic.tannin - 1.0, lte: characteristic.tannin + 1.0 } }
                ]
            }
        });

        console.log("filteredWines.length: " + filteredWines.length);

        if (filteredWines.length <= 0) {
            return res.status(204).send();
        }

        let result

        if (filteredWines.length > 11) {
            const deepFMModel = createDeepFmModel(filteredWines.length);
            const { testData, testLabels} = preprocessData(filteredWines);

            // 테스트 데이터에 대한 예측 값을 추출하여 배열로 변환합니다.
            const predictionsArray: any[] = [];
            for (let i = 0; i < testData.shape[0]; i++) {
                const input = testData.slice([i, 0], [1, testData.shape[1]]);
                const prediction = deepFMModel.predict(input);
                let predictionValue;
                if (Array.isArray(prediction)) {
                    predictionValue = prediction[0].dataSync()[0];
                } else {
                    predictionValue = prediction.dataSync()[0];
                }
                predictionsArray.push(predictionValue);
            }

            // 예측된 와인 목록 생성 및 정렬
            const predictedWines = testLabels.arraySync().map((label, index) => ({
                ...filteredWines[index], // 인덱스를 사용하여 원래의 와인 데이터와 매핑
                predicted_like: predictionsArray[index]
            }));

            // 예측된 선호도에 따라 와인을 정렬하고 상위 10개를 선택
            const top10Wines = predictedWines.sort((a, b) => b.predicted_like - a.predicted_like).slice(0, 10);

            result = await prisma.results.create({
                data: {
                    wines: {
                        create: top10Wines.map((wine, index) => ({
                            wineId: wine.id,
                            rank: index + 1,
                        }))
                    },
                    userId: userId
                },
                include: {
                    wines: true,
                }
            });
        } else {
            result = await prisma.results.create({
                data: {
                    wines: {
                        create: filteredWines.sort((a, b) => {
                            if (b.ratingAverage === a.ratingAverage) {
                                return b.ratingCount - a.ratingCount;
                            }
                            return b.ratingAverage - a.ratingAverage;
                        }).map((wine, index) => ({
                            wineId: wine.id,
                            rank: index + 1,
                        }))
                    },
                    userId: userId
                },
                include: {
                    wines: true,
                }
            });
        }

        const body= {
            resultId: result.id,
            result: await getSurveyResult(result.id).then(
                (result) => (
                    result?.wines.map((item) => (item.wine))
                )
            )
        }

        res.json(body);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
