"use client"

import { useState } from "react"
import { Send } from "lucide-react"

type RequestType = "withdraw" | "delete" | "correct" | "access"

const requestLabels: Record<RequestType, string> = {
  withdraw: "Отозвать согласие",
  delete: "Удалить мои данные",
  correct: "Исправить мои данные",
  access: "Получить доступ к данным",
}

export function WithdrawForm() {
  const [fio, setFio] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState<RequestType>("withdraw")
  const [details, setDetails] = useState("")
  const [captcha, setCaptcha] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  // Простейшая «капча» — арифметическая защита от ботов.
  // На бэке должна быть полноценная капча (reCAPTCHA / hCaptcha).
  const captchaA = 3
  const captchaB = 4
  const captchaAnswer = captchaA + captchaB

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fio.trim() || !email.trim()) {
      setStatus("error")
      setErrorMsg("Укажите ФИО и e-mail.")
      return
    }
    if (!consent) {
      setStatus("error")
      setErrorMsg("Необходимо согласие на обработку запроса.")
      return
    }
    if (Number(captcha) !== captchaAnswer) {
      setStatus("error")
      setErrorMsg("Неверный ответ на проверочный вопрос.")
      return
    }

    // На бэке: запись в БД/лог, отправка письма на ohrana.krs@mail.ru,
    // сохранение IP, даты, типа запроса.
    setStatus("success")
    setErrorMsg("")
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center">
        <h2 className="font-display text-2xl font-semibold">Запрос принят</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Мы получили ваш запрос «{requestLabels[type]}». Ответ будет направлен на{" "}
          <span className="text-foreground">{email}</span> в течение 30 дней.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="fio" className="mb-2 block text-sm text-muted-foreground">
            ФИО <span className="text-destructive">*</span>
          </label>
          <input
            id="fio"
            type="text"
            value={fio}
            onChange={(e) => setFio(e.target.value)}
            required
            className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none"
            placeholder="Иванов Иван Иванович"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted-foreground">
            E-mail для ответа <span className="text-destructive">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none"
            placeholder="email@example.ru"
          />
        </div>

        <div>
          <label htmlFor="type" className="mb-2 block text-sm text-muted-foreground">
            Тип запроса <span className="text-destructive">*</span>
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as RequestType)}
            className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none"
          >
            {(Object.keys(requestLabels) as RequestType[]).map((key) => (
              <option key={key} value={key}>
                {requestLabels[key]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="details" className="mb-2 block text-sm text-muted-foreground">
            Дополнительные сведения
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none"
            placeholder="Опишите запрос: какие данные, на каком основании и т. п."
          />
        </div>

        <div>
          <label htmlFor="captcha" className="mb-2 block text-sm text-muted-foreground">
            Проверка: сколько будет {captchaA} + {captchaB}?{" "}
            <span className="text-destructive">*</span>
          </label>
          <input
            id="captcha"
            type="text"
            inputMode="numeric"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            required
            className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none"
            placeholder="Ответ"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary"
          />
          <span className="leading-relaxed">
            Я согласен(а) на обработку моих персональных данных в целях обработки настоящего
            запроса в соответствии с{" "}
            <a
              href="/policy-personal-data"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Политикой обработки персональных данных
            </a>
            .
          </span>
        </label>

        {status === "error" && (
          <p role="alert" className="text-sm text-destructive">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={!consent}
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 font-mono text-sm uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary"
        >
          <span>Отправить запрос</span>
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  )
}
