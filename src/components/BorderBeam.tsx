import { motion } from 'framer-motion'

interface BorderBeamProps {
  /** How long one full rotation takes in seconds */
  duration?: number
  /** Peak brightness of the beam */
  color?: string
  /** Arc width in degrees */
  arc?: number
}

/**
 * A glowing beam that travels around the border of its
 * parent element on hover. Parent must have:
 *   - `relative overflow-hidden` (or similar)
 *   - `group` class (so group-hover triggers the beam)
 */
export function BorderBeam({
  duration = 2.6,
  color = 'rgba(255,255,255,0.65)',
  arc = 55,
}: BorderBeamProps) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit]
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        /* 1px border ring via mask */
        padding: '1px',
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        overflow: 'hidden',
      }}
    >
      {/* 200% square centered so it covers corners during rotation */}
      <motion.span
        aria-hidden
        className="absolute block"
        style={{
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: [
            'conic-gradient(from 0deg,',
            `  transparent 0deg,`,
            `  ${color.replace(')', ', 0.15)').replace('rgba', 'rgba')} ${arc * 0.2}deg,`,
            `  ${color} ${arc * 0.5}deg,`,
            `  ${color.replace(')', ', 0.15)').replace('rgba', 'rgba')} ${arc}deg,`,
            `  transparent ${arc + 8}deg`,
            ')',
          ].join(' '),
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
    </span>
  )
}
