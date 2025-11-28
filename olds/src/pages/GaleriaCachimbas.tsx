import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const GaleriaCachimbas: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('todas');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleGoBack = () => {
    navigate('/');
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Datos temporales de categorías y cachimbas
  const categories = [
    { id: 'todas', name: 'Todas' },
    // { id: 'categoria-1', name: 'Categoría 1' },
    // { id: 'categoria-2', name: 'Categoría 2' },
    // { id: 'categoria-3', name: 'Categoría 3' },
    // { id: 'categoria-4', name: 'Categoría 4' },
  ];

  // Imágenes de ejemplo para cada categoría
  const cachimbas = {
    todas: [
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180359/_5047250_dzuzyr.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180358/_5047254_qdhh87.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180358/_5047259_rkjvzg.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180358/_5047258_c0oaiv.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180358/_5047253_xoasws.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047248_c7qx2d.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047239_oiezxq.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047242_fh4wkz.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047244_k8dxki.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047245_rcfmhk.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047241_kflmfg.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047234_w3b0xe.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047235_t5p0ea.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047232_ywdh0u.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047237_yfiscd.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047204_ketf7p.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047180_gvgihc.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047166_m74fes.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047175_ab68ud.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047156_wgscoq.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047147_crgjhf.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047152_f9gb1p.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047143_smczsk.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047136_domezv.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047132_ka1iu3.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047119_hyj7j3.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047121_sotww6.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047113_aiuwvm.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047075_abqa82.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047026_n672uj.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047025_cokcwe.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047067_obgbd1.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5047003_txjyf2.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5047000_ecautz.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046901_ugfitl.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046984_fvuzw1.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046880_xvuv7k.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046973_igjg8n.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046955_wvoovm.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046787_v76dgu.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046870_mwpqzm.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046845_xaxn9a.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046852_ombifo.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046950_udbpvt.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046819_qekl19.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180342/_5046815_dhcbaw.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180342/_5046801_okd6ll.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180342/_5046939_pm5bhs.jpg',
    ],
    'categoria-1': [
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
    ],
    'categoria-2': [
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
    ],
    'categoria-3': [
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
    ],
    'categoria-4': [
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
      'https://res.cloudinary.com/dm70hhhnm/image/upload/hookas.jpg',
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Galería de Cachimbas - EGO HOUSE Madrid"
        description="Explora nuestra amplia selección de cachimbas premium en EGO HOUSE Madrid. Descubre diferentes estilos y diseños de hookah para tu experiencia perfecta."
        keywords="galería cachimbas madrid, hookah gallery madrid, pipas agua madrid, cachimbas premium madrid, ego house cachimbas, shisha gallery madrid, cachimbas diseño madrid, hookahs madrid centro, galería shisha madrid, cachimbas exclusivas madrid"
        url="https://www.egohousebynavs.com/galeria-cachimbas"
        image="https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047204_ketf7p.jpg"
      />

      {/* Botón de volver fijo */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleGoBack}
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/40 transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver</span>
      </motion.button>

      <div className="min-h-screen bg-black ">
        {/* Banner superior */}
        <div className="relative h-64 md:h-100 overflow-hidden">
          <img
            src="https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047204_ketf7p.jpg"
            alt="Banner galería de cachimbas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Título */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-light text-white text-center font-['Poppins'] [text-shadow:_0_4px_12px_rgb(0_0_0_/_50%)]"
            >
              Galería de Cachimbas
            </motion.h1>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tabs de categorías */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
              <div className="flex flex-wrap gap-1">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      scale: { type: 'spring', stiffness: 400, damping: 25 },
                    }}
                    className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-500 overflow-hidden group ${
                      activeCategory === category.id
                        ? 'text-black shadow-lg shadow-white/25'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {/* Background animado para el tab activo */}
                    {activeCategory === category.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 rounded-xl"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />

                    {/* Texto del tab */}
                    <span className="relative z-10 font-['Poppins'] tracking-wide">
                      {category.name}
                    </span>

                    {/* Indicador de cantidad para "Todas" */}
                    {category.id === 'todas' && (
                      <span className="relative z-10 ml-2 text-xs bg-black/20 px-2 py-1 rounded-full">
                        {cachimbas.todas.length}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Grid de imágenes */}
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {cachimbas[activeCategory as keyof typeof cachimbas]?.map(
              (imagen, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { type: 'spring', stiffness: 400, damping: 25 },
                  }}
                  className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm cursor-pointer"
                  onClick={() => setSelectedImage(imagen)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={imagen}
                      alt={`Cachimba ${index + 1} - ${
                        categories.find((c) => c.id === activeCategory)?.name
                      }`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay en hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Información de la cachimba */}
                  {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">
                      Cachimba #{index + 1}
                    </p>
                  </div> */}
                </motion.div>
              )
            )}
          </motion.div>

          {/* Mensaje si no hay imágenes */}
          {(!cachimbas[activeCategory as keyof typeof cachimbas] ||
            cachimbas[activeCategory as keyof typeof cachimbas].length ===
              0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-white/60 text-lg">
                No hay cachimbas disponibles en esta categoría
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          {/* Botón de cerrar */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-60 flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Contenedor de la imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] w-full"
          >
            <img
              src={selectedImage}
              alt="Cachimba ampliada"
              className="w-full h-full object-contain rounded-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default GaleriaCachimbas;
