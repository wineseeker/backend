import { PrismaClient } from "@prisma/client";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";

const prisma = new PrismaClient()

export async function generateEmailVerificationCode(userId: string, email: string, emailChangeReq: boolean): Promise<string> {

    const existedEmailVerificationCode = await prisma.emailVerificationCodes.count({
        where: {
             userId: userId
         }
    })

    if (existedEmailVerificationCode > 0) {
        await prisma.emailVerificationCodes.delete({
            where: {
                userId: userId
            }
        })
    }
    
    const code = generateRandomString(8, alphabet("0-9"));

    await prisma.emailVerificationCodes.create({
        data: {
            userId,
            email,
            code,
            expiresAt: createDate(new TimeSpan(15, "m")), // 15 minutes
            emailChangeReq,
        }
    })
    return code;
}