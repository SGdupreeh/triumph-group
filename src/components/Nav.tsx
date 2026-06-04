import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

type Lang = 'en' | 'ru'

interface NavProps {
  lang: Lang
  onLangChange: (l: Lang) => void
}

const links = {
  en: [
    { label: 'About',    href: '#about' },
    { label: 'Units',    href: '#units' },
    { label: 'Contact',  href: '#contact' },
  ],
  ru: [
    { label: 'О нас',   href: '#about' },
    { label: 'Юниты',   href: '#units' },
    { label: 'Контакт', href: '#contact' },
  ],
}

export default function Nav({ lang, onLangChange }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <nav
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isScrolled ? '1rem 3rem' : '1.5rem 3rem',
          transition: 'all 300ms ease',
          background: isScrolled ? 'rgba(12,12,13,0.72)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(255,255,255,0.05)'
            : '1px solid transparent',
          boxShadow: isScrolled ? 'inset 0 -1px 1px rgba(255,255,255,0.04)' : 'none',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleAnchor(e, '#hero')}
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: '4px',
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            textDecoration: 'none',
            userSelect: 'none',
            transition: 'color 200ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
        >
          TRIUMPH
          <sub
            style={{
              fontStyle: 'normal',
              fontSize: '7px',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.22em',
              verticalAlign: 'sub',
              lineHeight: 1,
              opacity: 0.55,
              color: 'white',
            }}
          >
            GROUP
          </sub>
        </a>

        {/* Center links — desktop */}
        <ul className="desktop-nav" style={{ listStyle: 'none', gap: '2.25rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {links[lang].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleAnchor(e, l.href)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(113,113,122,0.8)',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(228,228,231,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(113,113,122,0.8)')}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Lang toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            {(['en', 'ru'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                style={{
                  padding: '4px 8px', borderRadius: '4px',
                  border: 'none', cursor: 'pointer',
                  background: lang === l ? 'rgba(255,255,255,0.05)' : 'transparent',
                  color: lang === l ? 'rgba(255,255,255,0.6)' : 'rgba(113,113,122,0.6)',
                  transition: 'all 150ms', textTransform: 'uppercase',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            whileTap={{ scale: 0.96 }}
            href="#contact"
            onClick={(e) => handleAnchor(e, '#contact')}
            className="desktop-cta btn-glow"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', borderRadius: '8px',
              border: isScrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.05)',
              fontSize: '12px', fontFamily: 'var(--font-mono)',
              color: isScrolled ? 'rgba(113,113,122,0.8)' : 'rgba(113,113,122,0.7)',
              textDecoration: 'none', transition: 'all 200ms',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(228,228,231,0.8)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(113,113,122,0.8)'
              ;(e.currentTarget as HTMLElement).style.borderColor = isScrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.05)'
              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
            }}
          >
            {lang === 'en' ? 'Discuss project' : 'Обсудить проект'}
            <span aria-hidden style={{ fontSize: '10px', opacity: 0.6 }}>→</span>
          </motion.a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-toggle"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(113,113,122,0.8)', padding: '4px' }}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="mobile-menu"
            style={{
              margin: '4px 16px 0', borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(12,12,13,0.92)', backdropFilter: 'blur(20px)',
              padding: '20px',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {links[lang].map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => handleAnchor(e, l.href)}
                    style={{ display: 'block', padding: '8px 0', fontSize: '14px', color: 'rgba(161,161,170,0.7)', textDecoration: 'none' }}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a href="#contact" onClick={(e) => handleAnchor(e, '#contact')}
                  style={{ display: 'block', padding: '8px 0', fontSize: '14px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                  {lang === 'en' ? 'Discuss project →' : 'Обсудить проект →'}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-toggle { display: block !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>
    </header>
  )
}
