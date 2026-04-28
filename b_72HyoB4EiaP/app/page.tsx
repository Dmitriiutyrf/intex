"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { CustomCursor } from "@/components/custom-cursor"
import { Preloader } from "@/components/preloader"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { ServiceSection } from "@/components/service-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

const Scene3D = dynamic(
  () => import("@/components/scene-3d").then((mod) => ({ default: mod.Scene3D })),
  { ssr: false }
)

// Service data
const services = {
  fire: {
    id: "fire",
    pageNumber: "02",
    code: "FIRE_SAFETY",
    title: "Пожарная безопасность",
    description:
      "Проектирование, монтаж и обслуживание систем пожаротушения и пожарной сигнализации. Выполняем автоматическую пожарную сигнализацию (АПС), системы оповещения и управления эвакуацией (СОУЭ), а также монтаж установок водяного, газового и порошкового пожаротушения (АУПТ).",
    services: [
      { number: "01", title: "Автоматическая пожарная сигнализация (АПС)" },
      { number: "02", title: "Системы оповещения и управления эвакуацией (СОУЭ)" },
      { number: "03", title: "Установки водяного и пенного пожаротушения" },
      { number: "04", title: "Газовое и порошковое пожаротушение (АУПТ)" },
      { number: "05", title: "Системы дымоудаления и подпора воздуха" },
      { number: "06", title: "Техническое обслуживание и регламентные работы" },
    ],
    portfolio: [
      {
        number: "01",
        title: 'Торговый центр «Горизонт»',
        description: "Монтаж системы водяного пожаротушения на площади 15 000 кв.м. Полный цикл работ.",
      },
      {
        number: "02",
        title: "Складской комплекс класса А",
        description: "Проектирование и установка АПС и СОУЭ 4-го типа для логистического хаба.",
      },
    ],
  },
  lowVoltage: {
    id: "low-voltage",
    pageNumber: "03",
    code: "LOW_VOLTAGE",
    title: "Слаботочные системы",
    description:
      "Охранная сигнализация, системы контроля и управления доступом (СКУД) и видеонаблюдение. Создаём интегрированные комплексы безопасности: турникеты, биометрические считыватели, периметральная охрана и системы охранного телевидения (СОТ).",
    services: [
      { number: "01", title: "Системы контроля и управления доступом (СКУД)" },
      { number: "02", title: "Видеонаблюдение и охранное телевидение (СОТ)" },
      { number: "03", title: "Охранная и тревожная сигнализация" },
      { number: "04", title: "Структурированные кабельные системы (СКС)" },
      { number: "05", title: "Биометрия и интеграция учёта рабочего времени" },
      { number: "06", title: "Периметральные системы охраны" },
    ],
    portfolio: [
      {
        number: "01",
        title: 'Бизнес-центр «Альфа»',
        description: "Оснащение здания системой СКУД на 2000 пользователей с интеграцией учёта рабочего времени.",
      },
      {
        number: "02",
        title: "Завод металлоконструкций",
        description: "Установка периметральной охранной сигнализации с интеграцией в общий пульт.",
      },
    ],
  },
  electrical: {
    id: "electrical",
    pageNumber: "04",
    code: "ELECTRICAL",
    title: "Электромонтаж",
    description:
      "Устройство внутренних и наружных инженерных сетей, силовое электрооборудование. Полный комплекс работ по электроснабжению: от прокладки кабельных трасс и сборки ВРУ до монтажа внутреннего и наружного освещения.",
    services: [
      { number: "01", title: "Прокладка силовых и кабельных трасс" },
      { number: "02", title: "Сборка и монтаж ВРУ, ГРЩ, этажных щитов" },
      { number: "03", title: "Внутреннее и архитектурное освещение" },
      { number: "04", title: "Наружное и мачтовое освещение территории" },
      { number: "05", title: "Системы заземления и молниезащиты" },
      { number: "06", title: "Источники бесперебойного питания (ИБП)" },
    ],
    portfolio: [
      {
        number: "01",
        title: 'Жилой комплекс «Новатор»',
        description: "Прокладка внутренних силовых сетей, монтаж этажных щитов и системы освещения МОП.",
      },
      {
        number: "02",
        title: "Логистический парк",
        description: "Монтаж мачтового освещения территории и внутреннего освещения складских помещений.",
      },
    ],
  },
  design: {
    id: "design",
    pageNumber: "05",
    code: "ENGINEERING_DESIGN",
    title: "Проектирование",
    description:
      'Разработка проектной и рабочей документации для инженерных систем. Готовим стадию «П» (проектная документация) и «РД» (рабочая документация) для всех видов слаботочных систем, систем пожарной безопасности и электроснабжения с прохождением государственной экспертизы.',
    services: [
      { number: "01", title: 'Стадия «П» — проектная документация' },
      { number: "02", title: 'Стадия «РД» — рабочая документация' },
      { number: "03", title: "Прохождение государственной экспертизы" },
      { number: "04", title: "Согласование с надзорными органами" },
      { number: "05", title: "Авторский надзор за реализацией" },
      { number: "06", title: "Исполнительная документация" },
    ],
    portfolio: [
      {
        number: "01",
        title: "Государственная поликлиника",
        description: "Проектирование комплекса слаботочных систем (СКС, ЛВС, телефония) для медучреждения.",
      },
      {
        number: "02",
        title: "Сеть ресторанов",
        description: "Типовое проектирование систем пожарной безопасности для 15 объектов сети.",
      },
    ],
  },
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Disable scroll during preloader
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isLoading])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
    setTimeout(() => setShowContent(true), 100)
  }

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <Scene3D />
      
      <main
        className={`relative z-10 transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navigation />
        <Hero />
        <Marquee />
        <ServiceSection {...services.fire} />
        <ServiceSection {...services.lowVoltage} />
        <ServiceSection {...services.electrical} />
        <ServiceSection {...services.design} />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
