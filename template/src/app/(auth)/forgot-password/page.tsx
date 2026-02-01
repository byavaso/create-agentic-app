import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth"

export default async function ForgotPasswordPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Şifremi Unuttum</CardTitle>
          <CardDescription>
            E-posta adresinizi girin, size sıfırlama bağlantısı gönderelim
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
