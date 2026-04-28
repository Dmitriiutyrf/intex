"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Phone, Menu, X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: "Пожарная", href: "#fire" },
  { label: "Слаботочка", href: "#low-voltage" },
  { label: "Электрика", href: "#electrical" },
  { label: "Проект", href: "#design" },
  { label: "Контакты", href: "#contact" },
]

export function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    ScrollTrigger.create({
      trigger: document.body,
      start: "top -100px",
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    })
  }, [])

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: "circle(0% at 100% 0%)" },
        { clipPath: "circle(150% at 100% 0%)", duration: 0.8, ease: "power3.inOut" }
      )
      gsap.fromTo(
        menuRef.current.querySelectorAll(".menu-item"),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.3, duration: 0.6, ease: "power3.out" }
      )
    }
  }, [isMenuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/80 backdrop-blur-xl" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-primary/20" />
              <span className="font-display text-lg font-bold text-primary">IS</span>
            </div>
            <span className="hidden font-display text-lg font-semibold tracking-tight sm:block">
              Интекс-СБ
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+79079722833"
              className="hidden items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-xs text-primary transition-all hover:bg-primary hover:text-primary-foreground sm:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+7 (907) 972-28-33</span>
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[100] flex flex-col bg-background lg:hidden"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-display text-lg font-semibold">Интекс-СБ</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="menu-item font-display text-4xl font-bold tracking-tight"
              >
                <span className="mr-4 font-mono text-sm text-primary">0{i + 1}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
