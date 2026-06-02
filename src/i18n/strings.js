import { projectsCopy } from '../data/projects.copy.js'
import { uiCopy } from '../data/ui.copy.js'

export const strings = {
  fr: { ...uiCopy.fr, projects: projectsCopy.fr },
  en: { ...uiCopy.en, projects: projectsCopy.en },
}

