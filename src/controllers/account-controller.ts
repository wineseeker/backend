import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { isWithinExpirationDate } from "oslo";
import { lucia } from '../lib/lucia-auth.js';

const prisma = new PrismaClient();

export const getUserInfo = async (req: Request, res: Response) => {
    const userInfo = await prisma.user.findUnique({
        where: {
            id: res.locals.user.id,
        },
        select: {
            email: true,
            emailVerified: true,
        },
    });

    if (userInfo === null || userInfo === undefined) {
        return res.status(401).json({ msg: "Not logged in" });
    }

    res.json({
        email: userInfo.email,
        emailVerified: userInfo.emailVerified,
        session: res.locals.session,
    });
};

export const emailVerification = async (req: Request, res: Response) => {
    const user = res.locals.user

    if (typeof req.body.code !== "string") {
        return res.status(400).json({ msg: "Invalid code" });
    }

    const dbCode = await prisma.emailVerificationCode.findUnique({
        where: {
            userId: user.id
        }
    })

    if (!dbCode || dbCode.code !== req.body.code) {
        return res.status(400).json({ msg: "Invalid code" });
    }

    await prisma.emailVerificationCode.delete({
        where: {
            id: dbCode.id
        }
    })

    if (!isWithinExpirationDate(dbCode.expiresAt)) {
        return res.status(400).json({ msg: "Expired code" });
    }

    await prisma.user.update({
        data: {
            emailVerified: true,
        },
        where: {
            id: user.id,
        }
    })

    res.status(200).json({ msg: "OK" });
}

export const logout = async (req: Request, res: Response) => {
    await lucia.invalidateSession(res.locals.session.id);
    res.status(200).json({ msg: "Logged out" });
};
