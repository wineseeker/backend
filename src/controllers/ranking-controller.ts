import {Request, Response } from 'express'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export async function raking(req: Request, res: Response) {
    const page = Number(req.query.page)

    const results = await prisma.wines.findMany({
        skip: 20 * ((isNaN(page) ? 0 : page - 1)),
        take: 20,
        orderBy: [
            {
                ratingAverage: "desc"
            },
            {
                ratingCount: "desc"
            }
        ]
    })

    res.status(200).json(results);
}