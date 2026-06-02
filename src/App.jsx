
import { Suspense, lazy } from 'react'
import ScrollProvider from './components/effects/ScrollProvider.jsx'
import ScrollProgress from './components/effects/ScrollProgress.jsx'
import ScrollReveal from './components/effects/ScrollReveal.jsx'
import ScrollNav from './components/effects/ScrollNav.jsx'
import ScrollToTop from './components/effects/ScrollToTop.jsx'
import SectionDivider from './components/effects/SectionDivider.jsx'
import Hero from './components/hero/Hero.jsx'
import Skills from './components/skills/Skills.jsx'
import Projects from './components/projects/Projects.jsx'
import LanguageToggle from './components/ui/LanguageToggle.jsx'
import { portfolioDataByLang } from './data/portfolioData.i18n.js'
import Timeline from './components/timeline/Timeline.jsx'
import I18nProvider from './i18n/I18nProvider.jsx'
import { useI18n } from './i18n/context.js'
import profileImg from './assets/ChatGPT Image 12 mai 2026, 17_56_06.png'

const ParticlesBackground = lazy(
  () => import('./components/effects/ParticlesBackground.jsx'),
)

function AppShell() {
  const { lang } = useI18n()
  const data = portfolioDataByLang[lang] ?? portfolioDataByLang.fr

  return (
    <ScrollProvider>
      <div className="min-h-svh bg-bg text-text">
        <Suspense fallback={null}>
          <ParticlesBackground />
        </Suspense>
        <ScrollProgress />
        <ScrollNav />
        <ScrollToTop />
        <LanguageToggle />

        <main>
          <Hero profile={data.profile} profileImage={profileImg} />

          <SectionDivider />

          <ScrollReveal variant="up" delay={0.05}>
            <Skills
              skills={data.skills}
              softSkills={data.softSkills}
              languages={data.languages}
              interests={data.interests}
            />
          </ScrollReveal>

          <SectionDivider />

          <ScrollReveal variant="left" delay={0.08}>
            <Timeline diplomas={data.diplomas} experiences={data.experiences} />
          </ScrollReveal>

          <SectionDivider />

          <ScrollReveal variant="right" delay={0.1}>
            <Projects projects={data.projects} />
          </ScrollReveal>
        </main>
      </div>
    </ScrollProvider>
  )
}

function App() {
  return (
    <I18nProvider>
      <AppShell />
    </I18nProvider>
  )
}

export default App
