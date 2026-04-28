import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Политика обработки персональных данных | ООО «ИНТЕКС-СБ»",
  description:
    "Политика обработки персональных данных в соответствии с Федеральным законом №152-ФЗ «О персональных данных».",
}

const sections = [
  { id: "general", title: "1. Общие положения" },
  { id: "terms", title: "2. Основные понятия" },
  { id: "purposes", title: "3. Цели обработки персональных данных" },
  { id: "scope", title: "4. Состав и объем обрабатываемых данных" },
  { id: "legal", title: "5. Правовые основания обработки" },
  { id: "order", title: "6. Порядок и условия обработки" },
  { id: "transfer", title: "7. Передача третьим лицам" },
  { id: "storage", title: "8. Сроки хранения и локализация" },
  { id: "measures", title: "9. Меры защиты информации" },
  { id: "rights", title: "10. Права субъекта персональных данных" },
  { id: "withdraw", title: "11. Порядок отзыва согласия" },
  { id: "cookies", title: "12. Cookie-файлы" },
  { id: "contacts", title: "13. Контактная информация оператора" },
]

export default function PolicyPersonalDataPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
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
            Политика обработки персональных данных
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            ООО «ИНТЕКС-СБ» (далее — Оператор) уважает право субъектов персональных данных
            на конфиденциальность личной информации. Настоящая Политика разработана в соответствии
            с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных».
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Редакция от 28 апреля 2026 г.
          </p>
        </header>

        {/* Оглавление */}
        <nav
          aria-label="Оглавление"
          className="mt-10 rounded-2xl border border-border bg-card p-6"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Оглавление
          </span>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose-invert mt-12 space-y-12 text-sm leading-relaxed text-foreground/90">
          <Section id="general" title="1. Общие положения">
            <p>
              Настоящая Политика определяет порядок обработки персональных данных
              и меры по обеспечению их безопасности, осуществляемые ООО «ИНТЕКС-СБ»
              (далее — Оператор) с целью защиты прав и свобод человека и гражданина
              при обработке его персональных данных.
            </p>
            <p>
              Действие Политики распространяется на всю информацию о пользователях сайта,
              которую Оператор может получить о субъекте во время использования сайта,
              программ и продуктов Оператора.
            </p>
          </Section>

          <Section id="terms" title="2. Основные понятия">
            <p>
              <strong>Персональные данные</strong> — любая информация, относящаяся прямо
              или косвенно к определённому или определяемому физическому лицу.
            </p>
            <p>
              <strong>Обработка персональных данных</strong> — любое действие или совокупность действий,
              совершаемых с использованием средств автоматизации или без них с персональными данными,
              включая сбор, запись, систематизацию, хранение, использование, передачу, обезличивание,
              блокирование, удаление, уничтожение.
            </p>
            <p>
              <strong>Оператор</strong> — ООО «ИНТЕКС-СБ», ОГРН 1252400014657, ИНН 2466303170.
            </p>
          </Section>

          <Section id="purposes" title="3. Цели обработки персональных данных">
            <ul className="list-disc space-y-2 pl-6">
              <li>обработка заявок и обращений, поступающих с сайта;</li>
              <li>заключение и исполнение договоров на услуги Оператора;</li>
              <li>информирование о статусе заявки, услугах и акциях (по запросу);</li>
              <li>улучшение качества работы сайта и сервиса;</li>
              <li>исполнение требований законодательства Российской Федерации.</li>
            </ul>
          </Section>

          <Section id="scope" title="4. Состав и объем обрабатываемых данных">
            <p>Оператор обрабатывает следующие категории персональных данных:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>фамилия, имя, отчество (при предоставлении);</li>
              <li>контактный телефон;</li>
              <li>адрес электронной почты;</li>
              <li>наименование организации/объекта (при предоставлении);</li>
              <li>текст обращения, направленного через формы сайта;</li>
              <li>IP-адрес, данные cookie, информация о браузере и устройстве.</li>
            </ul>
            <p>Специальные категории персональных данных и биометрические данные не обрабатываются.</p>
          </Section>

          <Section id="legal" title="5. Правовые основания обработки">
            <p>
              Обработка персональных данных осуществляется на основании:
              Конституции РФ; Федерального закона от 27.07.2006 №152-ФЗ «О персональных данных»;
              согласия субъекта персональных данных; договоров, заключаемых с субъектом.
            </p>
          </Section>

          <Section id="order" title="6. Порядок и условия обработки">
            <p>
              Обработка персональных данных осуществляется с согласия субъекта на обработку
              его персональных данных, выраженного посредством проставления соответствующей
              отметки в формах сайта.
            </p>
            <p>
              Оператор обрабатывает персональные данные как с использованием средств автоматизации,
              так и без них.
            </p>
          </Section>

          <Section id="transfer" title="7. Передача третьим лицам">
            <p>
              Оператор не передает персональные данные третьим лицам без согласия субъекта,
              за исключением случаев, предусмотренных законодательством Российской Федерации
              (запросы государственных органов, суда и т. п.).
            </p>
          </Section>

          <Section id="storage" title="8. Сроки хранения и локализация">
            <p>
              Персональные данные хранятся в течение срока, необходимого для достижения целей
              обработки, либо до отзыва согласия. Базы данных, содержащие персональные данные
              граждан Российской Федерации, размещаются на серверах, расположенных на территории
              Российской Федерации (ч. 5 ст. 18 152-ФЗ).
            </p>
          </Section>

          <Section id="measures" title="9. Меры защиты информации">
            <p>Оператор применяет правовые, организационные и технические меры для защиты ПДн:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>передача данных по защищённому соединению (HTTPS);</li>
              <li>защита форм от автоматизированных атак (CSRF-токены, rate-limit);</li>
              <li>параметризованные запросы к БД для исключения SQL-инъекций;</li>
              <li>разграничение доступа к ПДн и ведение журналов доступа;</li>
              <li>уровень защищённости — в соответствии с применимыми требованиями ФСТЭК.</li>
            </ul>
          </Section>

          <Section id="rights" title="10. Права субъекта персональных данных">
            <p>Субъект персональных данных имеет право:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>получать информацию об обработке своих персональных данных;</li>
              <li>требовать уточнения, блокирования или уничтожения данных;</li>
              <li>отозвать согласие на обработку персональных данных;</li>
              <li>обжаловать действия Оператора в Роскомнадзор и в судебном порядке.</li>
            </ul>
            <p>Срок ответа на запрос субъекта — не более 30 дней.</p>
          </Section>

          <Section id="withdraw" title="11. Порядок отзыва согласия">
            <p>
              Согласие на обработку персональных данных может быть отозвано путём направления
              письменного запроса на электронную почту{" "}
              <a
                href="mailto:ohrana.krs@mail.ru"
                className="text-primary underline-offset-4 hover:underline"
              >
                ohrana.krs@mail.ru
              </a>{" "}
              или через{" "}
              <Link
                href="/withdraw-consent"
                className="text-primary underline-offset-4 hover:underline"
              >
                форму отзыва согласия
              </Link>
              .
            </p>
          </Section>

          <Section id="cookies" title="12. Cookie-файлы">
            <p>
              Сайт использует cookie для обеспечения работы сервиса, аналитики и улучшения качества.
              Управление cookie доступно через баннер при первом визите и через ссылку
              «Управление cookie» в подвале сайта. Аналитические и маркетинговые скрипты
              запускаются только после получения согласия пользователя.
            </p>
          </Section>

          <Section id="contacts" title="13. Контактная информация оператора">
            <ul className="space-y-1">
              <li>ООО «ИНТЕКС-СБ»</li>
              <li>ОГРН: 1252400014657</li>
              <li>ИНН: 2466303170 / КПП: 246601001</li>
              <li>ОКПО: 76776890</li>
              <li>
                Адрес: 660020, Красноярский край, г. Красноярск,
                ул. Петра Подзолкова, д. 3
              </li>
              <li>
                Телефон:{" "}
                <a href="tel:+79079722833" className="text-primary hover:underline">
                  +7 (907) 972-28-33
                </a>
              </li>
              <li>
                E-mail:{" "}
                <a href="mailto:ohrana.krs@mail.ru" className="text-primary hover:underline">
                  ohrana.krs@mail.ru
                </a>
              </li>
            </ul>
          </Section>
        </article>
      </div>
    </main>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-muted-foreground">{children}</div>
    </section>
  )
}
