"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Large text reveal
      gsap.fromTo(
        textRef.current,
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-border px-6 py-16 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Large Branding */}
        <div ref={textRef} className="mb-16 overflow-hidden">
          <h2 className="font-display text-[clamp(3rem,12vw,10rem)] font-bold leading-[0.85] tracking-tighter">
            <span className="text-gradient drop-shadow-[0_0_40px_oklch(0.72_0.22_35_/_0.25)]">ИНТЕКС</span>
            <span className="text-muted-foreground">-СБ</span>
          </h2>
          <p className="mt-4 max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Безопасность · Слаботочка · Электрика · Проектирование
          </p>
        </div>

        {/* Footer Content */}
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              О компании
            </span>
            <p className="mt-4 text-sm text-muted-foreground">
              Проектирование, монтаж и обслуживание инженерных систем безопасности
              для коммерческих объектов.
            </p>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Услуги
            </span>
            <ul className="mt-4 space-y-2">
              {["Пожарная безопасность", "Слаботочные системы", "Электромонтаж", "Проектирование"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Контакты
            </span>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>660020, Красноярский край,</li>
              <li>г. Красноярск, ул. Петра Подзолкова, д. 3</li>
              <li>
                <a href="tel:+79069722833" className="transition-colors hover:text-foreground">
                  +7 (906) 972-28-33
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/+79069722833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#229ED9]"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
                  </svg>
                  Telegram
                </a>
              </li>
              <li>
                <a href="mailto:ohrana.krs@mail.ru" className="transition-colors hover:text-foreground">
                  ohrana.krs@mail.ru
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Реквизиты
            </span>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              <li>ООО «ИНТЕКС-СБ»</li>
              <li>ОГРН: 1252400014657</li>
              <li>ИНН: 2466303170</li>
              <li>КПП: 246601001</li>
              <li>ОКПО: 76776890</li>
              <li className="pt-2">
                <a
                  href="https://digital.mchs.gov.ru/fgpn/license/24-06-2025-003375"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary transition-colors hover:text-primary/80"
                >
                  📜 Лицензия МЧС
                </a>
              </li>
            </ul>
            <p className="mt-3 text-sm text-primary">Пн — Пт: 09:00 — 19:00</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 ООО «ИНТЕКС-СБ». Все права защищены.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="https://digital.mchs.gov.ru/fgpn/license/24-06-2025-003375"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary transition-colors hover:text-primary/80"
            >
              Лицензия МЧС
            </a>
            <a
              href="/policy-personal-data"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Политика обработки персональных данных
            </a>
            <a
              href="/withdraw-consent"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Отзыв согласия
            </a>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("open-cookie-settings"))
                }
              }}
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Управление cookie
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
