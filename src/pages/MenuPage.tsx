import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Coffee,
  Utensils,
  Wine,
  UtensilsCrossed,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryBySlug } from '../hooks/useCatalog';
import type { MenuSubcategory, MenuItem } from '../types';
import SEOHead from '../components/SEOHead';

const categoryIcons = {
  bebidas: Wine,
  desayunos: Coffee,
  meriendas: UtensilsCrossed,
  cocktails: Wine,
} as const;

const formatPrice = (price: number, currency: string = '€'): string => {
  return `${price.toFixed(2).replace('.00', '')}${currency}`;
};

// Configuración estática del menú
const MENU_CONFIG = {
  version: '1.0.1',
  currency: '€',
};

const MenuItemComponent: React.FC<{ item: MenuItem; currency: string }> = ({
  item,
  currency,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300"
  >
    <div className="flex items-start space-x-4">
      {/* Imagen placeholder */}
      <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
        <div className="w-8 h-8 bg-gray-500 rounded opacity-50" />
      </div>

      {/* Contenido */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-white font-medium text-lg font-['Poppins']">
            {item.name}
          </h4>
          <div className="text-yellow-400 font-semibold ml-4">
            {item.variants ? (
              <div className="text-right space-y-1">
                {item.variants.map((variant: any, idx: number) => (
                  <div key={idx} className="text-sm">
                    <span className="text-gray-300">{variant.size}: </span>
                    {formatPrice(variant.price, currency)}
                  </div>
                ))}
              </div>
            ) : (
              item.price && formatPrice(item.price, currency)
            )}
          </div>
        </div>

        {item.description && (
          <p className="text-gray-300 text-sm mb-2 italic">
            {item.description}
          </p>
        )}

        {item.tagline && (
          <p className="text-yellow-400/80 text-sm font-medium mb-2">
            "{item.tagline}"
          </p>
        )}

        {item.notes && <p className="text-gray-400 text-xs">{item.notes}</p>}
      </div>
    </div>
  </motion.div>
);

const SubcategorySection: React.FC<{
  subcategory: MenuSubcategory;
  currency: string;
  isSignature?: boolean;
}> = ({ subcategory, currency, isSignature = false }) => (
  <div className="mb-8">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-6"
    >
      <h3
        className={`text-2xl font-bold mb-2 font-['Poppins'] ${
          isSignature
            ? 'text-yellow-400 text-center text-3xl'
            : 'text-white border-b border-yellow-400/30 pb-2'
        }`}
      >
        {subcategory.name}
      </h3>
      {isSignature && (
        <p className="text-center text-gray-300 italic text-lg mb-4">
          Cocktails de autor únicos
        </p>
      )}
    </motion.div>

    {subcategory.items && (
      <div className="grid gap-4">
        {subcategory.items.map((item: any, idx: number) => (
          <MenuItemComponent key={idx} item={item} currency={currency} />
        ))}
      </div>
    )}

    {subcategory.subsections && (
      <div className="space-y-6">
        {subcategory.subsections.map((subsection: any, idx: number) => (
          <div key={idx}>
            <h4 className="text-xl font-semibold text-yellow-400 mb-4 border-l-4 border-yellow-400 pl-4 font-['Poppins']">
              {subsection.name}
            </h4>
            <div className="grid gap-4">
              {subsection.items.map((item: any, itemIdx: number) => (
                <MenuItemComponent
                  key={itemIdx}
                  item={item}
                  currency={currency}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  // Obtener datos de la API
  const { category, isLoading, error } = useCategoryBySlug(categorySlug);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Manejo de estados de carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Cargando categoría...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Error al cargar la categoría
          </h1>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Categoría no encontrada
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const Icon =
    categoryIcons[category.slug as keyof typeof categoryIcons] || Utensils;

  const filteredSubcategories = selectedSubcategory
    ? category.subcategories.filter(
        (sub: any) => sub.name === selectedSubcategory
      )
    : category.subcategories;

  return (
    <>
      <SEOHead
        title={`${category.name} | EGO HOUSE Madrid - ${
          category.slug === 'bebidas'
            ? 'Tetería Premium & Bebidas'
            : 'Carta Especializada'
        }`}
        description={`Descubre nuestra selección de ${category.name.toLowerCase()} en EGO HOUSE Madrid${
          category.slug === 'bebidas'
            ? ', la mejor tetería para fumar cachimba en Madrid centro'
            : ''
        }. Calidad premium y ambiente único.`}
        keywords={`${category.name.toLowerCase()} madrid, ego house ${category.name.toLowerCase()}, carta ${category.name.toLowerCase()} madrid${
          category.slug === 'bebidas'
            ? ', cachimba madrid, tetería madrid, fumar cachimba madrid, hookah lounge madrid, shisha madrid'
            : ''
        }, restaurante madrid`}
        url={`https://www.egohousebynavs.com/menu/${category.slug}`}
        image="/comida.jpg"
      />
      <div className="min-h-screen relative font-['Poppins']">
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/HomeMobile.png')",
          }}
        />
        {/* Dark overlay for readability */}
        <div className="fixed inset-0 z-10 bg-black/70" />

        {/* Content */}
        <div className="relative z-20">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-700/50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft size={24} />
                <span>Volver</span>
              </button>

              <div className="flex items-center space-x-3">
                <Icon className="text-yellow-400" size={32} />
                <h1 className="text-3xl font-bold text-white">
                  {category.name}
                </h1>
              </div>

              <div className="text-sm text-gray-400">
                v{MENU_CONFIG.version}
              </div>
            </div>
          </div>

          {/* Subcategory Navigation */}
          {category.subcategories.length > 1 && (
            <div className="bg-black/20 backdrop-blur-sm border-b border-gray-700/50">
              <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSubcategory(null)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedSubcategory === null
                        ? 'bg-yellow-400 text-black font-semibold'
                        : 'bg-gray-800/50 text-white hover:bg-gray-700/50'
                    }`}
                  >
                    Todos
                  </button>
                  {category.subcategories.map((subcategory: any) => (
                    <button
                      key={subcategory.name}
                      onClick={() => setSelectedSubcategory(subcategory.name)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedSubcategory === subcategory.name
                          ? 'bg-yellow-400 text-black font-semibold'
                          : 'bg-gray-800/50 text-white hover:bg-gray-700/50'
                      }`}
                    >
                      {subcategory.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Menu Content */}
          <div className="max-w-6xl mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSubcategory || 'all'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {filteredSubcategories.map((subcategory: any, idx: number) => (
                  <SubcategorySection
                    key={idx}
                    subcategory={subcategory}
                    currency={MENU_CONFIG.currency}
                    isSignature={subcategory.type === 'signature'}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-black/40 backdrop-blur-sm border-t border-gray-700/50 py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="text-gray-400 text-sm">
                Carta actualizada • Precios en {MENU_CONFIG.currency} • IVA
                incluido
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
