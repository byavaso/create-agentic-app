"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ChatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Chat error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold">Chat Error</h1>
        <p className="mb-8 text-muted-foreground">
          {error.message || "Failed to load chat. Please try again."}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Retry</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
