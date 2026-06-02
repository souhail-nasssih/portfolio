# Portfolio — SOUHAIL NASSIH

Portfolio **futuriste / cinématique** pour développeur **Full Stack Web & Mobile**, construit avec **React + Vite**, **TailwindCSS v4 (CSS-first)**, **Framer Motion**, **Lenis** (smooth scroll) et un background particules **tsparticles**.

## Stack

- **React + Vite**
- **TailwindCSS v4** (thème dans `src/index.css` via `@theme`)
- **Framer Motion** (animations / scroll / modals)
- **Lenis** (smooth scroll)
- **tsparticles** (`@tsparticles/react` + `@tsparticles/slim`)
- **react-parallax-tilt** (cartes projets 3D tilt)

## Installation

```bash
npm install
```

## Lancer en local

```bash
npm run dev
```

## Build production

```bash
npm run build
```

## Structure des données (éditer ici)

Tout est centralisé dans `src/data/` pour éviter de modifier les composants.

### Données CV (profil, expériences, diplômes, skills…)

- **Fichier** : `src/data/cv.catalog.js`
- **Format** : `cvCatalog.fr` et `cvCatalog.en`

Tu peux y modifier :
- `profile` (nom, titre, email, localisation, about…)
- `diplomas`
- `experiences`
- `skills`
- `softSkills`
- `languages`
- `interests`

### Ajouter / modifier un projet (FR/EN)

- **Fichier** : `src/data/projects.catalog.js`
- **Format** : `projectsCatalog[]`

Champs recommandés :
- `id` (unique)
- `stack` (technos)
- `role` (optionnel)
- `screenshots` (optionnel)
- `links` (optionnel)
- `i18n.fr` / `i18n.en` :
  - `title`
  - `subtitle`
  - `description`
  - `highlights[]`

### Texte UI (labels, boutons, titres…)

- **UI globale** : `src/data/ui.copy.js`
- **UI section Projets + Modal** : `src/data/projects.copy.js`

## i18n (FR/EN)

- Provider : `src/i18n/I18nProvider.jsx`
- Toggle : `src/components/ui/LanguageToggle.jsx`
- Persistance : `localStorage` via la clé `portfolio.lang`

## Entrée principale

- App : `src/App.jsx`
- Assemblage données FR/EN : `src/data/portfolioData.i18n.js`

## Assets

- Photo de profil : `src/assets/ChatGPT Image 12 mai 2026, 17_56_06.png`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# portfolio
