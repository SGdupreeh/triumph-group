import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useSpring, AnimatePresence } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

/* ── Fade-up animation wrapper ─────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Horizontal separator ──────────────────────────────────────────── */
function Sep() {
  return (
    <div style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 100%)',
      margin: '0',
    }} />
  )
}

/* ── Counter ticker ────────────────────────────────────────────────── */
function Ticker({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
    >
      {value}{suffix}
    </motion.span>
  )
}

/* ── Pricing card ──────────────────────────────────────────────────── */
interface PricingCardProps {
  tier: string
  name: string
  tagline: string
  price: string
  priceNote: string
  items: string[]
  highlight?: boolean
  badge?: string
  delay?: number
}
function PricingCard({ tier, name, tagline, price, priceNote, items, highlight, badge, delay = 0 }: PricingCardProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '20px',
        border: highlight
          ? '1px solid rgba(255,255,255,0.18)'
          : '1px solid rgba(255,255,255,0.06)',
        background: highlight
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(255,255,255,0.015)',
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        transition: 'border-color 400ms, box-shadow 400ms',
        boxShadow: hovered
          ? (highlight ? '0 0 60px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 0 30px rgba(255,255,255,0.03)')
          : (highlight ? 'inset 0 1px 0 rgba(255,255,255,0.07)' : 'none'),
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Badge */}
      {badge && (
        <div style={{
          position: 'absolute',
          top: '-1px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.9)',
          color: '#0c0c0d',
          fontSize: '10px',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          letterSpacing: '0.15em',
          padding: '4px 14px',
          borderRadius: '0 0 8px 8px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          {badge}
        </div>
      )}

      {/* Header */}
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
          {tier}
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: highlight ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)', letterSpacing: '-0.01em', marginBottom: '6px' }}>
          {name}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{tagline}</p>
      </div>

      {/* Price */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: highlight ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)', letterSpacing: '-0.02em' }}>
          {price}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '4px' }}>{priceNote}</p>
      </div>

      {/* Items */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: highlight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)', marginTop: '1px', flexShrink: 0, fontSize: '14px' }}>—</span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ── Timeline step ─────────────────────────────────────────────────── */
function TimelineStep({ week, title, tasks, index }: { week: string; title: string; tasks: string[]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.12 }}
      style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', position: 'relative' }}
    >
      {/* Line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.03)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        {index < 3 && <div style={{ width: '1px', flexGrow: 1, background: 'rgba(255,255,255,0.06)', marginTop: '8px', minHeight: '48px' }} />}
      </div>
      {/* Content */}
      <div style={{ paddingBottom: '40px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>{week}</p>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '12px', letterSpacing: '-0.01em' }}>{title}</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {tasks.map((t, i) => (
            <li key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', display: 'flex', gap: '8px', alignItems: 'flex-start', lineHeight: 1.55 }}>
              <span style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }}>›</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/* ── Unit block ────────────────────────────────────────────────────── */
