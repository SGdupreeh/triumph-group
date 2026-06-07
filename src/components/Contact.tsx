import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Lang = 'en' | 'ru'

const copy = {
  en: {
    eyebrow: '// contact',
    title: 'Ready to\nDominate?',
    sub: 'We choose who we work with.',
    email: 'ceo@triumphgroup.cc',
  },
  ru: {
    eyebrow: '// контакт',
    title: 'Готовы\nДоминировать?',
    sub: 'Мы выбираем, с кем работаем.',
    email: 'ceo@triumphgroup.cc',
  },
}

export default function Contact({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Endless Pulsating Void (Event Horizon)
      gsap.to(bgRef.current, {
        scale: 1.1,
        opacity: 0.8,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      })

      // Initial state
      gsap.set(".contact-eyebrow, .contact-sub, .contact-email-wrapper", { opacity: 0, y: 20 })
      gsap.set(".contact-title", { 
        opacity: 0, 
        letterSpacing: "0.5em", // Huge initial spacing
        filter: "blur(10px)",
        scale: 1.1
      })

      // 2. The Collapse (Singularity)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline()

          // Eyebrow first
          tl.to(".contact-eyebrow", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
          })

          // The aggressive snap of the title
          tl.to(".contact-title", {
            opacity: 1,
            letterSpacing: "normal", // Back to tight spacing
            filter: "blur(0px)",
            scale: 1,
            duration: 1.5,
            ease: "expo.out" // Heavy, aggressive ease
          }, "-=0.5")

          // Subtitle and Email
          tl.to([".contact-sub", ".contact-email-wrapper"], {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
          }, "-=1.0")
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [lang])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Deep vignette radial / The Void */}
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-center"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.035) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl w-full">

        {/* Eyebrow */}
        <p className="contact-eyebrow font-mono text-[11px] tracking-[0.22em] uppercase text-white/20 mb-10">
          {t.eyebrow}
        </p>

        {/* Giant title — Event Horizon collapse */}
        <h2
          className="contact-title font-display font-bold leading-[1.04] whitespace-pre-line mb-4 origin-center"
          style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}
        >
          <span className="text-gradient inline-block pr-[0.1em]">{t.title}</span>
        </h2>

        {/* Sub */}
        <p className="contact-sub text-zinc-500 text-[15px] mb-20">
          {t.sub}
        </p>

        {/* Giant glowing email */}
        <div className="contact-email-wrapper flex flex-col items-center gap-6">
          <a
            href={`mailto:${t.email}`}
            id="contact-email-link"
            className="group relative font-display font-bold text-white/70 hover:text-white transition-all duration-300"
            style={{ fontSize: 'clamp(20px, 4vw, 52px)' }}
          >
            {/* Extremely aggressive glow behind text on hover */}
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-[40px] scale-150"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            />
            <span className="relative" style={{
              filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))',
              transition: 'filter 300ms ease, color 300ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.filter = 'drop-shadow(0 0 40px rgba(255,255,255,0.8)) drop-shadow(0 0 15px rgba(255,255,255,0.5))'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(255,255,255,0))'
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            }}
            >
              {t.email}
            </span>
          </a>
        </div>

      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }}
      />
    </section>
  )
}
