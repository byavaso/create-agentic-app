"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignInButton } from "@/components/auth/sign-in-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";

function LoginContent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset = searchParams.get("reset");

  useEffect(() => {
    if (session && !isPending) {
      router.replace("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="text-muted-foreground">Yükleniyor...</div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="text-muted-foreground">Yönlendiriliyor...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Tekrar Hoş Geldiniz</CardTitle>
          <CardDescription>Hesabınıza giriş yapın</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {reset === "success" && (
            <p className="mb-4 text-sm text-green-600 dark:text-green-400">
              Şifreniz başarıyla sıfırlandı. Yeni şifrenizle giriş yapabilirsiniz.
            </p>
          )}
          <SignInButton />
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="text-muted-foreground">Yükleniyor...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
