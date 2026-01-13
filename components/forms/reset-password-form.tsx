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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export function ForgotPasswordForm({
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
          <CardTitle className="text-xl">Recupera tu contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico para reiniciar tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
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
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="size-4 animate-spin"/> : "Recuperar contraseña"}
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
