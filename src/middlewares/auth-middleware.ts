import { Request, Response, NextFunction } from 'express';
import { lucia } from '../lib/lucia-auth.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const validateSession = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = lucia.readBearerToken(req.headers.authorization?.toString() ?? "");
    if (!sessionId) {
        return res.status(401).json({ msg: "Not logged in" });
    }

    const { session, user } = await lucia.validateSession(sessionId);

    if (session === null || user === null) {
        return res.status(401).json({ msg: "Not logged in" });
    }

    res.locals.session = session;
    res.locals.user = user;

    next();
};
