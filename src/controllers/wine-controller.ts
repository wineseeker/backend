import { Request, Response } from 'express';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export async function getWine(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id) || id === undefined) {
        return res.status(404).send("Not Found");
    }

    const wine = await prisma.wines.findUnique({where: { id: id }});

    if (!wine) {
        return res.status(404).send("Not Found");
    }

    res.json(wine);
}