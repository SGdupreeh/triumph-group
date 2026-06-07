import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import InfrastructureB2B from '../components/InfrastructureB2B'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

type Lang = 'en' | 'ru'

const i18n = {
  en: {
    heroTag: 'triumph group · architecture concept · confidential',
    titleLine1: 'Synthetic',
    titleLine2: 'sales architecture',
    heroDesc: 'This is not a commercial proposal. This is a transformation project — from the visual core to an autonomous client acquisition system that works without your involvement.',
    stat1: '−67', stat1Suf: '%', stat1Label: 'average lead cost reduction',
    stat2: '<3', stat2Suf: ' s', stat2Label: 'AI agent response speed',
    stat3: '2', stat3Suf: '', stat3Label: 'clients per quarter — our limit',
    
    probTag: 'problem deconstruction',
    probTitle1: 'While others',
    probTitle2: 'calculate estimates —',
    probTitle3: 'you lose the market',
    probDesc1: 'Classic digital agencies scale your expenses. They sell you the work of a 50-person staff: account managers, copywriters, junior designers.',
    probDesc2: 'You pay their payroll, sick leave, and office coffee. ',
    probStrong: 'We offer a different paradigm.',
    
    compOldTitle: 'Classic agency',
    compOldItems: ['Payroll for 50+ staff', 'Launch takes months', 'Working by specs, not by results', 'Shoots cost millions of rubles'],
    compNewTitle: 'Triumph Group',
    compNewItems: ['AI infrastructure instead of people', 'Launch in 2–4 weeks', 'KPI: conversion and lead speed', 'Endless content without shoots'],
    
    unitsTag: 'ecosystem demonstration',
    unitsTitle1: 'Three units.',
    unitsTitle2: 'One ecosystem.',
    unitReplaces: 'Replaces: ',
    units: [
      { icon: '◈', tag: 'Visual Engine', name: 'Triumph Labs', replaces: 'On-site shoots for millions', desc: 'We generate an endless stream of premium AI content. Product renders, motion videos, brand visuals — without film crews or studios.' },
      { icon: '⬡', tag: 'Digital Face', name: 'Triumph Codes', replaces: 'Agency brochure websites', desc: 'WebGL interfaces that sell through aesthetics. Your site becomes a product. 90+ Lighthouse score. Apple.com level speed.' },
      { icon: '⬢', tag: 'Automation', name: 'Triumph Systems', replaces: 'Half of the sales department', desc: 'n8n flows intercept leads from Instagram and WhatsApp, qualify them via AI, and deliver only those ready to pay right now.' },
    ],

    roadmapTag: 'roadmap',
    roadmapTitle1: 'Clear sprints.',
    roadmapTitle2: 'No abstractions.',
    roadmapDesc: 'Every stage is a specific, measurable result. From day one: fixed deadlines, KPIs, and accountability for every step.',
    timeline: [
      { week: 'Week 1 — 2', title: 'Core Deployment', tasks: ['Audit of current digital infrastructure', 'Server environment setup (Docker, VPS)', 'WebGL interface + design system build', 'Generation of first AI content pool (20–30 renders)'] },
      { week: 'Week 3 — 4', title: 'Integration and Automation', tasks: ['n8n connection to CRM (AmoCRM / Bitrix24)', 'AI agents for WhatsApp and Instagram', 'Real-time lead qualification system', 'First conversion metrics'] },
      { week: 'Week 5 — 6', title: 'Final Debugging', tasks: ['QA: load testing', 'Handover of accesses and documentation', 'Live mode launch', 'Board call: results and SLA contract'] },
      { week: 'Month 2+', title: 'SLA — Continuous Support', tasks: ['Servers and bots on our side', 'Monthly retainer: upgrades and reports', 'Priority access to new AI tools'] },
    ],

    priceTag: 'pricing',
    priceTitle1: 'We sell',
    priceTitle2: 'business nodes, not hours',
    priceDesc: 'Three entry architectures. Choose your scale.',
    pricing: [
      {
        tier: 'Tier I', name: '«Visual Injection»',
        tagline: 'For those who want aesthetics without code changes.',
        price: 'from $1,500', priceNote: 'one-time payment · Labs only',
        items: ['Repackaging socials into a unified visual language', 'Generation of 20–30 AI product renders', 'Content system for 3 months', 'Technical specs for scaling'],
      },
      {
        tier: 'Tier II', name: '«Autonomous Contour»',
        tagline: 'Complete turnkey digital infrastructure rebuild.',
        price: 'from $5,000', priceNote: 'one-time + $500/mo · Labs + Codes + Systems',
        items: ['New WebGL site from scratch', 'n8n webhooks to your CRM', '24/7 AI agents (WhatsApp + Instagram)', 'Product knowledge base for agents', 'Starting content pool of 50+ renders', 'SLA: servers and bots on our side'],
        highlight: true, badge: 'Recommended',
      },
      {
        tier: 'Tier III', name: '«Singularity»',
        tagline: 'Exclusive partnership. Without your competitors.',
        price: 'from $10,000', priceNote: 'one-time + % of conversion · Full Stack + Exclusive',
        items: ['Everything from "Autonomous Contour"', 'Custom AI agents for each manager', 'Exclusive: no competitors in your city for 12 mos.', 'Quarterly strategy sessions with founder', '% of conversion growth per contract'],
      },
    ],

    ctaTag: 'closing',
    ctaTitle1: 'This quarter',
    ctaTitle2: 'we only take 2 companies',
    ctaDesc: 'Deploying such architecture requires 100% focus from our engineers. This concept and reserved capacities are held for you for 48 hours.',
    timeLeft: 'time left',
    timeH: 'h', timeM: 'm', timeS: 's',
    btnIdle: 'Schedule an intro Board call',
    btnSent: 'Request sent. We will contact you within 1 hour.',
    disclaimer: 'By clicking the button, you confirm your interest in partnership. No spam — just the first strategic conversation.',
    footerText: '© 2026 Triumph Group · Confidential concept · Not for distribution',
    lang: 'EN',
  },
  ru: {
    heroTag: 'triumph group · концепт архитектуры · конфиденциально',
    titleLine1: 'Синтетическая',
    titleLine2: 'архитектура продаж',
    heroDesc: 'Это не коммерческое предложение. Это проект трансформации — от визуального ядра до автономной системы захвата клиентов, которая работает без вашего участия.',
    stat1: '−67', stat1Suf: '%', stat1Label: 'среднее снижение стоимости лида',
    stat2: '<3', stat2Suf: ' сек', stat2Label: 'скорость ответа AI-агента',
    stat3: '2', stat3Suf: '', stat3Label: 'клиентов в квартал — наш лимит',
    
    probTag: 'деконструкция проблемы',
    probTitle1: 'Пока другие',
    probTitle2: 'считают смету —',
    probTitle3: 'вы теряете рынок',
    probDesc1: 'Классические digital-агентства масштабируют ваши расходы. Они продают вам работу штата из 50 человек: аккаунт-менеджеров, копирайтеров, младших дизайнеров.',
    probDesc2: 'Вы оплачиваете их ФОТ, больничные и кофе в офисе. ',
    probStrong: 'Мы предлагаем другую парадигму.',
    
    compOldTitle: 'Классическое агентство',
    compOldItems: ['ФОТ 50+ человек в штате', 'Запуск — месяцами', 'Работа по ТЗ, не по результату', 'Выездные съёмки за млн ₽'],
    compNewTitle: 'Triumph Group',
    compNewItems: ['AI-инфраструктура вместо людей', 'Запуск за 2–4 недели', 'KPI: конверсия и скорость лида', 'Бесконечный контент без съёмок'],
    
    unitsTag: 'демонстрация экосистемы',
    unitsTitle1: 'Три юнита.',
    unitsTitle2: 'Одна экосистема.',
    unitReplaces: 'Заменяет: ',
    units: [
      { icon: '◈', tag: 'Визуальный движок', name: 'Triumph Labs', replaces: 'Выездные съёмки за млн ₽', desc: 'Генерируем бесконечный поток премиум AI-контента. Рендеры продукта, motion-видео, brand-visual — без съёмочных групп и павильонов.' },
      { icon: '⬡', tag: 'Цифровое лицо', name: 'Triumph Codes', replaces: 'Агентские сайты-буклеты', desc: 'WebGL-интерфейсы, которые продают через эстетику. Ваш сайт становится продуктом. 90+ Lighthouse. Скорость — как у Apple.com.' },
      { icon: '⬢', tag: 'Автоматизация', name: 'Triumph Systems', replaces: 'Половину отдела продаж', desc: 'n8n-связки перехватывают лидов из Instagram и WhatsApp, квалифицируют через AI и отдают только тех, кто готов платить прямо сейчас.' },
    ],

    roadmapTag: 'дорожная карта',
    roadmapTitle1: 'Чёткие спринты.',
    roadmapTitle2: 'Никаких абстракций.',
    roadmapDesc: 'Каждый этап — конкретный измеримый результат. С первого дня: фиксированные дедлайны, KPI и ответственность за каждый шаг.',
    timeline: [
      { week: 'Неделя 1 — 2', title: 'Развёртывание ядра', tasks: ['Аудит текущей digital-инфраструктуры', 'Настройка серверного окружения (Docker, VPS)', 'Сборка WebGL-интерфейса + дизайн-система', 'Генерация первого пула AI-контента (20–30 рендеров)'] },
      { week: 'Неделя 3 — 4', title: 'Интеграция и автоматизация', tasks: ['Подключение n8n к CRM (AmoCRM / Bitrix24)', 'AI-агенты для WhatsApp и Instagram', 'Система квалификации лидов в реальном времени', 'Первые метрики конверсии'] },
      { week: 'Неделя 5 — 6', title: 'Финальная отладка', tasks: ['QA: нагрузочное тестирование', 'Передача доступов и документации', 'Запуск боевого режима', 'Board-звонок: итоги и SLA-договор'] },
      { week: 'Месяц 2+', title: 'SLA — непрерывная поддержка', tasks: ['Серверы и боты на нашей стороне', 'Ежемесячный retainer: апгрейды и отчёты', 'Приоритетный доступ к новым AI-инструментам'] },
    ],

    priceTag: 'ценообразование',
    priceTitle1: 'Мы продаём',
    priceTitle2: 'бизнес-узлы, не часы',
    priceDesc: 'Три архитектуры входа. Выберите масштаб.',
    pricing: [
      {
        tier: 'Тариф I', name: '«Визуальная инъекция»',
        tagline: 'Для тех, кто хочет эстетику без изменений в коде.',
        price: 'от 150 000 ₽', priceNote: 'разовый платёж · только Labs',
        items: ['Переупаковка соцсетей в единый визуальный язык', 'Генерация 20–30 AI-рендеров продукта', 'Система контента на 3 месяца', 'Техзадание для масштабирования'],
      },
      {
        tier: 'Тариф II', name: '«Автономный контур»',
        tagline: 'Полная пересборка digital-инфраструктуры под ключ.',
        price: 'от 500 000 ₽', priceNote: 'разовый + 50 000 ₽/мес · Labs + Codes + Systems',
        items: ['Новый WebGL-сайт с нуля', 'n8n-вебхуки в вашу CRM', 'AI-агенты 24/7 (WhatsApp + Instagram)', 'База знаний продукта для агентов', 'Стартовый пул контента 50+ рендеров', 'SLA: серверы и боты на нашей стороне'],
        highlight: true, badge: 'Рекомендуемый',
      },
      {
        tier: 'Тариф III', name: '«Сингулярность»',
        tagline: 'Эксклюзивное партнёрство. Без ваших конкурентов.',
        price: 'от 1 000 000 ₽', priceNote: 'разовый + % от конверсии · полный стек + эксклюзив',
        items: ['Всё из «Автономного контура»', 'Кастомные AI-агенты под каждого менеджера', 'Эксклюзив: без конкурентов в вашем городе 12 мес.', 'Ежеквартальные стратсессии с фаундером', '% от роста конверсии по договору'],
      },
    ],

    ctaTag: 'закрытие',
    ctaTitle1: 'В текущем квартале',
    ctaTitle2: 'мы берём только 2 компании',
    ctaDesc: 'Развёртывание подобной архитектуры требует 100% фокуса наших инженеров. Данный концепт и зарезервированные мощности удерживаются за вами в течение 48 часов.',
    timeLeft: 'осталось',
    timeH: 'ч', timeM: 'м', timeS: 'с',
    btnIdle: 'Назначить установочный Board-звонок',
    btnSent: 'Запрос отправлен. Свяжемся в течение 1 часа.',
    disclaimer: 'Нажимая кнопку, вы подтверждаете интерес к партнёрству. Никакого спама — только первый стратегический разговор.',
    footerText: '© 2026 Triumph Group · Конфиденциальный концепт · Не для распространения',
    lang: 'RU',
  }
}

