import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useSpring, AnimatePresence } from 'framer-motion'

const SPRING = { type: 'spring' as const, bounce: 0, duration: 0.8 }
const FAST_SPRING = { type: 'spring' as const, bounce: 0, duration: 0.5 }

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
      transition={{ ...SPRING, delay }}>
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
          <pattern id="grid-b2c" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-b2c)" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, #080809 100%)' }} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   PRICING CARD
───────────────────────────────────────────────────────────────────── */
interface PricingCardProps {
  tier: string; name: string; subtitle: string
  price: string; priceNote: string; items: string[]; outcome: string
  highlight?: boolean; badge?: string; delay?: number
}

function PricingCard({ tier, name, subtitle, price, priceNote, items, outcome, highlight, badge, delay = 0 }: PricingCardProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  const [hov, setHov] = useState(false)

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: hov ? 1.01 : 1 } : { opacity: 0, y: 36, scale: 0.96 }}
      transition={{ ...FAST_SPRING, delay }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', flex: 1, minWidth: 0,
        borderRadius: '20px',
        border: highlight ? '1px solid rgba(255,255,255,0.16)' : '1px solid rgba(255,255,255,0.06)',
        background: highlight ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.012)',
        padding: '36px 28px', display: 'flex', flexDirection: 'column', gap: '22px',
        transition: 'box-shadow 400ms, border-color 400ms',
        transformOrigin: 'center bottom',
        boxShadow: hov
          ? highlight
            ? '0 0 80px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 0 40px rgba(255,255,255,0.025)'
          : highlight
            ? 'inset 0 1px 0 rgba(255,255,255,0.06)'
            : 'none',
      }}>

      {badge && (
        <div style={{
          position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.93)', color: '#080809',
          fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
          letterSpacing: '0.18em', padding: '4px 16px',
          borderRadius: '0 0 10px 10px', textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>{badge}</div>
      )}

      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '10px' }}>{tier}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: highlight ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.65)', letterSpacing: '-0.01em', marginBottom: '8px' }}>{name}</h3>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>{subtitle}</p>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '18px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: highlight ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em' }}>{price}</div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.18)', marginTop: '4px', lineHeight: 1.5 }}>{priceNote}</p>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', flexGrow: 1 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: highlight ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.18)', marginTop: '2px', flexShrink: 0, fontSize: '12px', lineHeight: 1 }}>—</span>
            <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item}</span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
         <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
           <span style={{ color: 'rgba(255,255,255,0.6)' }}>Суть: </span>
           {outcome}
         </p>
      </div>
    </motion.div>
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
      transition={{ ...SPRING, delay: index * 0.1 }}
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

/* ─────────────────────────────────────────────────────────────────────
   UNIT CARD
───────────────────────────────────────────────────────────────────── */
function UnitCard({ icon, tag, name, replaces, desc, delay }: { icon: string; tag: string; name: string; replaces: string; desc: string; delay: number }) {
  const [hov, setHov] = useState(false)
  return (
    <FadeUp delay={delay}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
        borderRadius: '16px', padding: '28px',
        border: hov ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.055)',
        background: hov ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.012)',
        transition: 'all 350ms', cursor: 'default',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <span style={{ fontSize: '26px', lineHeight: 1 }}>{icon}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{tag}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', color: 'rgba(255,255,255,0.88)', marginBottom: '6px', letterSpacing: '-0.01em' }}>{name}</h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.18)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Заменяет: {replaces}
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.75 }}>{desc}</p>
      </div>
    </FadeUp>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════════════ */
