import type { SEOProps } from '@components/common/SEO';

export const getAuthSEO = (userType: 'admin' | 'user', authMode: 'login' | 'register'): SEOProps => {
  const titles = {
    user: {
      login: 'Accede para ordenar',
      register: 'Regístrate para ordenar',
    },
    admin: {
      login: 'Acceso Administrativo',
      register: 'Acceso Administrativo',
    },
  };

  const descriptions = {
    user: 'Necesitas una cuenta para realizar pedidos',
    admin: 'Panel de administración de EGO HOUSE',
  };

  return {
    title: `${titles[userType][authMode]} - EGO HOUSE Madrid`,
    description: `${descriptions[userType]}. Inicia sesión o regístrate en EGO HOUSE Madrid.`,
    keywords: 'login ego house, registro madrid, acceso usuario, desayunos madrid, admin ego house',
    url: 'https://www.egohousebynavs.com/auth',
    image: 'https://www.egohousebynavs.com/hookas.jpg',
  };
};
