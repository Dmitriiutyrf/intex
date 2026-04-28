"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Counter animation
      const counter = { value: 0 }
      gsap.to(counter, {
        value: 100,
        duration: 2.8,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(counter.value)),
      })

      // Lines expand
      tl.fromTo(
        linesRef.current?.querySelectorAll(".line"),
        { scaleX: 0 },
        { 
          scaleX: 1, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power3.inOut" 
        },
        0
      )

      // Logo chars reveal with 3D effect
      const chars = logoRef.current?.querySelectorAll(".logo-char")
      if (chars) {
        tl.fromTo(
          chars,
          { 
            yPercent: 120, 
            rotateX: -90,
            opacity: 0
          },
          { 
            yPercent: 0, 
            rotateX: 0,
            opacity: 1,
            stagger: 0.04, 
            duration: 0.6, 
            ease: "back.out(1.7)" 
          },
          0.4
        )
      }

      // Wait then exit
      tl.to({}, { duration: 1.5 })

      // Epic exit animation
      tl.to(logoRef.current, {
        yPercent: -50,
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in"
      })
      .to(counterRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in"
      }, "-=0.5")
      .to(linesRef.current?.querySelectorAll(".line"), {
        scaleX: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.in"
      }, "-=0.3")
      .to(containerRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete,
      })
    })

    return () => ctx.revert()
  }, [onComplete])

  const logoText = "ИНТЕКС"
  const subText = "СБ"

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 noise opacity-50" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[400px] w-[400px] rounded-full bg-primary/20 blur-[150px]" />
      </div>

      {/* Horizontal lines */}
      <div ref={linesRef} className="absolute inset-0 flex flex-col justify-center gap-24 px-8">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="line h-px w-full origin-left bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          />
        ))}
      </div>

      {/* Main logo */}
      <div ref={logoRef} className="relative" style={{ perspective: "1000px" }}>
        <div className="flex items-baseline gap-2">
          <div className="overflow-hidden">
            <div className="flex">
              {logoText.split("").map((char, i) => (
                <span
                  key={i}
                  className="logo-char inline-block font-display text-[clamp(4rem,15vw,12rem)] font-bold leading-none tracking-tighter"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex">
              {subText.split("").map((char, i) => (
                <span
                  key={i}
                  className="logo-char inline-block font-display text-[clamp(4rem,15vw,12rem)] font-bold leading-none tracking-tighter text-primary glow-text"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="mt-12 overflow-hidden">
        <div className="flex items-center gap-6">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-border" />
          <span
            ref={counterRef}
            className="font-mono text-sm tracking-[0.5em] text-muted-foreground"
          >
            {count.toString().padStart(3, "0")}
          </span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-border" />
        </div>
      </div>

      {/* Tagline */}
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60">
        Инженерные системы безопасности
      </p>
    </div>
  )
}
