export const LTV_CONFIG = {
  mieszkanie:      { min: 0.35, max: 0.55, label: "Mieszkanie",      icon: "Building2" },
  dom:             { min: 0.30, max: 0.50, label: "Dom",             icon: "Home" },
  dzialka_budowlana: { min: 0.25, max: 0.45, label: "Działka budowlana", icon: "MapPin" },
  grunt_rolny:     { min: 0.15, max: 0.35, label: "Grunt rolny",     icon: "Wheat" },
  lokal_uslugowy:  { min: 0.30, max: 0.50, label: "Lokal usługowy",  icon: "Store" },
} as const;

export type PropertyType = keyof typeof LTV_CONFIG;
