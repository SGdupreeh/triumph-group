import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

type Lang = 'en' | 'ru'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

const copy = {
  en: {
    eyebrow: '// anti-faq',
    title: 'Before You Reach Out',
    items: [
      {
        q: 'Who do you NOT work with?',
        a: 'Those looking for a "business card site for 3 cents" or micro-managing every pixel. We build infrastructure for those ready to scale.',
      },
      {
        q: 'Why are your solutions more expensive than the market?',
        a: 'Because you invest in a system that replaces your sales and marketing department. One AI agent deployment pays for our work in 2 months.',
      },
      {
        q: 'What is the minimum engagement?',
        a: "We don't sell hours. We sell transformation. The entry point is a single-unit integration starting at $500. Full-system deployment is discussed individually.",
      },
      {
        q: 'How long does deployment take?',
        a: 'From 2 weeks for a single unit to 2 months for full infrastructure. Speed depends on how fast you make decisions.',
      },
    ],
  },
  ru: {
    eyebrow: '// анти-faq',
    title: 'Прежде чем обращаться',
    items: [
      {
        q: 'С кем вы НЕ работаете?',
        a: 'С теми, кто ищет «сайт-визитку за 3 копейки» или микроменеджерит каждый пиксель. Мы строим инфраструктуру для тех, кто готов масштабироваться.',
      },
      {
        q: 'Почему ваши решения дороже рынка?',
        a: 'Потому что вы инвестируете в систему, которая заменит вам отдел продаж и маркетинга. Одно внедрение AI-агента окупает нашу работу за 2 месяца.',
      },
      {
        q: 'Какой минимальный чек?',
        a: 'Мы не продаём часы. Мы продаём трансформацию. Точка входа — интеграция одного юнита от $500. Развёртка полной системы обсуждается индивидуально.',
      },
      {
        q: 'Сколько длится внедрение?',
        a: 'От 2 недель для одного юнита до 2 месяцев для полной инфраструктуры. Скорость зависит от того, насколько быстро вы принимаете решения.',
      },
    ],
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export default function AntiFAQ({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-3xl mx-auto">

      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">{t.eyebrow}</p>
        <h2 className="font-display font-bold tracking-tight text-gradient" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          {t.title}
        </h2>
      </motion.div>

      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-col gap-2"
      >
        {t.items.map((item, i) => {
          const isOpen = open === i
          return (
            <motion.div key={i} variants={fadeUp}>
              <button
                onClick={() => toggle(i)}
                className={[
                  'w-full flex items-center justify-between gap-4 px-6 py-5 rounded-xl text-left',
                  'border transition-all duration-300',
                  isOpen
                    ? 'border-white/[0.12] bg-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                    : 'border-white/[0.08] bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] hover:border-white/[0.1] hover:bg-white/[0.04]',
                ].join(' ')}
              >
                <span className="font-display text-[15px] font-medium text-white/80">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: 'spring' as const, bounce: 0.2, duration: 0.45 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={16} className="text-white/30" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring' as const, bounce: 0.15, duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pt-2 pb-5">
                      <p className="text-zinc-500 text-[14px] leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
