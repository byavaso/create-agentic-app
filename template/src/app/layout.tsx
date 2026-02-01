import { Poppins, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SkipToContent } from "@/components/ui/skip-to-content";
import type { Metadata } from "next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Agentic App",
    template: "%s | Agentic App",
  },
  description:
    "Production-ready Next.js application with authentication, database, and AI chat powered by OpenRouter.",
  keywords: [
    "Next.js",
    "React",
    "AI",
    "Authentication",
    "BetterAuth",
    "PostgreSQL",
    "Drizzle ORM",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Agentic App",
    title: "Agentic App",
    description:
      "Production-ready Next.js application with authentication, database, and AI chat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic App",
    description:
      "Production-ready Next.js application with authentication, database, and AI chat.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Agentic App",
  description:
    "Production-ready Next.js application with authentication, database, and AI chat powered by OpenRouter.",
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${lora.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipToContent />
          <SiteHeader />
          <main id="main-content" className="min-h-[calc(100vh-200px)]">
            {children}
          </main>
          <SiteFooter />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
