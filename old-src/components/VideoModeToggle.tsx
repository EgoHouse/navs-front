import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Image, Zap, Wifi } from 'lucide-react';

interface VideoModeToggleProps {
  onModeChange: (useVideo: boolean) => void;
  isAutoDetected: boolean;
  currentMode: 'video' | 'image';
}

const VideoModeToggle: React.FC<VideoModeToggleProps> = ({
  onModeChange,
  isAutoDetected,
  currentMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/80 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden"
      >
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {currentMode === 'video' ? (
            <Video size={16} className="text-blue-400" />
          ) : (
            <Image size={16} className="text-green-400" />
          )}
          <span className="text-sm">
            {currentMode === 'video' ? 'Video HD' : 'Modo Optimizado'}
          </span>
          {isAutoDetected && (
            <div title="Auto-detectado">
              <Zap size={12} className="text-yellow-400" />
            </div>
          )}
        </motion.button>

        {/* Expanded Options */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="border-t border-white/10"
        >
          <div className="p-2 space-y-1">
            <button
              onClick={() => {
                onModeChange(true);
                setIsExpanded(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                currentMode === 'video'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <Video size={14} />
              Video HD
            </button>

            <button
              onClick={() => {
                onModeChange(false);
                setIsExpanded(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                currentMode === 'image'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <Wifi size={14} />
              Ahorro de datos
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VideoModeToggle;
