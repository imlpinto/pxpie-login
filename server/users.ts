"use server";

import { db } from "@/db/drizzle";
import { user, member } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }
    
    const currentUser = await db.query.user.findFirst({
        where: eq(user.id, session.user.id),
    });

    if (!currentUser) {
        redirect("/login");
    }
   
    return {
        ...session,
        currentUser,
    };
};

export const signIn = async (email: string, password: string) => {
    try {
    await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    })

    return {
        success: true,
        message: "Inicio de sesión exitoso."
    }
    } catch (error) {
        const e = error as Error

        return {
            success: false,
            message: e.message || "A ocurrido un error, intenta de nuevo."
        }
    }
}   

export const signUp = async (email: string, password: string, username: string) => {
    try {

    await auth.api.signUpEmail({
        body: {
            email,
            password,
            name: username
        }
    })

    return {
        success: true,
        message: "Registro exitosos."
    }
    } catch (error) {
        const e = error as Error
        
        return {
            success: false, 
            message: e.message || "A ocurrido un error, intenta de nuevo."
        }
    }
}
