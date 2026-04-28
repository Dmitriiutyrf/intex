"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface ServiceItem {
  number: string
  title: string
}

interface PortfolioItem {
  number: string
  title: string
  description: string
}

interface ServiceSectionProps {
  id: string
  pageNumber: string
  code: string
  title: string
  description: string
  services: ServiceItem[]
  portfolio: PortfolioItem[]
  accentColor?: string
}

export function ServiceSection({
  id,
  pageNumber,
  code,
  title,
  description,
  services,
  portfolio,
  accentColor = "primary",
}: ServiceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Content stagger
      const items = contentRef.current?.querySelectorAll(".reveal-item")
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 75%",
            },
          }
        )
      }

      // Parallax number
      gsap.to(`.parallax-number-${id}`, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [id])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen overflow-hidden px-6 py-32 lg:px-8"
    >
      {/* Background Number */}
      <div
        className={`parallax-number-${id} pointer-events-none absolute -right-32 top-1/4 select-none font-display text-[10rem] font-bold leading-none text-${accentColor}/[0.05] md:text-[14rem]`}
      >
        {pageNumber}
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex items-start justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Стр. {pageNumber}
            </span>
            <div className="mt-2 overflow-hidden">
              <h2
                ref={titleRef}
                className="font-display text-4xl font-bold tracking-tight md:text-5xl"
              >
                {title}
              </h2>
            </div>
          </div>
          <span className={`font-mono text-xs text-${accentColor}`}>{code}</span>
        </div>

        <div ref={contentRef} className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Description & Services */}
          <div>
            <p className="reveal-item max-w-lg text-lg text-muted-foreground">
              {description}
            </p>

            <div className="mt-12 space-y-4">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="reveal-item group flex items-center gap-4 border-b border-border pb-4 transition-colors hover:border-primary/30"
                >
                  <span className={`font-mono text-xs text-${accentColor}`}>
                    {service.number}
                  </span>
                  <span className="flex-1 font-medium transition-colors group-hover:text-foreground">
                    {service.title}
                  </span>
                  <ArrowRight className="h-4 w-4 -translate-x-2 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div className="reveal-item">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-muted-foreground">
                  Портфолио · {code}
                </span>
                <p className="mt-1 text-sm text-muted-foreground">
                  Реализованные объекты
                </p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {portfolio.length.toString().padStart(2, "0")} объекта
              </span>
            </div>

            <div className="space-y-4">
              {portfolio.map((item, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-secondary/50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs text-${accentColor}`}>
                          {item.number}
                        </span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase text-primary">
                          готово
                        </span>
                      </div>
                      <h4 className="mt-2 font-display text-lg font-semibold">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRight className="h-4 w-4 -rotate-45" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
