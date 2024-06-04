import express from "express";
import {PrismaClient} from "@prisma/client";
import {getSurveyResult} from "../lib/get-survey-result.js";

const prisma = new PrismaClient()

export async function getResult(req: express.Request, res: express.Response) {
    const id = Number(req.params.id);

    if (isNaN(id) || id === undefined) {
        return res.status(404).send("Not Found");
    }

    const result = await getSurveyResult(id);

    if (result.length <= 0) {
        return res.status(404).send("Not Found");
    }

    res.json(result);
}