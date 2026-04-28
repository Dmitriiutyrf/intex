"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const words = [
  "FIRE_SAFETY",
  "LOW_VOLTAGE",
  "ELECTRICAL",
  "ENGINEERING",
  "АПС",
  "СОУЭ",
  "СКУД",
  "СОТ",
  "ВРУ",
  "СКС",
  "АУПТ",
  "ИБП",
]

export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous scroll animation
      gsap.to(track1Ref.current, {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none",
      })

      gsap.to(track2Ref.current, {
        xPercent: 50,
        repeat: -1,
        duration: 25,
        ease: "none",
      })

      // Speed up on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity() / 1000
          gsap.to([track1Ref.current, track2Ref.current], {
            timeScale: 1 + Math.abs(velocity) * 0.2,
            duration: 0.3,
          })
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const renderWords = (reverse = false) => {
    const items = reverse ? [...words].reverse() : words
    return (
      <>
        {[...items, ...items, ...items, ...items].map((word, i) => (
          <span
            key={i}
            className="mx-8 inline-block whitespace-nowrap font-display text-6xl font-bold tracking-tight text-transparent md:text-8xl"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.1)",
            }}
          >
            {word}
          </span>
        ))}
      </>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      <div
        ref={track1Ref}
        className="flex whitespace-nowrap"
        style={{ width: "fit-content" }}
      >
        {renderWords()}
      </div>

      <div
        ref={track2Ref}
        className="mt-4 flex whitespace-nowrap"
        style={{ width: "fit-content", transform: "translateX(-50%)" }}
      >
        {renderWords(true)}
      </div>
    </div>
  )
}
