import { Request, Response } from 'express';
import {Prisma, PrismaClient} from '@prisma/client';
import { verify, hash } from '@node-rs/argon2';
import { lucia } from '../lib/lucia-auth.js';
import { isValidEmail } from '../lib/is-vaild-email.js';
import { generateIdFromEntropySize } from 'lucia';
import {generateEmailVerificationCode} from "../lib/generate-email-verification-code.js";
import {sendVerificationCode} from "../lib/send-verification-code.js";

const prisma = new PrismaClient();

// 로그인 로직
export const login = async (req: Request, res: Response) => {
    const email = req.body.email;
    if (!email || typeof email !== "string") {
        return res.status(400).send("Invalid email");
    }
    const password = req.body.password;
    if (!password || typeof password !== "string") {
        return res.status(400).send(null);
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(400).json({ msg: "Invalid email or password" });
    }

    const validPassword = await verify(user.password_hash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    if (!validPassword) {
        return res.status(400).json({ msg: "Invalid email or password" });
    }

    const session = await lucia.createSession(user.id, {});
    return res.json(session);
};

// 회원가입 로직
export const signup = async (req: Request, res: Response) => {
    const { email, password, retypePw } = req.body;
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
        console.error("Invalid email");
        return res.status(400).json({ code: 1, msg: "Invalid email" });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
        console.error("Invalid password");
        return res.status(400).json({ code: 2, msg: "Invalid password" });
    }
    if (password !== retypePw) {
        console.error("Invalid retype password");
        return res.status(400).json({ code: 3, msg: "Invalid retype password" });
    }

    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    const userId = generateIdFromEntropySize(10); // 16 characters long

    try {
        const user = await prisma.user.create({
            data: {
                id: userId,
                email,
                password_hash: passwordHash,
            }
        });

        // const verificationCode = await generateEmailVerificationCode(userId, email, false);
        // await sendVerificationCode(email, verificationCode);

        const session = await lucia.createSession(user.id, {});
        return res.status(201).json(session);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
            return res.status(400).json({ code: 4, msg: 'Email already used' });
        } else {
            try {
                await prisma.emailVerificationCodes.delete({
                    where: {
                        userId: userId
                    }
                })
                await prisma.user.delete({
                    where: {
                        id: userId,
                    }
                })
            } finally {
                res.status(500).send("Internal error")
            }
        }
    }
};
