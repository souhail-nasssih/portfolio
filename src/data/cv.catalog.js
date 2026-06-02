/**
 * Catalogue CV (FR/EN) : profil, diplômes, expériences, skills, soft skills, langues, intérêts.
 * Objectif : modifier toutes les données du portfolio au même endroit, sans toucher aux composants.
 *
 * Les projets sont gérés à part dans `src/data/projects.catalog.js`.
 */

export const cvCatalog = {
  fr: {
    profile: {
      name: 'SOUHAIL NASSIH',
      title: 'DÉVELOPPEUR FULL STACK WEB & MOBILE',
      phone: '0618843035',
      email: 'Souhailnassih2@gmail.com',
      location: 'Maroc, Casablanca 20230',
      about:
        "Développeur Full Stack Web & Mobile passionné, doté d'une solide expérience dans la création d'applications complètes avec Laravel, React, Flutter et Firebase. J'ai réalisé plusieurs systèmes professionnels : gestion de stock, facturation, rôles et permissions, gestion des employés, ventes, tâches, maintenance, e-commerce, etc. Titulaire d'un Bachelor en Ingénierie des Applications Web & Mobile, je suis motivé à rejoindre une entreprise pour contribuer à des projets innovants et mettre en pratique mes compétences techniques.",
    },

    diplomas: [
      {
        date: '2024-2025',
        title: 'Bachelor Ingénierie Applications Web & Mobile',
        institution: 'OMNIA School of Business and Technology',
        location: 'Casablanca',
      },
      {
        date: '2022-2024',
        title: 'Technicien Spécialisé en Développement Informatique',
        institution: 'OMNIA School of Business and Technology',
        location: 'Casablanca',
      },
      {
        date: '2018-2019',
        title: 'Baccalauréat Sciences Physiques',
        institution: 'Lycée Ibrahim Roudani',
        location: 'Casablanca',
      },
    ],

    experiences: [
      {
        date: '2024-2025',
        company: 'Euro Centre Dafaire Eury',
        location: 'Casablanca',
        duration: '6 mois',
        role: 'Stage Full Stack',
        description:
          "Développement d'une application interne complète pour l'automatisation des processus de l'entreprise.",
        tasks: [
          'Gestion complète des employés et suivi de présence.',
          'Calcul et automatisation de la gestion des salaires.',
          'Module de gestion des tâches, clients et planification des rendez-vous.',
          'Conception d’un tableau de bord (Dashboard) interactif pour le suivi des performances.',
        ],
      },
      {
        date: '2023',
        company: 'Digigraft',
        location: 'Casablanca',
        duration: '1 mois',
        role: 'Stage Full Stack',
        description: "Conception et implémentation d'une solution de gestion logistique.",
        tasks: [
          "Développement d'une application robuste de gestion de stock en utilisant Node.js.",
        ],
      },
    ],

    skills: {
      frontend: ['React.js', 'Inertia.js', 'Bootstrap', 'TailwindCSS'],
      backend: ['Laravel', 'Node.js'],
      mobile: ['Flutter'],
      database: ['MySQL', 'Firebase', 'SqlServer'],
      tools: ['Git', 'GitHub', 'Postman', 'Figma'],
    },

    softSkills: [
      'Travail en équipe',
      'Adaptabilité',
      'Sens de responsabilité',
      'Communication efficace',
      'Résolution de problèmes',
    ],

    languages: [
      { lang: 'Arabe', level: 'Maternelle' },
      { lang: 'Français', level: 'Courant' },
      { lang: 'Anglais', level: 'Intermédiaire' },
    ],

    interests: ['Nouvelles technologies', 'Natation', 'Football', 'Équitation'],
  },

  en: {
    profile: {
      name: 'SOUHAIL NASSIH',
      title: 'FULL STACK WEB & MOBILE DEVELOPER',
      phone: '0618843035',
      email: 'Souhailnassih2@gmail.com',
      location: 'Morocco, Casablanca 20230',
      about:
        "Passionate Full Stack Web & Mobile Developer with solid experience building end-to-end applications with Laravel, React, Flutter and Firebase. I have delivered multiple professional systems: inventory/stock management, billing, roles & permissions, employee management, sales, tasks, maintenance, e-commerce, and more. Holder of a Bachelor's degree in Web & Mobile Applications Engineering, I’m motivated to join a company to contribute to innovative projects and apply my technical skills.",
    },

    diplomas: [
      {
        date: '2024-2025',
        title: "Bachelor — Web & Mobile Applications Engineering",
        institution: 'OMNIA School of Business and Technology',
        location: 'Casablanca',
      },
      {
        date: '2022-2024',
        title: 'Specialized Technician — Software Development',
        institution: 'OMNIA School of Business and Technology',
        location: 'Casablanca',
      },
      {
        date: '2018-2019',
        title: 'High School Diploma — Physical Sciences',
        institution: 'Lycée Ibrahim Roudani',
        location: 'Casablanca',
      },
    ],

    experiences: [
      {
        date: '2024-2025',
        company: 'Euro Centre Dafaire Eury',
        location: 'Casablanca',
        duration: '6 months',
        role: 'Full Stack Internship',
        description:
          "Development of a complete internal application to automate the company's processes.",
        tasks: [
          'Full employee management and attendance tracking.',
          'Payroll calculation and automation.',
          'Task management module, customer management and appointment scheduling.',
          'Design of an interactive dashboard to monitor performance.',
        ],
      },
      {
        date: '2023',
        company: 'Digigraft',
        location: 'Casablanca',
        duration: '1 month',
        role: 'Full Stack Internship',
        description: 'Design and implementation of a logistics management solution.',
        tasks: ['Built a robust stock management application using Node.js.'],
      },
    ],

    // Tech names can stay identical across languages
    skills: {
      frontend: ['React.js', 'Inertia.js', 'Bootstrap', 'TailwindCSS'],
      backend: ['Laravel', 'Node.js'],
      mobile: ['Flutter'],
      database: ['MySQL', 'Firebase', 'SqlServer'],
      tools: ['Git', 'GitHub', 'Postman', 'Figma'],
    },

    softSkills: [
      'Teamwork',
      'Adaptability',
      'Sense of responsibility',
      'Effective communication',
      'Problem solving',
    ],

    languages: [
      { lang: 'Arabic', level: 'Native' },
      { lang: 'French', level: 'Fluent' },
      { lang: 'English', level: 'Intermediate' },
    ],

    interests: ['New technologies', 'Swimming', 'Football', 'Horse riding'],
  },
}

