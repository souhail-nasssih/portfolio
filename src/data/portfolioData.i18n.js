import { cvCatalog } from './cv.catalog.js'
import { projectsCatalog } from './projects.catalog.js'

function buildProjects(lang) {
  const safeLang = lang === 'en' ? 'en' : 'fr'
  return projectsCatalog.map((p) => ({
    id: p.id,
    stack: p.stack ?? [],
    role: p.role,
    screenshots: p.screenshots ?? [],
    links: p.links ?? {},
    ...(p.i18n?.[safeLang] ?? p.i18n?.fr ?? {}),
  }))
}

export const portfolioDataByLang = {
  fr: {
    ...cvCatalog.fr,
    projects: buildProjects('fr'),
  },
  en: {
    ...cvCatalog.en,
    projects: buildProjects('en'),
  },
}