function UnitBlock({ tag, icon, name, replaces, desc, delay }: { tag: string; icon: string; name: string; replaces: string; desc: string; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <FadeUp delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.06)',
          background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
          padding: '28px',
          transition: 'all 350ms',
          cursor: 'default',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px' }}>{icon}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase', paddingTop: '4px' }}>{tag}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '6px', letterSpacing: '-0.01em' }}>{name}</h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Заменяет: {replaces}
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{desc}</p>
      </div>
    </FadeUp>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function ProposalPage() {
  const [timerSecs, setTimerSecs] = useState(48 * 3600)
  const [ctaClicked, setCtaClicked] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // countdown
  useEffect(() => {
    const id = setInterval(() => setTimerSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const hh = String(Math.floor(timerSecs / 3600)).padStart(2, '0')
  const mm = String(Math.floor((timerSecs % 3600) / 60)).padStart(2, '0')
  const ss = String(timerSecs % 60).padStart(2, '0')

  const timeline = [
    {
      week: 'Неделя 1 — 2',
      title: 'Развёртывание ядра',
      tasks: [
        'Аудит текущей digital-инфраструктуры клиента',
        'Регистрация серверов и настройка окружения (Docker, VPS)',
        'Сборка визуального ядра: WebGL-интерфейс + фирменная система дизайна',
        'Генерация первого пула AI-контента (20–30 рендеров)',
      ],
    },
    {
      week: 'Неделя 3 — 4',
      title: 'Интеграция и автоматизация',
      tasks: [
        'Подключение n8n-вебхуков к CRM клиента (AmoCRM / Bitrix24)',
        'Сборка AI-агентов для WhatsApp и Instagram',
        'Запуск системы квалификации лидов в реальном времени',
        'Первые тесты: замер конверсии и скорости ответа на заявки',
      ],
    },
    {
      week: 'Неделя 5 — 6',
      title: 'Финальная отладка',
      tasks: [
        'QA: нагрузочное тестирование агентов и webhooks',
        'Передача доступов и документации команде клиента',
        'Запуск боевого режима. Первые метрики за 7 дней',
        'Установочный Board-звонок: итоги, прогнозы, SLA-договор',
      ],
    },
    {
      week: 'Месяц 2+',
      title: 'SLA — непрерывная поддержка',
      tasks: [
        'Серверные мощности и боты остаются под управлением Triumph Systems',
        'Ежемесячный retainer: апгрейды, отчёты, масштабирование',
        'Приоритетный доступ к новым AI-инструментам',
      ],
    },
  ]

  const units = [
    {
      tag: 'Визуальный движок',
      icon: '◈',
      name: 'Triumph Labs',
      replaces: 'Выездные фотосессии за млн ₽',
      desc: 'Генерируем бесконечный поток премиум-контента с помощью ИИ. Рендеры продукта, motion-видео, брендинг — без съёмочных групп и павильонов. Быстрее. Дешевле. Точнее позиционирование.',
    },
    {
      tag: 'Цифровое лицо',
      icon: '⬡',
      name: 'Triumph Codes',
      replaces: 'Неповоротливые agency-сайты',
      desc: 'Разворачиваем WebGL-интерфейсы, которые продают через эстетику и скорость. Ваш сайт становится продуктом, а не буклетом. Время загрузки — под 90 баллов Lighthouse.',
    },
    {
      tag: 'Автоматизация',
      icon: '⬢',
      name: 'Triumph Systems',
      replaces: 'Половину отдела продаж',
      desc: 'Связки на базе n8n мгновенно перехватывают лидов с Instagram и WhatsApp, квалифицируют их через AI и передают вам только тех, кто готов платить. Всё — без участия менеджера.',
    },
  ]

  const pricing = [
    {
      tier: 'Тариф I',
      name: '«Визуальная инъекция»',
      tagline: 'Только для тех, кто хочет эстетику без изменений в коде.',
      price: 'от 150 000 ₽',
      priceNote: 'разовый платёж · только Labs',
      items: [
        'Переупаковка соцсетей и сайта в единый визуальный язык',
        'Генерация 20–30 эталонных AI-рендеров продукта',
        'Система подачи контента на 3 месяца вперёд',
        'Техзадание для дальнейшего масштабирования',
      ],
    },
    {
      tier: 'Тариф II',
      name: '«Автономный контур»',
      tagline: 'Полная пересборка вашей digital-инфраструктуры под ключ.',
      price: 'от 500 000 ₽',
      priceNote: 'разовый платёж + 50 000 ₽/мес retainer · Labs + Codes + Systems',
      items: [
        'Разработка нового WebGL-сайта с нуля',
        'Интеграция n8n-вебхуков в вашу CRM',
        'AI-агенты для WhatsApp и Instagram 24/7',
        'База знаний о продукте для агентов',
        'Стартовый пул AI-контента (50+ рендеров)',
        'SLA-поддержка инфраструктуры: сервера и боты на нашей стороне',
      ],
      highlight: true,
      badge: 'Рекомендуемый',
    },
    {
      tier: 'Тариф III',
      name: '«Сингулярность»',
      tagline: 'Эксклюзивное партнёрство. Мы не работаем с вашими конкурентами.',
      price: 'от 1 000 000 ₽',
      priceNote: 'разовый + % от конверсии · полный стек + эксклюзив',
      items: [
        'Всё из «Автономного контура»',
        'Кастомные AI-агенты под каждого менеджера',
        'Эксклюзив: мы не берём прямых конкурентов в вашем городе — 12 мес.',
        'Ежеквартальные стратегические сессии с фаундером Triumph',
        '% от роста конверсии по договору',
      ],
    },
  ]

  return (
    <div style={{ background: '#080809', color: '#e4e4e7', fontFamily: 'var(--font-body)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Scroll progress */}
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
        background: 'rgba(255,255,255,0.35)', transformOrigin: '0%', scaleX, zIndex: 9999,
      }} />

      {/* Grain overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none', opacity: 0.12,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
      }} />

      {/* ════ HERO ════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '120px 24px 80px', textAlign: 'center', overflow: 'hidden' }}>

        {/* Background radial glow */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', width: '900px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', top: '30%', left: '20%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(180,180,255,0.015) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        <motion.div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '32px' }}
          >
            // triumph group · концепт архитектуры
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px, 6vw, 78px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '32px' }}
          >
            <span style={{
              background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Синтетическая архитектура<br />продаж для вашего бизнеса
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
            style={{ fontSize: 'clamp(15px, 2vw, 19px)', color: 'rgba(161,161,170,0.7)', lineHeight: 1.75, marginBottom: '60px', maxWidth: '640px', margin: '0 auto 60px' }}
          >
            Это не коммерческое предложение. Это проект трансформации вашего digital-присутствия — от визуального ядра до автономной системы захвата клиентов.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}
          >
            {[
              { label: 'среднее снижение стоимости лида', val: '−67', suf: '%' },
              { label: 'скорость ответа AI-агента', val: '<3', suf: 'сек' },
              { label: 'клиентов в квартал — наш лимит', val: '2', suf: '' },
            ].map(({ label, val, suf }, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.02em' }}>
                  <Ticker value={val} suffix={suf} />
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '6px', maxWidth: '140px' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}
          />
        </motion.div>
      </section>

      <Sep />

      {/* ════ ПРОБЛЕМА ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <FadeUp>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '28px' }}>
            // деконструкция проблемы
          </p>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start' }}>
          <FadeUp delay={0.1}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              <span style={{
                background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Пока другие<br />считают смету —<br />вы теряете рынок
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ fontSize: '16px', color: 'rgba(161,161,170,0.8)', lineHeight: 1.8 }}>
                Классические digital-агентства масштабируют ваши расходы. Они продают вам работу штата из 50 человек: аккаунт-менеджеров, копирайтеров, младших дизайнеров.
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(161,161,170,0.8)', lineHeight: 1.8 }}>
                Вы оплачиваете их ФОТ, больничные и кофе в офисе. <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Мы предлагаем другую парадигму.</span>
              </p>

              {/* Comparison */}
              <div style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', marginTop: '8px' }}>
                {[
                  { label: 'Классическое агентство', bad: true, items: ['ФОТ 50+ человек в штате', 'Месяцы на запуск', 'Работа по ТЗ, не по результату', 'Выездные съёмки за млн ₽'] },
                  { label: 'Triumph Group', bad: false, items: ['AI-инфраструктура вместо людей', 'Запуск за 2–4 недели', 'KPI: конверсия, скорость лида', 'Бесконечный контент без съёмок'] },
                ].map(({ label, bad, items }) => (
                  <div key={label} style={{ padding: '20px 24px', background: bad ? 'transparent' : 'rgba(255,255,255,0.02)', borderBottom: bad ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: bad ? 'rgba(255,100,100,0.4)' : 'rgba(100,255,150,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                      {bad ? '✕' : '✓'} {label}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {items.map((item, i) => (
                        <li key={i} style={{ fontSize: '13px', color: bad ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.55)', display: 'flex', gap: '8px' }}>
                          <span style={{ opacity: 0.4 }}>·</span>{item}
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

      {/* ════ ЭКОСИСТЕМА / ЮНИТЫ ═════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '20px' }}>
              // демонстрация экосистемы
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              <span style={{
                background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Три юнита.<br />Одна экосистема.
              </span>
            </h2>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {units.map((u, i) => (
            <UnitBlock key={u.name} {...u} delay={i * 0.12} />
          ))}
        </div>
      </section>

      <Sep />

      {/* ════ ROADMAP ════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          <FadeUp>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '20px' }}>
                // дорожная карта
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '24px' }}>
                <span style={{
                  background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Чёткие спринты.<br />Никаких абстрактных обещаний.
                </span>
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(161,161,170,0.6)', lineHeight: 1.75 }}>
                Каждый этап имеет конкретный результат, который вы можете пощупать. С первого дня — фиксированные дедлайны, KPI и ответственность.
              </p>
            </div>
          </FadeUp>

          <div>
            {timeline.map((step, i) => (
              <TimelineStep key={i} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Sep />

      {/* ════ ЦЕНООБРАЗОВАНИЕ ════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '20px' }}>
              // ценообразование
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '16px' }}>
              <span style={{
                background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.55) 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Мы продаём<br />бизнес-узлы, не часы
              </span>
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(161,161,170,0.5)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Три архитектуры. Выберите масштаб входа.
            </p>
          </div>
        </FadeUp>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {pricing.map((p, i) => (
            <PricingCard key={p.tier} {...p} delay={i * 0.1} />
          ))}
        </div>
      </section>

      <Sep />

      {/* ════ CTA — ЗАКРЫТИЕ ═════════════════════════════════════════════ */}
      <section style={{ padding: '120px 24px 160px', maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        {/* Background glow */}
        <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        <FadeUp>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '28px' }}>
            // закрытие
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '28px' }}>
            <span style={{
              background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.5) 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              В текущем квартале<br />мы берём только 2 компании
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p style={{ fontSize: '16px', color: 'rgba(161,161,170,0.65)', lineHeight: 1.8, marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
            Развёртывание подобной архитектуры требует 100% фокуса наших инженеров. Данный концепт и зарезервированные серверные мощности удерживаются за вами в течение 48 часов.
          </p>
        </FadeUp>

        {/* Countdown */}
        <FadeUp delay={0.3}>
          <div style={{ display: 'inline-flex', gap: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', padding: '20px 32px', marginBottom: '48px', alignItems: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.12em', marginRight: '20px' }}>
              осталось
            </p>
            {[[hh, 'ч'], [mm, 'м'], [ss, 'с']].map(([val, label], i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginRight: i < 2 ? '12px' : '0' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '32px', color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.02em', lineHeight: 1 }}>{val}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>{label}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* CTA Button */}
        <FadeUp delay={0.4}>
          <AnimatePresence mode="wait">
            {!ctaClicked ? (
              <motion.button
                key="cta"
                onClick={() => {
                  setCtaClicked(true)
                  // webhook placeholder — replace with real URL
                  fetch('https://hook.eu1.make.com/YOUR_WEBHOOK', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ event: 'board_call_request', timestamp: new Date().toISOString(), source: 'triumph-proposal' }),
                  }).catch(() => {})
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '18px 36px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.92)',
                  color: '#0c0c0d',
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px',
                  border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(255,255,255,0.08)',
                  transition: 'box-shadow 300ms',
                }}
              >
                Назначить установочный Board-звонок
                <span style={{ fontSize: '18px' }}>→</span>
              </motion.button>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '18px 36px', borderRadius: '12px',
                  border: '1px solid rgba(100,255,150,0.2)',
                  background: 'rgba(100,255,150,0.04)',
                  fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 500,
                  color: 'rgba(100,255,150,0.8)',
                }}
              >
                <span>✓</span> Запрос отправлен. Мы свяжемся с вами в течение 1 часа.
              </motion.div>
            )}
          </AnimatePresence>
        </FadeUp>

        {/* Fine print */}
        <FadeUp delay={0.55}>
          <p style={{ marginTop: '32px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em', lineHeight: 1.8 }}>
            Нажимая кнопку, вы подтверждаете интерес к партнёрству. Никакого спама — только первый стратегический разговор.
          </p>
        </FadeUp>
      </section>

      {/* ════ FOOTER ═════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '28px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>TRIUMPH</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}>
          © {new Date().getFullYear()} Triumph Group · Конфиденциальный концепт · Не для распространения
        </span>
        <a href="https://triumphgroup.cc" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>triumphgroup.cc</a>
      </footer>
    </div>
  )
}
