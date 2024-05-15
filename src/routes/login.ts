import { Router } from 'express';
import {PrismaClient} from "@prisma/client";
import { verify } from "@node-rs/argon2";
import {lucia} from "../lib/lucia-auth.js";

const prisma = new PrismaClient()
const router = Router()

router.post("/", async (req, res) => {
    /*  #swagger.path = '/login'
        #swagger.tags = ['auth']
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/loginSchema"
                    }
                }
            }
        }
    */
    const email = await req.body.email;
    if (!email || typeof email !== "string") {
        return res.status(400).send("Invalid email")
    }
    const password = await req.body.password;
    if (!password || typeof password !== "string") {
        return res.status(400).send(null)
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (!user) {
        // NOTE:
        // Returning immediately allows malicious actors to figure out valid emails from response times,
        // allowing them to only focus on guessing passwords in brute-force attacks.
        // As a preventive measure, you may want to hash passwords even for invalid emails.
        // However, valid emails can be already be revealed with the signup page
        // and a similar timing issue can likely be found in password reset implementation.
        // It will also be much more resource intensive.
        // Since protecting against this is non-trivial,
        // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
        // If emails/usernames are public, you may outright tell the user that the username is invalid.
        return res.json({msg: "Invalid email or password"}).status(400)
    }

    const validPassword = await verify(user.password_hash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    if (!validPassword)
        return res.status(400).json({msg: "Invalid email or password"})

    const session = await lucia.createSession(user.id, {});
    return res.json(session);
});

export default router