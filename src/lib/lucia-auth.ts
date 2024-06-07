import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from "@prisma/client";
import { Lucia } from "lucia";

const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email,
            emailVerified: attributes.emailVerified,
        };
    }

});

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    email: string;
    emailVerified: boolean;
}