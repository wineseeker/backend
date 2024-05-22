import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSurvey = async (req: Request, res: Response) => {
  const { wine_type, body, alcohol, acidity, sweetness, tannin } = req.body;

  // 입력값 검증
  if (
    typeof wine_type !== 'number' ||
    typeof body !== 'number' ||
    typeof alcohol !== 'number' ||
    typeof acidity !== 'number' ||
    typeof sweetness !== 'number' ||
    typeof tannin !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const survey = await prisma.survey.create({
      data: {
        wine_type,
        body,
        alcohol,
        acidity,
        sweetness,
        tannin,
      },
    });
    return res.status(201).json(survey);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create survey' });
  }
};
