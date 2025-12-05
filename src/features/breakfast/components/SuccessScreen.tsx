import { motion } from 'framer-motion';

interface SuccessScreenProps {
  onReset: () => void;
}

const SuccessScreen = ({ onReset }: SuccessScreenProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/HomeMobile.png)',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 mx-auto max-w-md text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mb-4 text-2xl font-light text-white">
          ¡Pedido Enviado!
        </h2>
        <p className="mb-8 text-white/70">
          Tu pedido ha sido enviado por WhatsApp. Te confirmaremos la
          disponibilidad y tiempo de preparación.
        </p>
        <button
          onClick={onReset}
          className="bg-white px-6 py-2 font-light text-black transition-all duration-300 hover:bg-white/90"
        >
          Hacer otro pedido
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessScreen;
