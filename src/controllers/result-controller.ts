import express from "express";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export async function getResult(req: express.Request, res: express.Response) {
    const id = Number(req.params.id);

    if (isNaN(id) || id === undefined) {
        return res.status(404).send("Not Found");
    }

    const result = await prisma.resultWine.findMany({
        where: { resultId: id },
        include: {
            wine: true
        },
        orderBy: {
            rank: "asc"
        }
    })

    if (result.length <= 0) {
        return res.status(404).send("Not Found");
    }

    const resBody: any[] = []

    result.map(item => {
        resBody.push(item.wine);
    })

    res.json(resBody);
}