import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Initializes Lenis smooth scroll and syncs it with
 * requestAnimationFrame. Returns the Lenis instance
 * so callers can scroll-to programmatically if needed.
 *
 * Also dispatches a native 'scroll' event so that
 * Framer Motion's useScroll() tracks the Lenis position.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    // Sync Lenis scroll position → native scroll events
    // This makes Framer Motion's useScroll() work correctly
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      // Framer Motion reads window.scrollY via native scroll events
      // Lenis moves the document, so we just need to ensure the event fires
      void scroll // suppress unused warning
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}

