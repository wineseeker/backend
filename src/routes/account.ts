import express, {Router} from "express";
import {lucia} from "../lib/lucia-auth.js";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
const router = Router();

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // 세션 유효성 검사
    const sessionId = lucia.readBearerToken(req.headers.authorization?.toString() ?? "")
    if (!sessionId) {
        return res.status(401).json({msg: "Not logged in"})
    }

    const { session, user } = await lucia.validateSession(sessionId);

    res.locals.session = session;
    res.locals.user = user;

    next();
});

router.get("/", async (req: express.Request, res: express.Response) => {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    const userInfo = await prisma.user.findUnique({
        where: {
            id: res.locals.user.id,
        },
        select: {
            email: true
        }
    })

    if (userInfo === null || userInfo === undefined) {
        return res.status(401).json({msg: "Not logged in"})
    }

    res.json({
        email: userInfo.email,
        session: res.locals.session
    })
})

export default router;