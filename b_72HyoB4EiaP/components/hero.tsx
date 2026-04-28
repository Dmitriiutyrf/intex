"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDown, MapPin, Clock, Shield, Zap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title chars animation with stagger
      const words = titleRef.current?.querySelectorAll(".word")
      words?.forEach((word, wi) => {
        const chars = word.querySelectorAll(".char")
        gsap.fromTo(
          chars,
          { 
            yPercent: 120, 
            rotateX: -90,
            opacity: 0,
            scale: 0.5
          },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.2)",
            delay: 0.3 + wi * 0.15,
          }
        )
      })

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 60, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 1.2 }
      )

      // Stats reveal
      const statItems = statsRef.current?.querySelectorAll(".stat-item")
      gsap.fromTo(
        statItems,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power3.out", 
          delay: 1.5 
        }
      )

      // Floating orb
      gsap.to(orbRef.current, {
        y: -30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      })

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.set(gridRef.current, {
            y: progress * 300,
            opacity: 1 - progress * 1.5,
            scale: 1 - progress * 0.2
          })
          gsap.set(titleRef.current, {
            y: progress * 150,
            opacity: 1 - progress * 2
          })
        },
      })

      // Scroll indicator bounce
      gsap.to(".scroll-indicator", {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power2.inOut",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const titleLines = [
    "Инженерные",
    "системы",
    "безопасности"
  ]

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-4 pb-8 pt-20 md:px-8 lg:px-12"
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 noise opacity-30" />

      {/* Animated grid */}
      <div ref={gridRef} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:100px_100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_80%)]" />
      </div>

      {/* Floating orb */}
      <div ref={orbRef} className="pointer-events-none absolute -right-32 top-20 md:-right-20 md:top-32">
        <div className="relative h-64 w-64 md:h-96 md:w-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-primary/5 blur-[80px]" />
          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-primary/60 to-transparent blur-[40px]" />
        </div>
      </div>

      {/* Secondary orb */}
      <div className="pointer-events-none absolute -left-40 bottom-40">
        <div className="h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      {/* Top badges */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-2 md:gap-3 lg:justify-start">
        {[
          { icon: MapPin, text: "Красноярск" },
          { icon: Shield, text: "Лицензия МЧС" },
          { icon: Zap, text: "Полный цикл" },
          { icon: Clock, text: "24/7" },
        ].map((badge, i) => (
          <div 
            key={i}
            className="glass flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2"
          >
            <badge.icon className="h-3 w-3 text-primary md:h-3.5 md:w-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider md:text-xs">{badge.text}</span>
          </div>
        ))}
      </div>

      {/* Main title */}
      <div className="relative z-10 mx-auto w-full max-w-7xl py-12 md:py-20">
        <h1
          ref={titleRef}
          className="font-display text-[clamp(2.5rem,10vw,9rem)] font-bold leading-[0.85] tracking-tight"
          style={{ perspective: "1000px" }}
        >
          {titleLines.map((line, li) => (
            <span key={li} className="word block overflow-hidden">
              {line.split("").map((char, ci) => (
                <span
                  key={ci}
                  className={`char inline-block ${li === 2 ? "text-gradient" : ""}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="mt-8 max-w-xl text-base text-muted-foreground md:mt-12 md:text-lg lg:text-xl"
        >
          ООО «Интекс-СБ» — проектирование, монтаж и техническое обслуживание 
          систем пожарной безопасности, слаботочных сетей и электроснабжения 
          для коммерческих и промышленных объектов.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-3 md:mt-12 md:gap-4">
          <a
            href="#fire"
            className="group relative overflow-hidden rounded-full bg-primary px-6 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-all hover:pr-10 md:px-8 md:py-4 md:text-sm"
          >
            <span className="relative z-10">Наши системы</span>
            <ArrowDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-[-90deg] opacity-0 transition-all duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
          <a
            href="#contact"
            className="glass rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider transition-all hover:bg-secondary md:px-8 md:py-4 md:text-sm"
          >
            Оставить заявку
          </a>
          <a
            href="https://t.me/+79069722833"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-[#229ED9]/30 bg-[#229ED9]/10 px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#229ED9] transition-all hover:bg-[#229ED9] hover:text-white md:px-8 md:py-4 md:text-sm"
            aria-label="Написать в Telegram"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
            </svg>
            Telegram
          </a>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-8 md:grid-cols-4 md:gap-8">
          {[
            { value: "12+", label: "лет опыта" },
            { value: "500+", label: "объектов" },
            { value: "4", label: "направления" },
            { value: "24/7", label: "сервис" },
          ].map((stat, i) => (
            <div key={i} className="stat-item">
              <span className="font-display text-4xl font-bold text-primary glow-text md:text-5xl lg:text-6xl">
                {stat.value}
              </span>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <div className="relative">
          <ArrowDown className="h-4 w-4 text-primary" />
          <div className="absolute inset-0 animate-ping">
            <ArrowDown className="h-4 w-4 text-primary/50" />
          </div>
        </div>
      </div>
    </section>
  )
}
