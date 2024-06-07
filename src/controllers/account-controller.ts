import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { isWithinExpirationDate } from "oslo";
import { lucia } from '../lib/lucia-auth.js';
import {generateEmailVerificationCode} from "../lib/generate-email-verification-code.js";
import {sendVerificationCode} from "../lib/send-verification-code.js";

const prisma = new PrismaClient();

export const getUserInfo = async (req: Request, res: Response) => {
    const user = res.locals.user

    if (user === null || user === undefined) {
        return res.status(401).json({ msg: "Not logged in" });
    }

    res.json({
        email: user.email,
        emailVerified: user.emailVerified,
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

export const verificationEmailResend = async (req: Request, res: Response) => {
    const userId = res.locals.user.id
    const email = res.locals.user.email

    try {
        const verificationCode = await generateEmailVerificationCode(userId, email);
        await sendVerificationCode(email, verificationCode);
        res.status(204).send()
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Internal error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    await lucia.invalidateSession(res.locals.session.id);
    res.status(200).json({ msg: "Logged out" });
};
