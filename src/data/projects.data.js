import heroImg from '../../assets/hero.png'

export const projects = [
  {
    id: 'nova-inventory',
    title: 'Nova Inventory',
    subtitle: 'Inventory + role management + billing automation',
    role: 'Full Stack Developer',
    stack: ['Laravel', 'Inertia.js', 'React', 'MySQL'],
    highlights: [
      'RBAC (Admin / Manager / Staff)',
      'Stock & purchase flow with audit trail',
      'Automated billing & invoice generation',
      'Realtime dashboards (KPIs)',
    ],
    screenshots: [heroImg, heroImg, heroImg],
  },
  {
    id: 'aether-mobile',
    title: 'Aether Mobile',
    subtitle: 'Cross‑platform app with secure auth & offline-first UX',
    role: 'Mobile Developer',
    stack: ['Flutter', 'Firebase'],
    highlights: [
      'Firebase Auth + Firestore rules',
      'Offline cache + smooth sync states',
      'Push notifications & deep links',
      'High-performance UI transitions',
    ],
    screenshots: [heroImg, heroImg],
  },
  {
    id: 'zen-admin',
    title: 'Zen Admin Suite',
    subtitle: 'Modern backoffice with analytics & workflow tooling',
    role: 'Frontend / UX Engineer',
    stack: ['React', 'Node.js', 'TailwindCSS'],
    highlights: [
      'Component-driven UI kit',
      'Advanced filtering & pagination',
      'Motion system with Framer Motion',
      'Accessibility-first interactions',
    ],
    screenshots: [heroImg, heroImg, heroImg],
  },
]

