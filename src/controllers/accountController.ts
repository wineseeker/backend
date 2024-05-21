import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { lucia } from '../lib/lucia-auth.js';

const prisma = new PrismaClient();

export const getUserInfo = async (req: Request, res: Response) => {
    const userInfo = await prisma.user.findUnique({
        where: {
            id: res.locals.user.id,
        },
        select: {
            email: true,
        },
    });

    if (userInfo === null || userInfo === undefined) {
        return res.status(401).json({ msg: "Not logged in" });
    }

    res.json({
        email: userInfo.email,
        session: res.locals.session,
    });
};

export const logout = async (req: Request, res: Response) => {
    await lucia.invalidateSession(res.locals.session.id);
    res.status(200).json({ msg: "Logged out" });
};
