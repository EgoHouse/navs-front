export const HERO_CONTENT = {
  title: 'EGO HOUSE',
  subtitle: 'Experiencia sensorial única',
  cta: {
    primary: {
      text: 'Crear experiencia',
      ariaLabel: 'Crear experiencia personalizada de cachimba en EGO HOUSE',
    },
    secondary: {
      text: 'Reservar mesa',
      ariaLabel: 'Reservar mesa en EGO HOUSE Madrid por WhatsApp',
      message: '¡Hola! Me gustaría reservar una mesa en EGO HOUSE Madrid. ¿Podrían ayudarme con la disponibilidad y horarios?',
    },
  },
} as const;

export const VIDEO_CONFIG = {
  url: 'https://res.cloudinary.com/dm70hhhnm/video/upload/f_auto,q_auto/Portada_1080_editada_bflw9o.mp4',
  poster: 'https://res.cloudinary.com/dm70hhhnm/image/upload/f_auto,q_auto/Portada_1080_editada_bflw9o.jpg',
  mobileImage: 'https://res.cloudinary.com/dm70hhhnm/image/upload/v1764339989/HomeMobile_kqrytt.png',
  ariaLabel: 'Video de ambiente de EGO HOUSE Madrid',
} as const;

export const MENU_SECTION = {
  title: 'Nuestra Carta',
  subtitle: 'Descubre una experiencia gastronómica única',
} as const;

export const WHATSAPP_CONFIG = {
  phoneNumber: '34646149112',
  defaultMessage: '¡Hola! Me interesa conocer más sobre EGO HOUSE Madrid. ¿Podrían darme información sobre reservas y experiencias disponibles?',
} as const;

export const SHISHA_GALLERY = {
  label: 'Galería',
  title: 'Momentos',
  subtitle: 'Únicos',
  description: 'Descubre la esencia de nuestras cachimbas artesanales y los momentos especiales que se viven en EGO HOUSE.',
  ctaText: 'Explorar Galería',
  ctaLink: '/galeria-cachimbas',
  backgroundImage: 'https://res.cloudinary.com/dm70hhhnm/image/upload/v1761478223/PAB01090_fnbn5o.jpg',
  images: [
    {
      url: 'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046984_fvuzw1.jpg',
      alt: 'Cachimba premium artesanal EGO HOUSE Madrid - Experiencia sensorial única',
      title: 'Premium Selection',
      description: 'Cachimbas artesanales seleccionadas especialmente para una experiencia sensorial única en EGO HOUSE Madrid',
    },
    {
      url: 'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046880_xvuv7k.jpg',
      alt: 'Ambiente exclusivo cachimba Madrid EGO HOUSE - Momentos únicos compartidos',
      title: 'Ambiente Exclusivo',
      description: 'Un espacio diseñado para crear momentos inolvidables en cada sesión compartida en Madrid',
    },
    {
      url: 'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046973_igjg8n.jpg',
      alt: 'Sabores artesanales cachimba Madrid EGO HOUSE - Mezclas premium exclusivas',
      title: 'Sabores Artesanales',
      description: 'Mezclas únicas creadas por nuestros expertos para deleitar tus sentidos',
    },
  ],
} as const;

export const COCKTAIL_SECTION = {
  label: 'Mixología de Autor',
  title: {
    line1: 'Un Cocktail para',
    line2: 'alimentar tu ego',
  },
  subtitle: 'Cada persona tiene su cocktail perfecto. Nosotros lo creamos para ti.',
  backgroundImage: 'https://res.cloudinary.com/dm70hhhnm/image/upload/v1764340727/fondoCocktail_n4ovj5.jpg',
  backgroundAlt: 'Cocktails premium EGO HOUSE Madrid',
  features: [
    {
      title: 'Ingredientes Premium',
      description: 'Solo los mejores destilados y productos frescos',
    },
    {
      title: 'Técnica Artesanal',
      description: 'Métodos clásicos con toques contemporáneos',
    },
    {
      title: 'Experiencia Única',
      description: 'Personalizado según tus preferencias y momento',
    },
  ],
} as const;

export const LOCATION_INFO = {
  title: 'Encuéntranos',
  subtitle: 'Visítanos y descubre la experiencia',
  address: 'Calle de Manuel Pombo Angulo 10',
  city: 'Madrid, España',
  phone: '+34 646 149 112',
  hours: {
    weekdays: '10:00am - 01:00am',
    weekends: '12:00am - 02:00am',
  },
  coordinates: {
    lat: 40.506095,
    lng: -3.656349,
  },
  directionsUrl:
    'https://www.google.com/maps/place/Ego+House+Madrid/@40.5061218,-3.6563866,18z/data=!4m14!1m7!3m6!1s0xd422d1b9f1d1a23:0xf168412a4ec7fd2!2sEgo+House+Madrid!8m2!3d40.5060423!4d-3.6563973!16s%2Fg%2F11kq7wktnj!3m5!1s0xd422d1b9f1d1a23:0xf168412a4ec7fd2!8m2!3d40.5060423!4d-3.6563973!16s%2Fg%2F11kq7wktnj?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D',
} as const;
