"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState({
    company: "",
    phone: "",
    email: "",
    message: "",
  })
  const [consent, setConsent] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) {
      setSubmitStatus("error")
      return
    }
    // Handle form submission — здесь имитация успешной отправки.
    // На бэке: сохранять согласие (дата, IP, хэш текста согласия).
    setSubmitStatus("success")
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden px-6 py-32 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="contact-reveal inline-block font-mono text-xs uppercase tracking-wider text-primary">
            Контакты
          </span>
          <h2 className="contact-reveal mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Заявка на расчёт
          </h2>
          <p className="contact-reveal mt-4 text-lg text-muted-foreground">
            Соберём решение под ваш объект и задачи
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Contact Info */}
          <div className="contact-reveal space-y-8">
            <div className="space-y-6">
              <div className="group flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Адрес
                  </span>
                  <p className="mt-1 font-medium">
                    660020, Красноярский край,
                    <br />
                    г. Красноярск, ул. Петра Подзолкова, д. 3
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Связь
                  </span>
                  <p className="mt-1 font-medium">
                    <a href="tel:+79079722833" className="transition-colors hover:text-primary">
                      +7 (907) 972-28-33
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <a href="mailto:ohrana.krs@mail.ru" className="transition-colors hover:text-foreground">
                      ohrana.krs@mail.ru
                    </a>
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-secondary/50 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    График
                  </span>
                  <p className="mt-1 font-medium">Пн — Пт: 09:00 — 19:00</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Быстрые ссылки
              </span>
              <div className="mt-4 space-y-2">
                {["Пожарная безопасность", "Слаботочные системы", "Электромонтаж", "Проектирование"].map(
                  (link, i) => (
                    <a
                      key={i}
                      href={`#${["fire", "low-voltage", "electrical", "design"][i]}`}
                      className="group flex items-center justify-between py-2 text-sm transition-colors hover:text-primary"
                    >
                      <span>{link}</span>
                      <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-reveal space-y-6"
          >
            <div className="rounded-3xl border border-border bg-card p-8">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Быстрый запрос
              </span>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Компания / объект
                  </label>
                  <input
                    type="text"
                    value={formState.company}
                    onChange={(e) =>
                      setFormState({ ...formState, company: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none"
                    placeholder="ООО «Название»"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-muted-foreground">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none"
                      placeholder="email@company.ru"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Что нужно: проект, монтаж, обслуживание, аудит
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    rows={4}
                    className="w-full resize-none rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none"
                    placeholder="Опишите ваш проект или задачу..."
                  />
                </div>
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked)
                    if (e.target.checked && submitStatus === "error") {
                      setSubmitStatus("idle")
                    }
                  }}
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                  required
                  aria-required="true"
                />
                <span className="leading-relaxed">
                  Я даю согласие на обработку персональных данных в соответствии с{" "}
                  <a
                    href="/policy-personal-data"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Политикой обработки персональных данных
                  </a>
                  . Отметьте для отправки формы.
                </span>
              </label>

              {submitStatus === "error" && (
                <p
                  role="alert"
                  className="mt-3 text-sm text-destructive"
                >
                  Для отправки заявки необходимо согласие на обработку персональных данных.
                </p>
              )}
              {submitStatus === "success" && (
                <p role="status" className="mt-3 text-sm text-primary">
                  Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                </p>
              )}

              <button
                type="submit"
                disabled={!consent}
                className="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 font-mono text-sm uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary"
              >
                <span>Отправить запрос</span>
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
