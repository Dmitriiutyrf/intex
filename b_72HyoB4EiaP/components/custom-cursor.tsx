"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    const follower = followerRef.current
    if (!cursor || !dot || !follower) return

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      })
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      })
    }

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: "power2.out" })
      gsap.to(dot, { scale: 0, duration: 0.3, ease: "power2.out" })
    }

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" })
    }

    document.addEventListener("mousemove", onMouseMove)

    const links = document.querySelectorAll("a, button, [data-cursor-hover]")
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink)
      link.addEventListener("mouseleave", onMouseLeaveLink)
    })

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink)
        link.removeEventListener("mouseleave", onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference md:block"
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 mix-blend-difference md:block"
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-xl md:block"
      />
    </>
  )
}
