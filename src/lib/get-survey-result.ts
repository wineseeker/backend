import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function getSurveyResult(resultId: number) {
    return prisma.results.findUnique({
        where: {
            id: resultId,
        },
        select: {
            dateTime: true,
            wines: {
                select: {
                    wine: true
                },
            },
        },
    });
}