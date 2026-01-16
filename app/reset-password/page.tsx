import { ResetPasswordForm } from "@/components/forms/reset-password-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
        <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Image className="rounded-md"
            alt="pxpie-login Logo"
            height={50}
            priority
            src={"/pxpie-login.png"}
            width={50}/>
          </div>
          Pixelpie Auth
        </a>
        <ResetPasswordForm />
      </div>
    </div>
  )
}