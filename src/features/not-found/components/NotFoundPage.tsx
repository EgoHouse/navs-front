import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { ROUTES } from '@lib/utils/routes';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-black" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-8xl font-extralight tracking-tighter text-white md:text-9xl lg:text-[12rem]"
          >
            404
          </motion.h1>

          {/* Mensaje */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-light tracking-wide text-white md:text-3xl lg:text-4xl">
              Página no encontrada
            </h2>
            <p className="mx-auto text-base font-light tracking-wide text-white/50 md:text-lg">
              La página que buscas no existe o ha sido movida.
            </p>
          </motion.div>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.button
              onClick={() => navigate(ROUTES.HOME)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex cursor-pointer items-center gap-2 border border-white bg-white px-8 py-3 font-light text-black transition-all duration-300 hover:bg-white/90"
              aria-label="Volver al inicio"
            >
              <Home size={18} strokeWidth={1.5} />
              Volver al Inicio
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
