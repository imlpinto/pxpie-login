import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/drizzle";
import { 
    account, 
    schema, 
    session, 
    user, 
    verification,
    organization,
    member,
    invitation } from "../db/schema";
import { nextCookies } from "better-auth/next-js"; // your drizzle instance
import { Resend } from "resend";
import { organization as organizationPlugin } from "better-auth/plugins";
import ForgotPasswordEmail from "@/components/emails/reset-password";
import VerifyEmail from "@/components/emails/verify-email";
import { getActiveOrganization } from "@/server/organizations";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
    emailVerification: {
        sendVerificationEmail: async ({user, url }) => {
            await resend.emails.send({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
                to: user.email,
                subject: 'Verifica tu correo',
                react: VerifyEmail({username: user.name, verifyUrl: url}),
            });
        },
        sendOnSignUp: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({user, url}) => {
            await resend.emails.send ({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
                to: user.email,
                subject: "Restablece tu contraseña",
                react: ForgotPasswordEmail({ 
                    username: user.name, 
                    userEmail: user.email, 
                    resetUrl: url 
                }),
            })
        },
        requireEmailVerification: true,
    },
    databaseHooks: {
        session: {
            create: {
                before: async(session)=>{
                    const organization = await getActiveOrganization(session.userId)
                    return {
                        data: {
                        ...session,
                        activeOrganizationId: organization?.id
                    }
                }
            }
        }
    }
},
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            schema,
            user, 
            session,
            account,
            verification,
            organization, 
            member,
            invitation,
        }
    }),
    plugins: [organizationPlugin(), nextCookies()],
});