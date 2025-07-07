// lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            user_type?: string;
        }
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Check for admin credentials first
                const admin = await prisma.admin.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (admin && await bcrypt.compare(credentials.password, admin.password)) {
                    return {
                        id: String(admin.id),
                        name: admin.name || "",
                        email: admin.email,
                        user_type: "admin"
                    };
                }

                // If not admin, check for voter
                const voter = await prisma.voter.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!voter || !await bcrypt.compare(credentials.password, voter.password)) {
                    return null;
                }

                return {
                    id: String(voter.id),
                    name: voter.name || "",
                    email: voter.email,
                    user_type: "voter"
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as number;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.user_type = token.user_type as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.user_type = (user as any).user_type;
            }
            return token;
        },
    },
};