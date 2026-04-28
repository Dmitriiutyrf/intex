import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { WithdrawForm } from "@/components/withdraw-form"

export const metadata: Metadata = {
  title: "Отзыв согласия на обработку ПДн | ООО «ИНТЕКС-СБ»",
  description:
    "Форма для отзыва согласия на обработку персональных данных и запроса доступа, исправления или удаления данных.",
}

export default function WithdrawConsentPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            152-ФЗ
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Отзыв согласия и запросы по ПДн
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Используйте форму ниже, чтобы запросить доступ, исправление или удаление ваших
            персональных данных, либо отозвать согласие на их обработку. Ответ направим в течение
            30 дней (ст. 21 Федерального закона №152-ФЗ).
          </p>
        </header>

        <div className="mt-10">
          <WithdrawForm />
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <p>
            Также вы можете направить запрос напрямую на e-mail{" "}
            <a
              href="mailto:ohrana.krs@mail.ru"
              className="text-primary underline-offset-4 hover:underline"
            >
              ohrana.krs@mail.ru
            </a>{" "}
            с указанием ФИО и сути обращения. Ознакомиться с правилами обработки ПДн можно в{" "}
            <Link
              href="/policy-personal-data"
              className="text-primary underline-offset-4 hover:underline"
            >
              Политике обработки персональных данных
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
