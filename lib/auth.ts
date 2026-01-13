import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/drizzle";
import { user, session, account, verification } from "../db/schema";
import { nextCookies } from "better-auth/next-js"; // your drizzle instance
import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({user, url}) => {
            await resend.emails.send({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
                to: user.email,
                subject: "Reset your password",
                react: ForgotPasswordEmail({ 
                    username: user.name, 
                    resetLink: url, 
                    userEmail: user.email,
                    token: "", // Token is in interface but not used in component
                    companyName: process.env.COMPANY_NAME || "Pixelpie Studio"
                }),
            })
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            session,
            account,
            verification,
        },
    }),
    plugins: [nextCookies()],
});