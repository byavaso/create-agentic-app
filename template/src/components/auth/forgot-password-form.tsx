"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requestPasswordReset } from "@/lib/auth-client"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsPending(true)

    try {
      const result = await requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      })

      if (result.error) {
        setError(result.error.message || "Sıfırlama e-postası gönderilemedi")
      } else {
        setSuccess(true)
      }
    } catch {
      setError("Beklenmeyen bir hata oluştu")
    } finally {
      setIsPending(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-4 w-full max-w-sm text-center">
        <p className="text-sm text-muted-foreground">
          Bu e-posta adresiyle kayıtlı bir hesap varsa, şifre sıfırlama bağlantısı gönderildi.
        </p>
        <Link href="/login">
          <Button variant="outline" className="w-full">
            Giriş sayfasına dön
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="email">E-posta</Label>
        <Input
          id="email"
          type="email"
          placeholder="ornek@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isPending}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Gönderiliyor..." : "Sıfırlama bağlantısı gönder"}
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        Şifrenizi hatırladınız mı?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Giriş yap
        </Link>
      </div>
    </form>
  )
}
