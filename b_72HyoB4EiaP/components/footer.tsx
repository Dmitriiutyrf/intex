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
            <span className="text-gradient">ИНТЕКС</span>
            <span className="text-muted-foreground">-СБ</span>
          </h2>
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
              <li>г. Москва, ул. Примерная, 1</li>
              <li>+7 (XXX) XXX-XX-XX</li>
              <li>info@intex-sb.ru</li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Время работы
            </span>
            <p className="mt-4 text-sm text-muted-foreground">
              Пн — Пт: 09:00 — 19:00
            </p>
            <p className="mt-1 text-sm text-primary">24/7 Аварийная служба</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 ООО «Интекс-СБ». Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Карта сайта
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
