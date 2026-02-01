"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPassword } from "@/lib/auth-client"

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const error = searchParams.get("error")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formError, setFormError] = useState("")
  const [isPending, setIsPending] = useState(false)

  if (error === "invalid_token" || !token) {
    return (
      <div className="space-y-4 w-full max-w-sm text-center">
        <p className="text-sm text-destructive">
          {error === "invalid_token"
            ? "Bu şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş."
            : "Sıfırlama kodu bulunamadı."}
        </p>
        <Link href="/forgot-password">
          <Button variant="outline" className="w-full">
            Yeni bağlantı iste
          </Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    if (password !== confirmPassword) {
      setFormError("Şifreler eşleşmiyor")
      return
    }

    if (password.length < 8) {
      setFormError("Şifre en az 8 karakter olmalıdır")
      return
    }

    setIsPending(true)

    try {
      const result = await resetPassword({
        newPassword: password,
        token,
      })

      if (result.error) {
        setFormError(result.error.message || "Şifre sıfırlanamadı")
      } else {
        router.push("/login?reset=success")
      }
    } catch {
      setFormError("Beklenmeyen bir hata oluştu")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="password">Yeni Şifre</Label>
        <Input
          id="password"
          type="password"
          placeholder="Yeni şifrenizi girin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isPending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Yeni Şifre Tekrar</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Yeni şifrenizi tekrar girin"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isPending}
        />
      </div>
      {formError && (
        <p className="text-sm text-destructive">{formError}</p>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Sıfırlanıyor..." : "Şifreyi Sıfırla"}
      </Button>
    </form>
  )
}
