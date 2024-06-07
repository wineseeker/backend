import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function search(req: Request, res: Response) {
    if (typeof req.query.q !== "string")
        return res.status(204).send()

    const page = Number(req.query.page)

    const results = await prisma.wines.findMany({
        skip: 20 * ((isNaN(page) ? 0 : page - 1)),
        take: 20,
        where: {
            name: {
                contains: req.query.q.toString(),
            },
        },
    })

    res.status(200).json(results);
}