import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Lang = 'en' | 'ru'

const copy = {
  en: {
    eyebrow: '// about',
    title: 'Not an agency.\nA digital syndicate.',
    body: 'Triumph Group is a closed infrastructure for AI-media and IT solutions. We engineer dominance, not deliverables. Four autonomous tech units, one uncompromising standard.',
    metrics: [
      { value: '×3',  label: 'Average conversion growth',   bar: 0.82 },
      { value: '4',   label: 'Elite autonomous units',       bar: 1.0  },
      { value: 'AI',  label: 'First — always',               bar: 0.96 },
    ],
  },
  ru: {
    eyebrow: '// о нас',
    title: 'Не агентство.\nЦифровой синдикат.',
    body: 'Triumph Group — закрытая инфраструктура для AI-медиа и IT-решений. Мы создаём доминирование, а не просто продукты. Четыре автономных технологических юнита, один бескомпромиссный стандарт.',
    metrics: [
      { value: '×3',  label: 'Рост конверсии в среднем',    bar: 0.82 },
      { value: '4',   label: 'Элитных автономных юнита',    bar: 1.0  },
      { value: 'AI',  label: 'First — всегда',               bar: 0.96 },
    ],
  },
}

export default function About({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const sectionRef = useRef<HTMLElement>(null)
  const valRef1 = useRef<HTMLDivElement>(null)
  const valRef2 = useRef<HTMLDivElement>(null)
  const valRef3 = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.0, // Creates the physical weight/momentum
          start: "top top",
          end: "+=300%", // 3 screens of scrolling
          invalidateOnRefresh: true,
        }
      })

      // Setup initial states
      gsap.set(".about-text", { opacity: 0, y: 30 })
      gsap.set([".card-0", ".card-1", ".card-2"], { opacity: 0, y: 50 }) // All cards start from bottom
      gsap.set(".bar-fill", { width: "0%" })
      gsap.set(valRef3.current, { opacity: 0, scale: 0.8 }) // Less dramatic scale

      const countObj1 = { val: 0 }
      const countObj2 = { val: 0 }

      // --- STAGE 0: Initial Reveal ---
      tl.to(".about-text", { opacity: 1, y: 0, stagger: 0.1, duration: 1.0, ease: "power3.out" })
      tl.to(".card-0", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, "<")
      
      // Counter for Card 1 (0 to 3)
      tl.to(countObj1, { 
        val: 3, 
        duration: 1.0, 
        roundProps: "val", 
        onUpdate: () => { if (valRef1.current) valRef1.current.innerText = `×${countObj1.val}` } 
      }, "<")
      tl.to(".bar-fill-0", { width: `${t.metrics[0].bar * 100}%`, duration: 1.0, ease: "power3.out" }, "<")

      tl.to({}, { duration: 0.3 }) // brief pause

      // --- STAGE 1: Card 2 Reveal ---
      tl.to(".card-1", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }) // smooth fade up
      
      // Counter for Card 2 (0 to 4) starts upon appearance
      tl.to(countObj2, { 
        val: 4, 
        duration: 1.0, 
        roundProps: "val", 
        onUpdate: () => { if (valRef2.current) valRef2.current.innerText = `${countObj2.val}` } 
      }, "<")
      tl.to(".bar-fill-1", { width: `${t.metrics[1].bar * 100}%`, duration: 1.0, ease: "power3.out" }, "<")
      
      tl.to({}, { duration: 0.3 }) // brief pause

      // --- STAGE 2: Card 3 Reveal ---
      tl.to(".card-2", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }) // smooth fade up
      
      // "AI" text fades in smoothly
      tl.to(valRef3.current, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "<")
      tl.to(".bar-fill-2", { width: `${t.metrics[2].bar * 100}%`, duration: 1.0, ease: "power3.out" }, "<")

      tl.to({}, { duration: 0.5 }) // End padding

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-20 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-center px-6 lg:px-12 overflow-hidden bg-[#0c0c0d]">

      <div className="max-w-7xl mx-auto w-full">
        {/* Background spotlight */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[120px]" style={{ background: 'rgba(255,255,255,0.025)' }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div>
            <p className="about-text opacity-0 font-mono text-[11px] tracking-[0.2em] uppercase text-white/20 mb-5">
              {t.eyebrow}
            </p>
            <h2
              className="about-text opacity-0 font-display font-bold tracking-tight leading-[1.15] mb-6 text-gradient whitespace-pre-line"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              {t.title}
            </h2>
            <p className="about-text opacity-0 text-zinc-400 leading-relaxed text-[16px]">
              {t.body}
            </p>
          </div>

          <div className="flex flex-col gap-3 relative">
            {t.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`card-${i} spotlight-card group flex flex-col gap-3 px-6 py-5 rounded-xl bg-[#0c0c0d] backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_10px_20px_rgba(0,0,0,0.3)] transition-colors duration-300 relative z-${10 - i}`}
              >
                <div className="flex items-center gap-6">
                  <div 
                    ref={i === 0 ? valRef1 : i === 1 ? valRef2 : valRef3}
                    className="font-display text-[40px] font-bold text-gradient leading-none w-20 flex-shrink-0"
                  >
                    {/* Default values, GSAP takes over immediately */}
                    {i === 0 ? '×0' : i === 1 ? '0' : 'AI'}
                  </div>
                  <div className="text-[13px] text-zinc-500 font-medium leading-snug">{m.label}</div>
                </div>
                {/* Progress bar */}
                <div className="h-px w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`bar-fill bar-fill-${i} h-full rounded-full w-0`}
                    style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.35))' }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
