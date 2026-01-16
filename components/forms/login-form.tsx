"use client";

import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signIn } from "@/server/users"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password:"",
    },
  })

  const signInWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard"
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { success, message } = await signIn(values.email, values.password);

    if (success) {
      toast.success(message as string);
      router.push("/dashboard")
    } else {
      toast.error(message as string);
    }
    
    setIsLoading (false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Hola de nuevo</CardTitle>
          <CardDescription>
            Inicia sesión con tu cuenta de Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" onClick={signInWithGoogle}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Inicia sesión con Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                O continua con
              </FieldSeparator>
              <FormField 
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="pxpie@example.com" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}>
              </FormField>
              <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                    placeholder="********"
                    {...field}
                    type="password"
                    />
                  </FormControl>
                  <FormMessage />
              <Link className="ml-auto text-sm underline-offset-4 hover:underline" href="/forgot-password">
                    Forgot your password?
                </Link>
                </FormItem>
              )}>
              </FormField>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="size-4 animate-spin"/> : "Inicia Sesión"}
                  </Button>
                <FieldDescription className="text-center">
                  Aún no tienes una cuenta? <Link href="/signup">Regístrate</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
          </Form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
      Al crear tu cuenta aceptas nuestros <a href="#">Términos de servicios</a>{" "}
        y nuestra <a href="#">Política de privacidad</a>.
      </FieldDescription>
    </div>
  )
}
