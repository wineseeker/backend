import {Router} from "express";
import {isValidEmail} from "../lib/is-vaild-email.js";
import {lucia} from "../lib/lucia-auth.js";
import {hash} from "@node-rs/argon2";
import { PrismaClient } from '@prisma/client'
import {generateIdFromEntropySize} from "lucia";

const prisma = new PrismaClient()
const router = Router()

router.post('/', async (req, res) => {
    /*  #swagger.path = '/signup'
        #swagger.tags = ['auth']
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/emailPasswordSchema"
                    }
                }
            }
        }
    */
    const email = req.body.email
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
        return res.status(400).send("email")
    }
    const password = req.body.password;
    if (!password || typeof password !== "string" || password.length < 6) {
        return res.status(400).send("password")
    }

    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    const userId = generateIdFromEntropySize(10); // 16 characters long

    try {
        await prisma.user.create({
            data: {
                id: userId,
                email,
                password_hash: passwordHash
            }
        });

        const session = await lucia.createSession(userId, {});
        return res.status(200).json(session)
    } catch {
        // db error, email taken, etc;
        return res.status(400).send('Email already used')
    }
})

export default router