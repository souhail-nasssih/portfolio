/**
 * Catalogue unique de projets (FR/EN) pour faciliter l’ajout.
 *
 * ✅ Pour ajouter un nouveau projet :
 * - Duplique un objet ci-dessous
 * - Donne un `id` unique (string, stable)
 * - Remplis `i18n.fr` et `i18n.en`
 * - Optionnel : `role`, `screenshots` (tableau d’URLs/chemins), `links`
 *
 * Exemple screenshots :
 * screenshots: ['/projects/mon-projet/1.png', '/projects/mon-projet/2.png'],
 *
 * Notes:
 * - `stack` est partagé (techno names)
 * - `highlights` doit rester une liste (bullet points)
 */

export const projectsCatalog = [
  {
    id: 'cooperatives-platform',
    stack: ['Laravel', 'React', 'Inertia.js', 'Flutter', 'MySQL'],
    role: 'Full Stack',
    screenshots: [],
    links: {},
    i18n: {
      fr: {
        title: 'Plateforme de Gestion des Coopératives',
        subtitle: 'Projet de soutenance Bachelor',
        description:
          "Système d'écosystème complet regroupant une application web de gestion avancée et une application mobile e-commerce dédiée aux coopératives.",
        highlights: [
          'Gestion de stock multi-magasins avec alertes intelligentes de rupture.',
          'Gestion des ventes, bons de livraison (BL) clients & fournisseurs.',
          'Gestion centralisée des commandes (Site e-commerce + Points de vente).',
          'Système avancé de rôles & permissions (Admin / Employés / Coopératives / Clients).',
          'Gestion RH : Présence, salaires (calcul au jour/mois) et affectation des tâches.',
          'Gestion des packs produits, fournisseurs, matériel, maintenance & facturation.',
          "Développement de l'application mobile Flutter permettant aux coopératives de vendre en ligne directement.",
        ],
      },
      en: {
        title: 'Cooperatives Management Platform',
        subtitle: 'Bachelor Capstone Project',
        description:
          'A complete ecosystem including a web app for advanced management and a mobile e-commerce app dedicated to cooperatives.',
        highlights: [
          'Multi-store inventory management with smart out-of-stock alerts.',
          'Sales management and delivery notes (DN) for customers & suppliers.',
          'Centralized order management (e-commerce website + points of sale).',
          'Advanced roles & permissions system (Admin / Employees / Cooperatives / Customers).',
          'HR management: attendance, payroll (day/month calculation) and task assignment.',
          'Product packs, suppliers, equipment, maintenance & billing management.',
          'Flutter mobile app enabling cooperatives to sell online directly.',
        ],
      },
    },
  },
  {
    id: 'integrated-commercial-app',
    stack: ['Laravel', 'React', 'MySQL'],
    role: 'Full Stack',
    screenshots: [],
    links: {},
    i18n: {
      fr: {
        title: 'Application Commerciale Intégrée',
        subtitle: "Système de Gestion d'Entreprise",
        description:
          'Solution ERP complète pour la gestion commerciale et le suivi de facturation en temps réel.',
        highlights: [
          'Gestion des bons de livraison (BL) clients et fournisseurs.',
          'Gestion automatisée des factures avec système de notifications (Factures à payer / Retards).',
          'Gestion des stocks en temps réel avec alertes prédictives pour produits presque épuisés.',
          'Tableau de bord (Dashboard) analytique détaillé pour le pilotage des ventes.',
        ],
      },
      en: {
        title: 'Integrated Commercial Application',
        subtitle: 'Enterprise Management System',
        description:
          'Full ERP solution for commercial operations and real-time billing tracking.',
        highlights: [
          'Customer and supplier delivery notes (DN) management.',
          'Automated invoice management with notifications (due invoices / late payments).',
          'Real-time stock management with predictive alerts for low inventory.',
          'Analytical dashboard for sales monitoring and decision-making.',
        ],
      },
    },
  },
  {
    id: 'dog-breeding-mobile-app',
    stack: ['Flutter', 'Firebase'],
    role: 'Mobile',
    screenshots: [],
    links: {},
    i18n: {
      fr: {
        title: "Application Mobile de Gestion d'Élevage Canin",
        subtitle: 'Solution Mobile Spécialisée',
        description:
          "Application mobile sur mesure dédiée au suivi technique, généalogique et commercial des élevages canins.",
        highlights: [
          "Gestion rigoureuse des chiens de travail et d'élevage.",
          'Suivi précis des couplages, de la reproduction et fiches d’élevage détaillées.',
          'Historique complet des ventes et espace utilisateur sécurisé de bout en bout.',
        ],
      },
      en: {
        title: 'Dog Breeding Management Mobile App',
        subtitle: 'Specialized Mobile Solution',
        description:
          'Custom mobile app dedicated to technical, genealogical and commercial tracking for dog breeding.',
        highlights: [
          'Strict management of working and breeding dogs.',
          'Accurate tracking of pairings, reproduction and detailed breeding records.',
          'Complete sales history and a secure end-to-end user space.',
        ],
      },
    },
  },
  {
    id: 'hardware-store-pos',
    stack: ['Laravel', 'React'],
    role: 'Full Stack',
    screenshots: [],
    links: {},
    i18n: {
      fr: {
        title: 'Application pour Boutique de Droguerie',
        subtitle: 'Gestion de Point de Vente',
        description:
          'Système de gestion de point de vente et de stock optimisé pour les commerces de détail.',
        highlights: [
          'Gestion des stocks et des flux de marchandises.',
          'Suivi des bons de livraison (BL) fournisseurs et clients.',
          'Gestion des rôles utilisateurs : Responsable / Vendeurs.',
          'Permissions avancées et notifications instantanées pour les produits en rupture.',
        ],
      },
      en: {
        title: 'Hardware Store (Droguerie) Management App',
        subtitle: 'Point of Sale Management',
        description:
          'Point of sale and inventory management system optimized for retail stores.',
        highlights: [
          'Stock and goods flow management.',
          'Supplier and customer delivery notes (DN) tracking.',
          'User roles management: Manager / Sellers.',
          'Advanced permissions and real-time notifications for out-of-stock products.',
        ],
      },
    },
  },
  
  
]

