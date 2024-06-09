import { Request, Response } from 'express';
import {Prisma, PrismaClient} from '@prisma/client';
import { isWithinExpirationDate } from "oslo";
import { lucia } from '../lib/lucia-auth.js';
import {generateEmailVerificationCode} from "../lib/generate-email-verification-code.js";
import {sendVerificationCode} from "../lib/send-verification-code.js";
import {hash, verify} from "@node-rs/argon2";
import {generateIdFromEntropySize} from "lucia";
import {isValidEmail} from "../lib/is-vaild-email.js";

const prisma = new PrismaClient();

async function validPassword(userId: string, userPassword: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (user === null) {
        return null
    }

    return await verify(user.password_hash, userPassword, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
}

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
        return res.status(400).json({ code: 1, msg: "Invalid code" });
    }

    const dbCode = await prisma.emailVerificationCodes.findUnique({
        where: {
            userId: user.id
        }
    })

    if (!dbCode || dbCode.code !== req.body.code) {
        return res.status(400).json({ code: 1, msg: "Invalid code" });
    }

    await prisma.emailVerificationCodes.delete({
        where: {
            id: dbCode.id
        }
    })

    if (!isWithinExpirationDate(dbCode.expiresAt)) {
        return res.status(400).json({ code: 2, msg: "Expired code" });
    }

    if (user.id !== dbCode.userId)
        return res.status(400).json({ code: 1, msg: "Invalid code" });

    if (user.email !== dbCode.email) {
        if (dbCode.emailChangeReq) {
            try {
                await prisma.user.update({
                    data: {
                        email: dbCode.email
                    },
                    where: {
                        id: user.id
                    }
                })
            } catch (err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
                    return res.status(400).json({ code: 3, msg: 'Email already used' });
                }
            }
        } else {
            return res.status(400).json({ code: 1, msg: "Invalid code" });
        }
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
        const verificationCode = await generateEmailVerificationCode(userId, email, false);
        await sendVerificationCode(email, verificationCode);
        res.status(204).send()
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Internal error" });
    }
}

export const requestEmailChange = async (req: Request, res: Response) => {
    const userId = res.locals.user.id
    const newEmail = req.body.newEmail
    const password = req.body.password

    const user = await prisma.user.findUnique({
        where: { id: userId },
    })

    if (!user) {
        console.log("err code: -1")
        return res.status(400).json({ code: -1, msg: "Invalid request" });
    }

    const validPassword = await verify(user.password_hash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    if (!validPassword) {
        console.log("err code: 1")
        return res.status(400).json({ code: 1, msg: "Invalid password" });
    }

    if (typeof newEmail !== "string" || !isValidEmail(newEmail)) {
        console.error("Invalid email");
        return res.status(400).json({ code: 2, msg: "Invalid email" });
    }

    const newEmailCount = await prisma.user.count({
        where: {
            email: newEmail
        }
    })

    if (newEmailCount > 1)
        return res.status(400).json({ code: 3, msg: "Already used email" });

    try {
        const verificationCode = await generateEmailVerificationCode(userId, newEmail, true);
        await sendVerificationCode(newEmail, verificationCode);
        res.status(204).send()
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Internal error" });
    }
}

export const changePassword = async (req: Request, res: Response) => {
    const userId = res.locals.user.id
    const password = req.body.password
    const newPassword = req.body.newPassword;
    const retypeNewPw = req.body.retypeNewPw;


    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (user === null) {
        return res.status(401).json({ msg: "Not logged in" });
    }

    const matchPassword = await validPassword(userId, password)
    if (matchPassword === null) {
        return res.status(401).json({ msg: "Not logged in" });
    } else if (!matchPassword) {
        return res.status(400).json({ code: 1, msg: "Invalid password" });
    }

    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
        console.error("Invalid new password");
        return res.status(400).json({ code: 2, msg: "Invalid new password" });
    }
    if (newPassword !== retypeNewPw) {
        console.error("Invalid retype password");
        return res.status(400).json({ code: 3, msg: "Invalid retype password" });
    }

    const passwordHash = await hash(newPassword, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    try {
        await prisma.user.update({
            data: {
                password_hash: passwordHash,
            },
            where: {
                id: userId
            }
        })

        res.status(204).send()
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error")
    }
}

export const getRecommendHistory = async (req: Request, res: Response) => {
    const userId: string = res.locals.user.id.toString()
    const cursorId = Number(req.query.cursorId)

    try {
        const args: any = {
            take: 20,
            select: {
                id: true,
                dateTime: true
            },
            where: {
                userId: userId
            },
            orderBy: {
                id: 'desc',
            }

        }

        if (!isNaN(cursorId)) {
            args.skip = 1
            args.cursor = {
                id: cursorId
            }
        }

        const results = await prisma.results.findMany(args)

        res.status(200).json(results)
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error")
    }
}

export const logout = async (req: Request, res: Response) => {
    await lucia.invalidateSession(res.locals.session.id);
    res.status(200).json({ msg: "Logged out" });
};

export const deleteAccount = async (req: Request, res: Response) => {
    const userId = res.locals.user.id
    const password = req.body.password

    const matchPassword = await validPassword(userId, password)
    if (matchPassword === null) {
        return res.status(401).json({ msg: "Not logged in" });
    } else if (!matchPassword) {
        return res.status(400).json({ code: 1, msg: "Invalid password" });
    }

    try {
        const passwordHash = await hash(generateIdFromEntropySize(40), {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        await prisma.user.update({
            data: {
                leaved: true,
                leavedAt: new Date(),
                email: null,
                password_hash: passwordHash,
                emailVerified: false
            },
            where: {
                id: userId
            }
        })

        await lucia.invalidateUserSessions(userId);

        res.status(204).send()
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error")
    }
}