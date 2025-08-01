import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import CredeintialProvider from "next-auth/providers/credentials";
import {z} from "zod";
import bcrypt from "bcrypt";

const handler = NextAuth({
    providers: [
        CredeintialProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials){
                const schema = z.object({
                    username: z.string().min(3),
                    password: z.string().min(3),
                })
                const { username, password } = schema.parse(credentials);
                const user = await prisma.user.findUnique({
                    where: {
                        username
                    }
                })
                if(!user) throw new Error("User not found");
                if(!user.password) throw new Error("No password set for this user");
                const valid = await bcrypt.compare(password, user.password);
                if(!valid) throw new Error("Invalid password");
                return {
                    id: user.id,
                    username: user.username,
                    name: user.username
                }
            }
        })
    ],
    session: {strategy: "jwt"},
    pages: {
        signIn: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST };