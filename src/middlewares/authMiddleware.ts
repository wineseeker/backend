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

    // 사용자 정보를 데이터베이스에서 다시 가져와서 role을 포함한 모든 정보를 설정
    const userWithRole = await prisma.user.findUnique({
        where: { id: user.id },
    });

    if (!userWithRole) {
        return res.status(401).json({ msg: "User not found" });
    }

    console.log('Session validated:', userWithRole); // 사용자 정보 로그 출력

    res.locals.session = session;
    res.locals.user = userWithRole;

    next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.role !== 'ADMIN') {
        console.log('Access denied:', res.locals.user.role); // 거부된 접근 로그 출력
        return res.status(403).json({ msg: "Access denied" });
    }

    console.log('Admin access granted:', res.locals.user.role); // 관리자 접근 로그 출력

    next();
};
