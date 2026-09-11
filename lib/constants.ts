export const SITE = {
  name: "Nera Innovations",
  url: "https://nerainnovations.com",
  email: "info@nerasocial.com",
  phone: "+90 544 112 8625",
  phoneHref: "+905441128625",
  whatsapp: "https://wa.me/905441128625",
  slogan: "Systems That Turn Marketing Into Sales",
  footerSlogan: "Real Brands. Real Growth.",
  socialUrl: "https://nerasocial.com",
  locations: [
    { city: "Izmir", country: "Turkey" },
    { city: "Tallinn", country: "Estonia" },
  ],
  legalName: "2017 Nera Reklam Pazarlama Yazılım Teknoloji Limited Şirketi",
  socials: {
    linkedin: "https://www.linkedin.com/company/nerasocial",
    instagram: "https://www.instagram.com/nerasocial",
    youtube: "https://www.youtube.com/@nerasocial",
    x: "https://x.com/nerasocial",
  },
  policies: {
    privacy: "https://www.nerasocial.com/en/privacy-policy",
    terms: "https://www.nerasocial.com/en/terms-of-use",
    cookies: "https://www.nerasocial.com/en/cookies",
  },
} as const;

export const NAV = [
  { label: "Systems", href: "/#systems" },
  { label: "Projects", href: "/#projects" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
] as const;
