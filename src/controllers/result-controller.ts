import express from "express";
import {getSurveyResult} from "../lib/get-survey-result.js";

export async function getResult(req: express.Request, res: express.Response) {
    const id = Number(req.params.id);

    if (isNaN(id) || id === undefined) {
        return res.status(404).send("Not Found");
    }

    const result = await getSurveyResult(id);

    if (result === null) {
        return res.status(404).send("Not Found");
    }

    const body = {
        dateTime: result.dateTime,
        result: result.wines.map(item => item.wine)
    }

    res.json(body);
}