export default function ProposalB2CPage() {
  const [sent, setSent] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  const units = [
    { icon: '◈', tag: 'Визуальный движок', name: 'Triumph Labs', replaces: 'Видеографа и фотографа', desc: 'Генерируем бесконечный пул фото и видео для Reels/Shorts без студий и камер. Ты просто даёшь нам своё лицо (исходники), мы делаем из тебя икону.' },
    { icon: '⬡', tag: 'Цифровое лицо', name: 'Triumph Codes', replaces: 'Taplink и шаблонные сайты', desc: 'Собираем личный WebGL-сайт (Link-in-bio на стероидах). Никаких унылых Taplink. Только чёрный матовый фон, плавные 3D-анимации и твой статус.' },
    { icon: '⬢', tag: 'Автоматизация', name: 'Triumph Systems', replaces: 'Ручной ответ на DM', desc: 'n8n-интеграции автоматически собирают лидов с твоего сайта, парсят конкурентов, рассылают авто-ответы и ведут твой Telegram-канал.' },
  ]

  const timeline = [
    { week: 'День 1 — 2', title: 'Аудит и брифинг', tasks: ['Анализ текущего контента и соцсетей', 'Определение визуального гайдлайна (Dark Tech / Minimal / Luxury)', 'Сбор исходников: фото, голос, стиль речи', 'Формирование технического задания'] },
    { week: 'День 3 — 5', title: 'Продакшен ядра', tasks: ['Генерация первого пула AI-контента (10–20 рендеров)', 'Сборка WebGL-визитки: чёрный фон, 3D-анимации на скролле', 'Монтаж сетки для Instagram/Telegram'] },
    { week: 'День 5 — 7', title: 'Интеграция и запуск', tasks: ['Настройка n8n-автоматизаций (сбор лидов, авто-ответы)', 'Подключение Telegram-бота (если Full Stack)', 'Финальная отладка и передача доступов', 'Запуск боевого режима'] },
    { week: 'Неделя 2+', title: 'Поддержка и масштабирование', tasks: ['Обновление контента по подписке (Labs)', 'Аналитика и оптимизация конверсий', 'Приоритетный доступ к новым AI-инструментам'] },
  ]

  const pricing = [
    {
      tier: 'Тариф I', name: '«Контент-Конвейер»',
      subtitle: 'Замена личного продакшена.',
      price: '20 000 ₽ / мес',
      priceNote: 'подписка · только Labs',
      items: ['Разработка жёсткого визуального гайдлайна (Dark Tech / Minimal)', 'Пакетная генерация и монтаж сетки контента для соцсетей', 'ИИ-обработка и моушн-дизайн', 'Ежемесячное обновление визуальной сетки'],
      outcome: 'Подсаживаем на подписку. Три клиента — стабильный доход без проектной работы.'
    },
    {
      tier: 'Тариф II', name: '«Цифровой Монолит»',
      subtitle: 'Личный сайт премиум-класса + контент.',
      price: '50 000 ₽',
      priceNote: 'разовый · Labs + Codes',
      items: ['Разработка WebGL-визитки (никаких конструкторов, только код)', 'Чёрный фон, плавные 3D-анимации на скролле', 'Полная визуальная упаковка соцсетей (Labs)', 'Адаптация под мобильные устройства'],
      outcome: 'Один закрытый клиент на этот тариф = оплата аренды вашего хаба на месяц.',
      highlight: true, badge: 'Твой главный фокус',
    },
    {
      tier: 'Тариф III', name: '«Автономный Соло»',
      subtitle: 'Микро-версия B2B-инфраструктуры.',
      price: '90 000 ₽',
      priceNote: 'разовый · Full Stack',
      items: ['WebGL-сайт с нуля', 'Пакет контента (Labs)', 'Интеграция n8n: автоматический сбор лидов с сайта в Telegram/Notion', 'Парсинг конкурентов и авто-ответы', 'Настройка воронки входящего трафика'],
      outcome: 'Два таких чека — это твой MacBook.'
    },
  ]

  return (
    <div style={{ background: '#080809', color: '#e4e4e7', fontFamily: 'var(--font-body)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Cursor glow */}
      <motion.div aria-hidden
        animate={{ x: mousePos.x - 300, y: mousePos.y - 300 }}
        transition={{ type: 'spring' as const, bounce: 0, duration: 0.3 }}
        style={{
          position: 'fixed', width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.018) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
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
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.15 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.16)', marginBottom: '36px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />
            triumph group · solo-enterprise · персональная архитектура
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.3 }}>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(36px, 7vw, 90px)', letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: '32px',
              background: 'linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Личная цифровая<br />инфраструктура.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.5 }}
            style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(161,161,170,0.65)', lineHeight: 1.8, maxWidth: '680px', margin: '0 auto 56px' }}>
            Ты работаешь один, но твой цифровой след должен выглядеть как у корпорации. Мы не делаем дизайн. Мы разворачиваем автономную архитектуру для соло-фаундеров, крипто-проектов и медийных экспертов, заменяя собой целую команду продакшена.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.7 }}
            style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '44px' }}>
            {[
              { val: '7', suf: ' дней', label: 'полный запуск инфраструктуры' },
              { val: '0', suf: ' съёмок', label: 'весь контент генерируется AI' },
              { val: '4', suf: '', label: 'проекта в месяц — наш лимит' },
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

      {/* ══ ДЕКОНСТРУКЦИЯ ПРОБЛЕМЫ ════════════════════════════════════════ */}
      <section style={{ padding: '110px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <FadeUp><Tag>деконструкция проблемы</Tag></FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
          <FadeUp delay={0.1}>
            <Headline>Нанимать подрядчиков —<br />значит сливать бюджет</Headline>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontSize: '15px', color: 'rgba(161,161,170,0.75)', lineHeight: 1.85 }}>
                Нанимать видеографа, дизайнера и верстальщика — это долго, дорого и нестабильно. Использовать шаблонные Taplink — значит сливаться с тысячами новичков.
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(161,161,170,0.75)', lineHeight: 1.85 }}>
                Мы даем тебе монолитную систему: твой личный WebGL-интерфейс, бесперебойный ИИ-продакшен контента и автоматизацию входящего трафика.{' '}
                <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Мы предлагаем другую парадигму.</span>
              </p>

              {/* Compare table */}
              <div style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', marginTop: '8px' }}>
                {[
                  { label: 'Классический подход', ok: false, items: ['Видеограф + дизайнер + верстальщик = 100–200k/мес', 'Шаблонный Taplink как у всех', 'Ручные ответы в DM — пока ты спишь, лиды уходят', 'Съёмки: аренда студии, реквизит, время'] },
                  { label: 'Triumph Group', ok: true, items: ['AI-продакшен: бесконечный контент без камер', 'WebGL-визитка с 3D-анимациями, как у Apple', 'n8n-автоматизация: лиды приходят, пока ты спишь', 'Запуск всей инфраструктуры за 7 дней'] },
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

      {/* ══ ЮНИТЫ ═════════════════════════════════════════════════════════ */}
      <section style={{ padding: '110px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Tag>инфраструктура для одного</Tag>
            <Headline>Три юнита.<br />Одна экосистема.</Headline>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {units.map((u, i) => <UnitCard key={u.name} {...u} delay={i * 0.1} />)}
        </div>
      </section>

      <Sep />

      {/* ══ ROADMAP ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '110px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>
          <FadeUp>
            <Tag>дорожная карта</Tag>
            <Headline size="sm">7 дней до запуска.<br />Никаких абстракций.</Headline>
            <p style={{ fontSize: '14px', color: 'rgba(161,161,170,0.55)', lineHeight: 1.8, marginTop: '20px' }}>
              Каждый этап — конкретный измеримый результат. С первого дня: фиксированные дедлайны, прозрачный процесс и ответственность за каждый шаг.
            </p>
          </FadeUp>
          <div>
            {timeline.map((step, i) => (
              <TimelineStep key={i} {...step} index={i} last={i === timeline.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <Sep />

      {/* ══ ЦЕНООБРАЗОВАНИЕ ═══════════════════════════════════════════════ */}
      <section style={{ padding: '110px 24px', maxWidth: '1240px', margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Tag>матрица тарифов «Solo-Enterprise»</Tag>
            <Headline>Быстрые транзакции<br />для твоего кэшфлоу</Headline>
            <p style={{ fontSize: '14px', color: 'rgba(161,161,170,0.45)', maxWidth: '400px', margin: '16px auto 0', lineHeight: 1.7 }}>Три архитектуры входа. Выбери масштаб.</p>
          </div>
        </FadeUp>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {pricing.map((p, i) => <PricingCard key={p.tier} {...p} delay={i * 0.1} />)}
        </div>
      </section>

      <Sep />

      {/* ══ CTA ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '130px 24px 160px', maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.015) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <FadeUp><Tag>точка входа</Tag></FadeUp>

        <FadeUp delay={0.1}>
          <Headline size="lg">Архитектура разворачивается<br />за 7 дней</Headline>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p style={{ fontSize: '15px', color: 'rgba(161,161,170,0.6)', lineHeight: 1.85, margin: '28px auto 44px', maxWidth: '560px' }}>
            Мы берем только 4 личных проекта в месяц, чтобы гарантировать кинематографическое качество юнита Codes. Оставь заявку — и мы свяжемся в течение 1 часа.
          </p>
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
                    body: JSON.stringify({ event: 'b2c_request', timestamp: new Date().toISOString(), source: 'proposal-b2c-page' }),
                  }).catch(() => {})
                }}
                whileHover={{ scale: 1.025, boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 28px 80px rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.975 }}
                transition={FAST_SPRING}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '14px',
                  padding: '18px 40px', borderRadius: '14px',
                  background: 'rgba(255,255,255,0.93)', color: '#0a0a0b',
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px',
                  border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(255,255,255,0.07)',
                }}>
                Запустить инфраструктуру
                <span style={{ fontSize: '20px', lineHeight: 1 }}>→</span>
              </motion.button>
            ) : (
              <motion.div key="ok"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={FAST_SPRING}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '18px 40px', borderRadius: '14px',
                  border: '1px solid rgba(120,240,150,0.2)', background: 'rgba(120,240,150,0.04)',
                  fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 500,
                  color: 'rgba(120,240,150,0.8)',
                }}>
                <span>✓</span> Запрос отправлен. Свяжемся в течение 1 часа.
              </motion.div>
            )}
          </AnimatePresence>
        </FadeUp>

        <FadeUp delay={0.55}>
          <p style={{ marginTop: '28px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.08em', lineHeight: 1.9 }}>
            Нажимая кнопку, ты подтверждаешь интерес к партнёрству.<br />Никакого спама — только первый стратегический разговор.
          </p>
        </FadeUp>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '28px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}>TRIUMPH</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.12)' }}>
          © {new Date().getFullYear()} Triumph Group · Solo-Enterprise Infrastructure
        </span>
        <a href="https://triumphgroup.cc" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.18)', textDecoration: 'none' }}>triumphgroup.cc</a>
      </footer>
    </div>
  )
}