/* ─────────────────────────────────────────────────────────────────────
   ATOMS
───────────────────────────────────────────────────────────────────── */

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6%' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: EASE, delay }}>
      {children}
    </motion.div>
  )
}

function Sep() {
  return <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent 100%)' }} />
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '20px' }}>
      // {children}
    </span>
  )
}

function Headline({ children, size = 'lg' }: { children: React.ReactNode; size?: 'sm' | 'lg' | 'xl' }) {
  const fs = size === 'xl' ? 'clamp(36px, 7vw, 88px)' : size === 'lg' ? 'clamp(28px, 4.5vw, 58px)' : 'clamp(22px, 3vw, 40px)'
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)', fontWeight: 700,
      fontSize: fs, letterSpacing: '-0.03em', lineHeight: 1.05,
      background: 'linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,0.42) 100%)',
      WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
    }}>{children}</h2>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   GRID BACKGROUND
───────────────────────────────────────────────────────────────────── */
function GridBg() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', opacity: 0.35 }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Radial mask so edges fade */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, #080809 100%)' }} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   TIMELINE
───────────────────────────────────────────────────────────────────── */
function TimelineStep({ week, title, tasks, index, last }: { week: string; title: string; tasks: string[]; index: number; last: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.1 }}
      style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.03)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.3)',
        }}>{String(index + 1).padStart(2, '0')}</div>
        {!last && <div style={{ width: '1px', background: 'rgba(255,255,255,0.05)', marginTop: '6px', minHeight: '52px', flexGrow: 1 }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : '40px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '5px' }}>{week}</p>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '17px', color: 'rgba(255,255,255,0.82)', marginBottom: '12px', letterSpacing: '-0.01em' }}>{title}</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {tasks.map((t, i) => (
            <li key={i} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', display: 'flex', gap: '8px', lineHeight: 1.6 }}>
              <span style={{ color: 'rgba(255,255,255,0.12)', flexShrink: 0 }}>›</span>{t}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════════════ */
export default function ProposalPage() {
  const [lang, setLang] = useState<Lang>('ru')
  const [secs, setSecs] = useState(48 * 3600)
  const [sent, setSent] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  const hh = String(Math.floor(secs / 3600)).padStart(2, '0')
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')

  const t = i18n[lang]

  return (
    <div style={{ background: '#080809', color: '#e4e4e7', fontFamily: 'var(--font-body)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Lang Switcher (Fixed Top Right) */}
      <div style={{ position: 'fixed', top: '24px', right: '32px', zIndex: 10000, display: 'flex', alignItems: 'center', gap: '2px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
        {(['en', 'ru'] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: '6px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer',
              background: lang === l ? 'rgba(255,255,255,0.08)' : 'transparent',
              color: lang === l ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
              transition: 'all 150ms', textTransform: 'uppercase',
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Cursor glow */}
      <div aria-hidden style={{
        position: 'fixed', width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.018) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
        transition: 'transform 0.15s ease',
      }} />

      {/* Progress bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.3)', transformOrigin: '0%', scaleX, zIndex: 9999 }} />

      {/* Film grain */}
      <div aria-hidden style={{
        position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none', opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
      }} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '130px 24px 100px', textAlign: 'center', overflow: 'hidden' }}>
        <GridBg />

        {/* Ambient orbs */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '20%', left: '15%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,120,200,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', top: '40%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,180,100,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-60%)', width: '800px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '920px' }}>
          <motion.p key={lang + 'tag'}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.15 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.16)', marginBottom: '36px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />
            {t.heroTag}
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />
          </motion.p>

          <motion.div key={lang + 'tit'}
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(36px, 7vw, 90px)', letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: '32px',
              background: 'linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {t.titleLine1}<br />{t.titleLine2}
            </h1>
          </motion.div>

          <motion.p key={lang + 'desc'}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
            style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(161,161,170,0.65)', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto 56px' }}>
            {t.heroDesc}
          </motion.p>

          {/* Stats */}
          <motion.div key={lang + 'stats'}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '44px' }}>
            {[
              { val: t.stat1, suf: t.stat1Suf, label: t.stat1Label },
              { val: t.stat2, suf: t.stat2Suf, label: t.stat2Label },
              { val: t.stat3, suf: t.stat3Suf, label: t.stat3Label },
            ].map(({ val, suf, label }, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.025em', color: 'rgba(255,255,255,0.85)' }}>
                  {val}{suf}
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '8px', maxWidth: '140px' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)' }}>
          <motion.div
            animate={{ y: [0, 9, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)' }} />
        </motion.div>
      </section>

      <Sep />

      {/* ══ ПРОБЛЕМА ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '110px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <FadeUp><Tag>{t.probTag}</Tag></FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
          <FadeUp delay={0.1}>
            <Headline>{t.probTitle1}<br />{t.probTitle2}<br />{t.probTitle3}</Headline>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontSize: '15px', color: 'rgba(161,161,170,0.75)', lineHeight: 1.85 }}>
                {t.probDesc1}
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(161,161,170,0.75)', lineHeight: 1.85 }}>
                {t.probDesc2}
                <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{t.probStrong}</span>
              </p>

              {/* Compare table */}
              <div style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', marginTop: '8px' }}>
                {[
                  { label: t.compOldTitle, ok: false, items: t.compOldItems },
                  { label: t.compNewTitle, ok: true, items: t.compNewItems },
                ].map(({ label, ok, items }) => (
                  <div key={label} style={{ padding: '20px 22px', background: ok ? 'rgba(255,255,255,0.015)' : 'transparent', borderBottom: ok ? 'none' : '1px solid rgba(255,255,255,0.04)' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: ok ? 'rgba(120,240,150,0.5)' : 'rgba(240,100,100,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>
                      {ok ? '✓' : '✕'}  {label}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {items.map((item, i) => (
                        <li key={i} style={{ fontSize: '13px', color: ok ? 'rgba(255,255,255,0.52)' : 'rgba(255,255,255,0.25)', display: 'flex', gap: '8px' }}>
                          <span style={{ opacity: 0.35 }}>·</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Sep />

      {/* ══ АРХИТЕКТУРНЫЕ РЕШЕНИЯ B2B (Replacing Units & Pricing) ═════════ */}
      <InfrastructureB2B />

      <Sep />

      {/* ══ ROADMAP ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '110px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>
          <FadeUp>
            <Tag>{t.roadmapTag}</Tag>
            <Headline size="sm">{t.roadmapTitle1}<br />{t.roadmapTitle2}</Headline>
            <p style={{ fontSize: '14px', color: 'rgba(161,161,170,0.55)', lineHeight: 1.8, marginTop: '20px' }}>
              {t.roadmapDesc}
            </p>
          </FadeUp>
          <div>
            {t.timeline.map((step, i) => (
              <TimelineStep key={i} {...step} index={i} last={i === t.timeline.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ СЕКЦИЯ ПРАЙСИНГА УДАЛЕНА ТАК КАК ОНА ТЕПЕРЬ В INFRASTRUCTURE ══ */}

      <Sep />

      {/* ══ CTA ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '130px 24px 160px', maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.015) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <FadeUp><Tag>{t.ctaTag}</Tag></FadeUp>

        <FadeUp delay={0.1}>
          <Headline size="lg">{t.ctaTitle1}<br />{t.ctaTitle2}</Headline>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p style={{ fontSize: '15px', color: 'rgba(161,161,170,0.6)', lineHeight: 1.85, margin: '28px auto 44px', maxWidth: '560px' }}>
            {t.ctaDesc}
          </p>
        </FadeUp>

        {/* Countdown */}
        <FadeUp delay={0.3}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.018)', padding: '18px 28px', marginBottom: '44px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', letterSpacing: '0.15em', marginRight: '16px' }}>{t.timeLeft}</span>
            {[[hh, t.timeH], [mm, t.timeM], [ss, t.timeS]].map(([v, l], i) => (
              <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginRight: i < 2 ? '10px' : 0 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '30px', color: 'rgba(255,255,255,0.82)', letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.18)' }}>{l}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Button */}
        <FadeUp delay={0.4}>
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.button key="btn"
                onClick={() => {
                  setSent(true)
                  fetch('https://hook.eu1.make.com/YOUR_WEBHOOK', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ event: 'board_call_request', timestamp: new Date().toISOString(), source: 'proposal-page' }),
                  }).catch(() => {})
                }}
                whileHover={{ scale: 1.025, boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 28px 80px rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.975 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '14px',
                  padding: '18px 40px', borderRadius: '14px',
                  background: 'rgba(255,255,255,0.93)', color: '#0a0a0b',
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px',
                  border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(255,255,255,0.07)',
                  transition: 'box-shadow 300ms',
                }}>
                {t.btnIdle}
                <span style={{ fontSize: '20px', lineHeight: 1 }}>→</span>
              </motion.button>
            ) : (
              <motion.div key="ok"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '18px 40px', borderRadius: '14px',
                  border: '1px solid rgba(120,240,150,0.2)', background: 'rgba(120,240,150,0.04)',
                  fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 500,
                  color: 'rgba(120,240,150,0.8)',
                }}>
                <span>✓</span> {t.btnSent}
              </motion.div>
            )}
          </AnimatePresence>
        </FadeUp>

        <FadeUp delay={0.55}>
          <p style={{ marginTop: '28px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.08em', lineHeight: 1.9 }}>
            {t.disclaimer}
          </p>
        </FadeUp>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '28px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}>TRIUMPH</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.12)' }}>
          {t.footerText}
        </span>
        <a href="https://triumphgroup.cc" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.18)', textDecoration: 'none' }}>triumphgroup.cc</a>
      </footer>
    </div>
  )
}
