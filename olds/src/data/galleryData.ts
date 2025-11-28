export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  category:
    | 'ambiente'
    | 'cachimbas'
    | 'gastronomia'
    | 'eventos'
    | 'instalaciones';
  featured: boolean;
  uploadDate: string;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  endTime?: string;
  image: string;
  gallery?: string[];
  category: 'musica' | 'gastronomia' | 'especial' | 'tematico' | 'privado';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  price?: number;
  capacity?: number;
  currentAttendees?: number;
  featured: boolean;
  tags: string[];
  location: string;
  organizer: string;
  contact?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  requirements?: string[];
  createdAt: string;
}

// Datos de ejemplo para la galería
export const mockGalleryItems: MediaItem[] = [
  {
    id: 'img1',
    type: 'image',
    url: '/gallery/ambiente-1.jpg',
    title: 'Ambiente Nocturno',
    description: 'La atmósfera única de EGO HOUSE por la noche',
    category: 'ambiente',
    featured: true,
    uploadDate: '2025-08-15',
    tags: ['ambiente', 'noche', 'iluminacion'],
  },
  {
    id: 'img2',
    type: 'image',
    url: '/gallery/cachimba-premium.jpg',
    title: 'Cachimbas Premium',
    description: 'Nuestra selección de cachimbas de alta calidad',
    category: 'cachimbas',
    featured: true,
    uploadDate: '2025-08-14',
    tags: ['cachimba', 'premium', 'sabores'],
  },
  {
    id: 'vid1',
    type: 'video',
    url: '/gallery/ambiente-video.mp4',
    thumbnail: '/gallery/ambiente-video-thumb.jpg',
    title: 'Tour Virtual EGO HOUSE',
    description: 'Recorrido completo por nuestras instalaciones',
    category: 'instalaciones',
    featured: true,
    uploadDate: '2025-08-13',
    tags: ['tour', 'instalaciones', 'virtual'],
  },
  {
    id: 'img3',
    type: 'image',
    url: '/gallery/comida-1.jpg',
    title: 'Gastronomía Exquisita',
    description: 'Platos únicos preparados por nuestro chef',
    category: 'gastronomia',
    featured: false,
    uploadDate: '2025-08-12',
    tags: ['comida', 'chef', 'gourmet'],
  },
  {
    id: 'img4',
    type: 'image',
    url: '/gallery/evento-1.jpg',
    title: 'Noche de Jazz',
    description: 'Evento especial con música en vivo',
    category: 'eventos',
    featured: false,
    uploadDate: '2025-08-11',
    tags: ['jazz', 'musica', 'evento'],
  },
  {
    id: 'img5',
    type: 'image',
    url: '/gallery/terraza-1.jpg',
    title: 'Terraza VIP',
    description: 'Zona exclusiva al aire libre',
    category: 'instalaciones',
    featured: true,
    uploadDate: '2025-08-10',
    tags: ['terraza', 'vip', 'exterior'],
  },
  {
    id: 'vid2',
    type: 'video',
    url: '/gallery/preparacion-cachimba.mp4',
    thumbnail: '/gallery/preparacion-thumb.jpg',
    title: 'Arte de la Cachimba',
    description: 'Proceso de preparación de una cachimba perfecta',
    category: 'cachimbas',
    featured: false,
    uploadDate: '2025-08-09',
    tags: ['preparacion', 'arte', 'tecnica'],
  },
  {
    id: 'img6',
    type: 'image',
    url: '/gallery/barra-1.jpg',
    title: 'Barra Premium',
    description: 'Nuestra selección de bebidas exclusivas',
    category: 'gastronomia',
    featured: false,
    uploadDate: '2025-08-08',
    tags: ['barra', 'bebidas', 'premium'],
  },
];

