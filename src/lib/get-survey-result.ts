import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function getSurveyResult(resultId: number) {
    const result = await prisma.resultWine.findMany({
        where: {resultId: resultId},
        select: {
            wine: true,
        },
        orderBy: {
            rank: "asc"
        }
    })

    const resultArr: any[] = []

    result.map(item => {
        resultArr.push(item.wine);
    })

    return resultArr
}