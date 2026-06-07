import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Flywheel from './components/Flywheel'
import About from './components/About'
import BentoGrid from './components/BentoGrid'
import Engine from './components/Engine'
import Founder from './components/Founder'
import AntiFAQ from './components/AntiFAQ'
import Contact from './components/Contact'
import { useLenis } from './hooks/useLenis'
import { motion, useScroll, useSpring } from 'framer-motion'

type Lang = 'en' | 'ru'

export default function App() {
  // Smooth scroll — Lenis RAF loop
  useLenis()

  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('tg-lang') as Lang | null
    if (saved === 'en' || saved === 'ru') return saved
    return navigator.language.startsWith('ru') ? 'ru' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('tg-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const year = new Date().getFullYear()

  // Scroll progress
  // Scroll progress for global bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })


  return (
    <div className="min-h-screen bg-[#0c0c0d] text-white selection:bg-white/10 relative">

      {/* Global Scroll Progress */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(255,255,255,0.4)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 9999,
        }}
      />

      <Nav lang={lang} onLangChange={setLang} />

      <main className="relative z-10 bg-[#0c0c0d]">
        <Hero lang={lang} />
        
        {/* Subsequent content */}
        <div className="relative z-20 bg-[#0c0c0d]">
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 95%)' }} />
        <Manifesto lang={lang} />
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 95%)' }} />
        <Flywheel  lang={lang} />
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 95%)' }} />
        <About     lang={lang} />
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 95%)' }} />
        <BentoGrid lang={lang} />
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 95%)' }} />
        <Engine    lang={lang} />
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 95%)' }} />
        <Founder   lang={lang} />
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 95%)' }} />
        <AntiFAQ   lang={lang} />
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 95%)' }} />
        <Contact   lang={lang} />
        </div>
      </main>

      <footer className="border-t border-white/[0.05] px-6 lg:px-12 py-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/20 font-mono">
        <span className="tracking-widest uppercase text-white/30 font-display font-bold text-[14px]">TRIUMPH</span>
        <span>© {year} Triumph Group. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#about"    className="hover:text-white/40 transition-colors">{lang === 'en' ? 'About'   : 'О нас'}</a>
          <a href="#flywheel" className="hover:text-white/40 transition-colors">{lang === 'en' ? 'Units'   : 'Юниты'}</a>
          <a href="#contact"  className="hover:text-white/40 transition-colors">{lang === 'en' ? 'Contact' : 'Контакт'}</a>
        </div>
      </footer>

    </div>
  )
}
