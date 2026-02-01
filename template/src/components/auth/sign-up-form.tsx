"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/lib/auth-client"

export function SignUpForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor")
      return
    }

    if (password.length < 8) {
      setError("Şifre en az 8 karakter olmalıdır")
      return
    }

    setIsPending(true)

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/dashboard",
      })

      if (result.error) {
        setError(result.error.message || "Hesap oluşturulamadı")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      setError("Beklenmeyen bir hata oluştu")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="name">Ad Soyad</Label>
        <Input
          id="name"
          type="text"
          placeholder="Adınızı girin"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isPending}
        />
      </div>
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
      <div className="space-y-2">
        <Label htmlFor="password">Şifre</Label>
        <Input
          id="password"
          type="password"
          placeholder="Şifre oluşturun"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isPending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Şifrenizi tekrar girin"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isPending}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Hesap oluşturuluyor..." : "Kayıt Ol"}
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        Zaten hesabınız var mı?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Giriş yap
        </Link>
      </div>
    </form>
  )
}
