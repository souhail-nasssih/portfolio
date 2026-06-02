import { motion } from 'framer-motion'
import { useI18n } from '../../i18n/context.js'

export default function LanguageToggle() {
  const { lang, setLang } = useI18n()

  return (
    <div className="fixed right-4 top-4 z-120">
      <div className="relative inline-flex items-center gap-1 rounded-full border border-white/10 bg-bg/70 p-1 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <button
          type="button"
          onClick={() => setLang('fr')}
          aria-pressed={lang === 'fr'}
          className={[
            'relative z-10 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.22em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60',
            lang === 'fr' ? 'text-text' : 'text-muted hover:text-text/90',
          ].join(' ')}
        >
          FR
        </button>
        <button
          type="button"
          onClick={() => setLang('en')}
          aria-pressed={lang === 'en'}
          className={[
            'relative z-10 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.22em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60',
            lang === 'en' ? 'text-text' : 'text-muted hover:text-text/90',
          ].join(' ')}
        >
          EN
        </button>

        <motion.span
          aria-hidden
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          className={[
            'absolute top-1 bottom-1 w-[44px] rounded-full border bg-white/5 shadow-glowCyan',
            lang === 'fr' ? 'left-1 border-cyan/25' : 'left-[calc(0.25rem+44px)] border-purple/25 shadow-glowPurple',
          ].join(' ')}
        />
      </div>
    </div>
  )
}

