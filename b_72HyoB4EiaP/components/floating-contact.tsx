"use client"

import { useEffect, useState } from "react"
import { Phone, MessageCircle, X } from "lucide-react"

const PHONE = "+79069722833"
const PHONE_DISPLAY = "+7 (906) 972-28-33"
const TELEGRAM_URL = `https://t.me/${PHONE}`

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  )
}

export function FloatingContact() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 800)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="pointer-events-none fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 md:bottom-8 md:right-6"
      aria-label="Связаться с нами"
    >
      {/* Action buttons */}
      <div
        className={`pointer-events-auto flex flex-col items-end gap-2.5 transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-full border border-border bg-card/90 py-2.5 pl-3 pr-4 shadow-lg backdrop-blur-md transition-all hover:border-primary/40 hover:bg-card"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_0_20px_oklch(0.65_0.13_230_/_0.5)]">
            <TelegramIcon className="h-4 w-4" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider">Telegram</span>
        </a>

        <a
          href={`tel:${PHONE}`}
          className="group flex items-center gap-3 rounded-full border border-border bg-card/90 py-2.5 pl-3 pr-4 shadow-lg backdrop-blur-md transition-all hover:border-primary/40 hover:bg-card"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_oklch(0.72_0.22_35_/_0.5)]">
            <Phone className="h-4 w-4" />
          </span>
          <span className="font-mono text-xs">{PHONE_DISPLAY}</span>
        </a>
      </div>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Скрыть контакты" : "Связаться с нами"}
        className="pointer-events-auto group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_40px_oklch(0.72_0.22_35_/_0.45)] transition-transform hover:scale-105 active:scale-95"
      >
        {/* Pulse ring */}
        {!open && (
          <>
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
            <span className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
          </>
        )}
        <span className="relative">
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </span>
      </button>
    </div>
  )
}
