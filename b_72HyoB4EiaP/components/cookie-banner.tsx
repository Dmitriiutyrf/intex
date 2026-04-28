"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

const STORAGE_KEY = "intex-cookie-consent-v1"
// Срок хранения согласия — 1 год
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000

type Categories = {
  necessary: true
  analytics: boolean
  marketing: boolean
  functional: boolean
}

type StoredConsent = {
  categories: Categories
  timestamp: number
}

const defaultCategories: Categories = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
}

function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (!parsed?.timestamp) return null
    // Истёк срок хранения — спросить заново
    if (Date.now() - parsed.timestamp > ONE_YEAR_MS) return null
    return parsed
  } catch {
    return null
  }
}

function writeConsent(categories: Categories) {
  if (typeof window === "undefined") return
  const payload: StoredConsent = { categories, timestamp: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))

  // Передаём consent-status в dataLayer (GTM/аналитика)
  type WithDataLayer = Window & { dataLayer?: Array<Record<string, unknown>> }
  const w = window as WithDataLayer
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({
    event: "consent_update",
    consent: categories,
  })
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [categories, setCategories] = useState<Categories>(defaultCategories)

  useEffect(() => {
    const existing = readConsent()
    if (!existing) {
      setVisible(true)
    } else {
      setCategories(existing.categories)
    }

    const openHandler = () => {
      setShowSettings(true)
      setVisible(true)
    }
    window.addEventListener("open-cookie-settings", openHandler)
    return () => window.removeEventListener("open-cookie-settings", openHandler)
  }, [])

  const acceptAll = () => {
    const all: Categories = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setCategories(all)
    writeConsent(all)
    setVisible(false)
    setShowSettings(false)
  }

  const rejectAll = () => {
    const minimal: Categories = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setCategories(minimal)
    writeConsent(minimal)
    setVisible(false)
    setShowSettings(false)
  }

  const saveSettings = () => {
    writeConsent(categories)
    setVisible(false)
    setShowSettings(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookie"
      className="fixed inset-x-0 bottom-0 z-[200] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold">
              Мы используем cookie
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Сайт использует файлы cookie и аналогичные технологии для корректной работы,
              аналитики и улучшения сервиса. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
              <a
                href="/policy-personal-data"
                className="text-primary underline-offset-4 hover:underline"
              >
                Политикой обработки персональных данных
              </a>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={rejectAll}
            aria-label="Отклонить и закрыть"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {showSettings && (
          <div className="mt-6 space-y-3 border-t border-border pt-6">
            <CategoryRow
              label="Необходимые"
              description="Обеспечивают базовую работу сайта. Не отключаются."
              checked
              disabled
            />
            <CategoryRow
              label="Функциональные"
              description="Запоминают ваши настройки и улучшают пользовательский опыт."
              checked={categories.functional}
              onChange={(v) => setCategories((c) => ({ ...c, functional: v }))}
            />
            <CategoryRow
              label="Аналитика"
              description="Помогают понять, как посетители используют сайт (Яндекс.Метрика, GA)."
              checked={categories.analytics}
              onChange={(v) => setCategories((c) => ({ ...c, analytics: v }))}
            />
            <CategoryRow
              label="Маркетинг"
              description="Используются для показа релевантной рекламы."
              checked={categories.marketing}
              onChange={(v) => setCategories((c) => ({ ...c, marketing: v }))}
            />
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {showSettings ? (
            <button
              type="button"
              onClick={saveSettings}
              className="flex-1 rounded-xl bg-primary px-5 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Сохранить настройки
            </button>
          ) : (
            <button
              type="button"
              onClick={acceptAll}
              className="flex-1 rounded-xl bg-primary px-5 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Принять все
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowSettings((s) => !s)}
            className="flex-1 rounded-xl border border-border bg-secondary/50 px-5 py-3 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
          >
            {showSettings ? "Скрыть настройки" : "Настроить"}
          </button>
          <button
            type="button"
            onClick={rejectAll}
            className="flex-1 rounded-xl border border-border px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  )
}

function CategoryRow({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string
  description: string
  checked: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border bg-secondary/30 p-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary disabled:cursor-not-allowed"
        aria-label={label}
      />
    </label>
  )
}
