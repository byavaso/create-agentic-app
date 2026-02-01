"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

const featuredTools = [
  { name: "Araştırma", href: "/research", desc: "Internet genelinde derinlemesine araştırma" },
  { name: "Video to News", href: "/tools/youtube-to-news", desc: "YouTube videolarından haber oluşturun" },
  { name: "Görsel Oluştur", href: "/tools/image-generator", desc: "Imagen 4 ile profesyonel görseller" },
  { name: "Yorum Üretici", href: "/tools/comment-generator", desc: "Etkili sosyal medya yorumları" },
];

const toolList = [
  { name: "Blog Yazarı", href: "/tools/blog-writer", category: "İçerik" },
  { name: "Sosyal Medya", href: "/tools/social-media-generator", category: "İçerik" },
  { name: "Basın Bülteni", href: "/tools/press-release", category: "İçerik" },
  { name: "Reklam Metni", href: "/tools/ad-copy-generator", category: "Pazarlama" },
  { name: "Landing Page", href: "/tools/landing-page-copy", category: "Pazarlama" },
  { name: "E-posta Kampanya", href: "/tools/email-campaign", category: "Pazarlama" },
  { name: "SEO Meta", href: "/tools/seo-meta-generator", category: "SEO" },
  { name: "Rakip Analizi", href: "/tools/competitor-analysis", category: "Analiz" },
];

export default function Home() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl">
            <h1 className="font-serif text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] font-bold tracking-tight leading-[1.08] mb-6">
              AI{" "}
              <span className="underline decoration-primary decoration-[3px] underline-offset-[6px]">
                araştırma
              </span>{" "}
              ve{" "}
              <span className="underline decoration-primary decoration-[3px] underline-offset-[6px]">
                içerik
              </span>{" "}
              üretimi için araçlar
            </h1>
            <p className="text-lg md:text-[1.25rem] text-foreground/70 max-w-2xl mb-10 leading-relaxed">
              20+ AI aracı ile blog yazın, sosyal medya içeriği üretin, derinlemesine araştırma yapın.
              Kendi API anahtarınızla sınırsız kullanım.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-12 px-7 text-base rounded-lg">
                <Link href="/research">Araştırma Başlat</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base rounded-lg border-foreground/20 hover:bg-foreground/5">
                <Link href="/tools">Araçları Gör</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Card */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl">
            <div className="bg-secondary rounded-2xl p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h2 className="font-serif text-2xl md:text-[1.75rem] font-semibold mb-3">Hızlı Başlangıç</h2>
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    Kendi API anahtarınızla tüm araçları sınırsız kullanın. Kurulum gerektirmez, hemen başlayın.
                  </p>
                  <Button asChild className="h-11 px-6 rounded-lg">
                    <Link href="/research">Başla</Link>
                  </Button>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground/60 mb-4">Öne çıkanlar</div>
                  <div className="space-y-1">
                    {featuredTools.slice(0, 3).map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="flex items-center justify-between group py-2.5 border-b border-foreground/10 last:border-0"
                      >
                        <span className="text-[15px] font-medium">{tool.name}</span>
                        <Icons.ArrowRight className="h-4 w-4 text-foreground/40 group-hover:text-foreground transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <h2 className="font-serif text-[1.75rem] md:text-[2rem] font-semibold leading-[1.2]">
                İçerik üretimini hızlandırın, araştırmayı derinleştirin.
              </h2>
              <div className="space-y-5 text-foreground/70 text-[17px] leading-relaxed">
                <p>
                  Blog yazılarından sosyal medya içeriklerine, SEO metinlerinden
                  rakip analizine kadar tüm içerik ihtiyaçlarınızı karşılayan 20+ AI aracı.
                </p>
                <p>
                  Kendi API anahtarınızla tüm araçları sınırsız kullanın. Verileriniz güvende.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 md:py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredTools.map((tool, i) => {
                const icons = [Icons.Search, Icons.Youtube, Icons.Image, Icons.MessageCircle] as const;
                const Icon = icons[i];
                if (!Icon) return null;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="bg-secondary/60 hover:bg-secondary rounded-xl p-5 transition-colors"
                  >
                    <Icon className="h-6 w-6 mb-12 text-foreground/50" />
                    <div className="font-medium text-[15px]">{tool.name}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tool List */}
      <section className="py-16 md:py-24 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl">
            <div className="text-sm font-semibold text-foreground/60 mb-6">Tüm Araçlar</div>
            <div className="space-y-0">
              {toolList.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center justify-between py-4 border-b border-foreground/10 group"
                >
                  <span className="font-medium text-[15px]">{tool.name}</span>
                  <div className="flex items-center gap-5">
                    <span className="text-sm text-foreground/50">{tool.category}</span>
                    <Icons.ArrowRight className="h-4 w-4 text-foreground/30 group-hover:text-foreground transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/tools"
                className="text-[15px] font-medium text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
              >
                Tüm araçları gör
                <Icons.ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl">
            <h2 className="font-serif text-[2rem] md:text-[2.5rem] font-semibold mb-8 leading-[1.15]">
              Hemen başlayın
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-12 px-7 text-base rounded-lg">
                <Link href="/research">Araştırma Yap</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base rounded-lg border-foreground/20 hover:bg-foreground/5">
                <Link href="/tools">Araçları Keşfet</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-[15px]">
              <div>
                <div className="font-semibold mb-4">Araçlar</div>
                <ul className="space-y-3 text-foreground/60">
                  <li><Link href="/research" className="hover:text-foreground transition-colors">Araştırma</Link></li>
                  <li><Link href="/tools/youtube-to-news" className="hover:text-foreground transition-colors">Video to News</Link></li>
                  <li><Link href="/tools/image-generator" className="hover:text-foreground transition-colors">Görsel Oluştur</Link></li>
                  <li><Link href="/tools/comment-generator" className="hover:text-foreground transition-colors">Yorum Üretici</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-4">İçerik</div>
                <ul className="space-y-3 text-foreground/60">
                  <li><Link href="/tools/blog-writer" className="hover:text-foreground transition-colors">Blog Yazarı</Link></li>
                  <li><Link href="/tools/social-media-generator" className="hover:text-foreground transition-colors">Sosyal Medya</Link></li>
                  <li><Link href="/tools/press-release" className="hover:text-foreground transition-colors">Basın Bülteni</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-4">Pazarlama</div>
                <ul className="space-y-3 text-foreground/60">
                  <li><Link href="/tools/ad-copy-generator" className="hover:text-foreground transition-colors">Reklam Metni</Link></li>
                  <li><Link href="/tools/landing-page-copy" className="hover:text-foreground transition-colors">Landing Page</Link></li>
                  <li><Link href="/tools/email-campaign" className="hover:text-foreground transition-colors">E-posta</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-4">Kaynaklar</div>
                <ul className="space-y-3 text-foreground/60">
                  <li>
                    <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                      API Key Al
                    </a>
                  </li>
                  <li>
                    <Link href="/chat" className="hover:text-foreground transition-colors">
                      AI Chat
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-14 pt-8 border-t border-foreground/10 text-sm text-foreground/50">
              © 2025 AI Content Studio
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
