import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Lang = 'en' | 'ru'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

const copy = {
  en: {
    eyebrow: '// process',
    title: 'How We Work',
    sub: 'Four phases. Zero guesswork.',
    steps: [
      { num: '01', title: 'Audit & Research', desc: 'Digitize your current model. Find budget leak points. Map every conversion gap before writing a single line of code.' },
      { num: '02', title: 'Engineering', desc: 'Deploy custom infrastructure — from design systems to API integrations. Every component built to scale.' },
      { num: '03', title: 'AI Integration', desc: 'Train neural networks on your data. Launch AI agents into your sales pipeline and support channels.' },
      { num: '04', title: 'Scale', desc: 'Launch traffic and switch to autonomous mode. Your system generates revenue while you sleep.' },
    ],
  },
  ru: {
    eyebrow: '// процесс',
    title: 'Как мы работаем',
    sub: 'Четыре фазы. Без гаданий.',
    steps: [
      { num: '01', title: 'Аудит и ресерч', desc: 'Оцифровываем вашу текущую модель. Ищем точки слива бюджета. Картируем каждый пробел в конверсии до написания первой строки кода.' },
      { num: '02', title: 'Инжиниринг', desc: 'Разворачиваем кастомную инфраструктуру — от дизайн-систем до API-интеграций. Каждый компонент создан для масштаба.' },
      { num: '03', title: 'Интеграция ИИ', desc: 'Обучаем нейросети на ваших данных. Запускаем AI-агентов в ваш пайплайн продаж и каналы поддержки.' },
      { num: '04', title: 'Масштабирование', desc: 'Запуск трафика и переход в автономный режим. Ваша система генерирует выручку, пока вы спите.' },
    ],
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: EASE } },
}

export default function Engine({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-5%' })

  // GSAP 3D Stack Effect
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Disable on mobile if we want
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray('.engine-card-wrapper') as HTMLElement[];
      const cards = gsap.utils.toArray('.engine-card') as HTMLElement[];
      
      wrappers.forEach((wrapper, i) => {
        if (i === wrappers.length - 1) return; // Last card doesn't shrink
        
        gsap.to(cards[i], {
          scale: 0.92 - (wrappers.length - 1 - i) * 0.02,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: () => `top ${window.innerHeight * 0.25 + i * 30}`,
            end: () => `bottom ${window.innerHeight * 0.25 + i * 30}`,
            scrub: true,
            invalidateOnRefresh: true,
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto overflow-clip">

      {/* Background spotlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] rounded-full blur-[120px]" style={{ background: 'rgba(255,255,255,0.02)' }} />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[300px] rounded-full blur-[100px]" style={{ background: 'rgba(255,255,255,0.015)' }} />
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 relative z-10">

        {/* Left — sticky header */}
        <div className="lg:sticky lg:top-[40vh] lg:self-start">
          <motion.p
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/20 mb-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            {t.eyebrow}
          </motion.p>
          <motion.h2
            className="font-display font-bold tracking-tight text-gradient mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className="text-zinc-500 text-[14px]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          >
            {t.sub}
          </motion.p>
        </div>

        {/* Right — scrolling step cards */}
        <div className="flex flex-col gap-0 relative">
          {/* Timeline spine */}
          <div
            className="absolute left-0 top-6 bottom-6 w-px hidden lg:block"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)' }}
          />
          {t.steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: i * 0.08 }}
              className="relative lg:pl-8 lg:sticky engine-card-wrapper"
              style={{ top: `calc(25vh + ${i * 30}px)` }}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-0 top-8 -translate-x-1/2 w-1.5 h-1.5 rounded-full hidden lg:block"
                style={{ background: 'rgba(255,255,255,0.3)', boxShadow: '0 0 6px rgba(255,255,255,0.2)' }}
              />
              <div
                className={`engine-card spotlight-card group relative p-8 rounded-2xl bg-[#0c0c0d] backdrop-blur-2xl border border-white/[0.1] shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-white/[0.03] hover:border-white/[0.15] transition-colors duration-300 overflow-hidden ${i < t.steps.length - 1 ? 'mb-32' : 'mb-32'}`}
              >
                {/* Watermark number */}
                <span
                  aria-hidden
                  className="absolute -top-4 -right-2 font-display font-bold text-white/[0.03] select-none pointer-events-none leading-none"
                  style={{ fontSize: '140px' }}
                >
                  {step.num}
                </span>

                <div className="relative z-10">
                  <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/25 mb-3">{step.num}</p>
                  <h3 className="font-display text-[20px] font-semibold text-white/90 mb-3">{step.title}</h3>
                  <p className="text-zinc-500 text-[14px] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
