// Centralna konfiguracja zdjęć – Unsplash placeholders, docelowo własne zdjęcia
export const IMAGES = {
  hero: {
    main: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80',
    overlay: 'linear-gradient(135deg, rgba(28,67,94,0.92) 0%, rgba(15,42,61,0.85) 100%)',
  },
  sections: {
    trust: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&q=80',
    process: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6e?w=800&q=80',
    about: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    contact: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80',
  },
  offers: {
    hipoteczny: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    mieszkanie: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    nieruchomosc: 'https://images.unsplash.com/photo-1582407947092-87031b04567e?w=600&q=80',
    dom: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    dzialka: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    oddluzeniowe: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
  },
  blog: {
    default: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
  },
  testimonials: {
    avatar1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    avatar2: 'https://images.unsplash.com/photo-1494790108755-2616b8e7d5a6?w=100&q=80',
    avatar3: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
} as const;