// Datos de ejemplo para eventos
export const mockEvents: Event[] = [
  {
    id: 'evt1',
    title: 'Noche de Jazz & Cachimbas',
    slug: 'noche-jazz-cachimbas',
    description:
      'Una velada especial con música jazz en vivo y nuestras mejores cachimbas.',
    fullDescription:
      'Únete a nosotros para una noche inolvidable donde el jazz se encuentra con la tradición de la cachimba. Contaremos con la actuación del reconocido trío "Madrid Jazz Collective" mientras disfrutas de nuestras cachimbas premium con sabores exclusivos de la noche. El evento incluye cóctel de bienvenida y degustación de aperitivos gourmet.',
    date: '2025-08-25',
    time: '21:00',
    endTime: '02:00',
    image: '/events/jazz-night.jpg',
    gallery: ['/events/jazz-1.jpg', '/events/jazz-2.jpg', '/events/jazz-3.jpg'],
    category: 'musica',
    status: 'upcoming',
    price: 25,
    capacity: 60,
    currentAttendees: 34,
    featured: true,
    tags: ['jazz', 'musica en vivo', 'cachimbas premium'],
    location: 'Zona Principal + Terraza VIP',
    organizer: 'EGO HOUSE',
    contact: {
      phone: '+34 123 456 789',
      email: 'eventos@egohousebynavs.com',
      whatsapp: '34123456789',
    },
    requirements: [
      'Reserva previa obligatoria',
      'Entrada solo para mayores de 18 años',
    ],
    createdAt: '2025-08-01',
  },
  {
    id: 'evt2',
    title: 'Cata de Sabores Exclusivos',
    slug: 'cata-sabores-exclusivos',
    description:
      'Descubre nuevos sabores en una experiencia gastronómica única.',
    fullDescription:
      'Una experiencia sensorial completa donde podrás degustar sabores únicos de cachimba paired con una selección especial de tapas y cócteles. Nuestro sommelier de cachimbas te guiará a través de diferentes mezclas y técnicas de preparación, mientras nuestro chef presenta maridajes perfectos para cada sabor.',
    date: '2025-08-30',
    time: '19:30',
    endTime: '23:00',
    image: '/events/cata-sabores.jpg',
    category: 'gastronomia',
    status: 'upcoming',
    price: 35,
    capacity: 25,
    currentAttendees: 18,
    featured: true,
    tags: ['cata', 'sabores', 'maridaje', 'gastronomia'],
    location: 'Zona VIP',
    organizer: 'Chef Miguel & Equipo EGO',
    contact: {
      phone: '+34 123 456 789',
      email: 'gastronomia@egohousebynavs.com',
      whatsapp: '34123456789',
    },
    requirements: [
      'Reserva obligatoria',
      'Experiencia incluye 3 sabores + maridajes',
    ],
    createdAt: '2025-08-02',
  },
  {
    id: 'evt3',
    title: 'Fiesta de Verano',
    slug: 'fiesta-verano-2025',
    description:
      'La mejor fiesta del verano con DJ, cachimbas y diversión garantizada.',
    fullDescription:
      'Celebra el verano con nosotros en la fiesta más esperada del año. DJ internacional, barra libre premium, cachimbas con sabores tropicales especiales y mucho más. La terraza estará completamente ambientada con decoración tropical y luces especiales. ¡No te pierdas la noche más épica del verano!',
    date: '2025-09-15',
    time: '22:00',
    endTime: '04:00',
    image: '/events/fiesta-verano.jpg',
    category: 'especial',
    status: 'upcoming',
    price: 20,
    capacity: 150,
    currentAttendees: 67,
    featured: true,
    tags: ['fiesta', 'verano', 'dj', 'terraza'],
    location: 'Todo el local + Terraza',
    organizer: 'EGO HOUSE Events',
    contact: {
      phone: '+34 123 456 789',
      email: 'fiestas@egohousebynavs.com',
      whatsapp: '34123456789',
    },
    requirements: [
      'Entrada anticipada disponible',
      '+21 años',
      'Dress code: Summer vibes',
    ],
    createdAt: '2025-07-15',
  },
  {
    id: 'evt4',
    title: 'Masterclass de Cachimba',
    slug: 'masterclass-cachimba',
    description:
      'Aprende las técnicas profesionales de preparación de cachimbas.',
    fullDescription:
      'Una masterclass exclusiva impartida por nuestro experto en cachimbas. Aprenderás desde la historia y tradición hasta las técnicas más avanzadas de preparación, mezcla de sabores y mantenimiento. Incluye materiales, práctica guiada y certificado de participación.',
    date: '2025-09-05',
    time: '17:00',
    endTime: '20:00',
    image: '/events/masterclass.jpg',
    category: 'especial',
    status: 'upcoming',
    price: 40,
    capacity: 15,
    currentAttendees: 8,
    featured: false,
    tags: ['masterclass', 'aprendizaje', 'tecnicas', 'certificado'],
    location: 'Aula privada EGO HOUSE',
    organizer: 'Master Ahmed - Experto Internacional',
    contact: {
      phone: '+34 123 456 789',
      email: 'masterclass@egohousebynavs.com',
      whatsapp: '34123456789',
    },
    requirements: [
      'Material incluido',
      'Certificado oficial',
      'Nivel: Principiante a avanzado',
    ],
    createdAt: '2025-08-05',
  },
  {
    id: 'evt5',
    title: 'Noche de Karaoke',
    slug: 'noche-karaoke-agosto',
    description: 'Demuestra tu talento en nuestra noche de karaoke.',
    fullDescription:
      'Una noche divertida y relajada donde podrás cantar tus canciones favoritas mientras disfrutas de cachimbas y bebidas. Tenemos un sistema de sonido profesional y una amplia biblioteca de canciones en español, inglés y otros idiomas. Premios para las mejores actuaciones de la noche.',
    date: '2025-08-28',
    time: '20:00',
    endTime: '01:00',
    image: '/events/karaoke.jpg',
    category: 'musica',
    status: 'upcoming',
    price: 15,
    capacity: 80,
    currentAttendees: 23,
    featured: false,
    tags: ['karaoke', 'musica', 'diversion', 'premios'],
    location: 'Zona Principal',
    organizer: 'EGO HOUSE Entertainment',
    contact: {
      phone: '+34 123 456 789',
      email: 'entretenimiento@egohousebynavs.com',
      whatsapp: '34123456789',
    },
    requirements: [
      'Inscripción en el local',
      'Premios especiales',
      'Todas las edades bienvenidas',
    ],
    createdAt: '2025-08-10',
  },
];

export const getEventsByStatus = (status: Event['status']) => {
  return mockEvents.filter((event) => event.status === status);
};

export const getFeaturedEvents = () => {
  return mockEvents.filter((event) => event.featured);
};

export const getEventsByCategory = (category: Event['category']) => {
  return mockEvents.filter((event) => event.category === category);
};

export const getMediaByCategory = (category: MediaItem['category']) => {
  return mockGalleryItems.filter((item) => item.category === category);
};

export const getFeaturedMedia = () => {
  return mockGalleryItems.filter((item) => item.featured);
};
