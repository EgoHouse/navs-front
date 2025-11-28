import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

interface LocationInfo {
  address: string;
  city: string;
  phone: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface LocationMapProps {
  locationInfo?: LocationInfo;
}

const LocationMap: React.FC<LocationMapProps> = ({
  locationInfo = {
    address: 'Calle de Manuel Pombo Angulo 10',
    city: 'Madrid, España',
    phone: '+34 646 149 112',
    hours: {
      weekdays: '10:00am  - 01:00am',
      weekends: '12:00am - 02:00am',
    },
    coordinates: {
      lat: 40.506095,
      lng: -3.656349,
    },
  },
}) => {
  // Generate Google Maps embed URL
  const mapUrl = `https://maps.google.com/maps?q=${locationInfo.coordinates.lat},${locationInfo.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const handleDirections = () => {
    const directionsUrl = `https://www.google.com/maps/place/Ego+House+Madrid/@40.5061218,-3.6563866,18z/data=!4m14!1m7!3m6!1s0xd422d1b9f1d1a23:0xf168412a4ec7fd2!2sEgo+House+Madrid!8m2!3d40.5060423!4d-3.6563973!16s%2Fg%2F11kq7wktnj!3m5!1s0xd422d1b9f1d1a23:0xf168412a4ec7fd2!8m2!3d40.5060423!4d-3.6563973!16s%2Fg%2F11kq7wktnj?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <section
      id="location"
      className="relative bg-zinc-950 text-white py-24 overflow-hidden"
    >
      {/* Subtle animated background elements - Only on desktop */}
      <div className="absolute inset-0 hidden lg:block">
        <motion.div
          className="absolute top-20 left-1/4 w-32 h-32 bg-white/[0.03] rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/[0.04] rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.04, 0.02, 0.04],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-20 h-20 bg-white/[0.03] rounded-full blur-xl"
          animate={{
            y: [-10, 10, -10],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: window.innerWidth >= 1024 ? 0.6 : 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-extralight mb-4 tracking-tight">
            Encuéntranos
          </h2>
          <p className="text-white/70 font-light text-lg">
            Visítanos y descubre la experiencia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: window.innerWidth >= 1024 ? 0.6 : 0,
              delay: window.innerWidth >= 1024 ? 0.2 : 0,
            }}
            className="relative"
          >
            <div className="aspect-square relative overflow-hidden rounded-lg border border-white/20 group">
              <iframe
                src={mapUrl}
                className="absolute inset-0 w-full h-full transition-all duration-500 group-hover:scale-105"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ego House Location"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-all duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Information Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: window.innerWidth >= 1024 ? 0.6 : 0,
              delay: window.innerWidth >= 1024 ? 0.4 : 0,
            }}
            className="space-y-8"
          >
            {/* Address */}
            <motion.div
              className="space-y-3 group"
              whileHover={window.innerWidth >= 1024 ? { x: 5 } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                <h3 className="text-lg font-light">Dirección</h3>
              </div>
              <div className="ml-8">
                <p className="text-white">{locationInfo.address}</p>
                <p className="text-white/70 text-sm">{locationInfo.city}</p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              className="space-y-3 group"
              whileHover={window.innerWidth >= 1024 ? { x: 5 } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                <h3 className="text-lg font-light">Horarios</h3>
              </div>
              <div className="ml-8 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Lunes - Jueves</span>
                  <span className="text-white">
                    {locationInfo.hours.weekdays}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">
                    Viernes - Sábados - Domingos
                  </span>
                  <span className="text-white">
                    {locationInfo.hours.weekends}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              className="space-y-3 group"
              whileHover={window.innerWidth >= 1024 ? { x: 5 } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                <h3 className="text-lg font-light">Contacto</h3>
              </div>
              <div className="ml-8">
                <p className="text-white">{locationInfo.phone}</p>
              </div>
            </motion.div>

            {/* Directions Button */}
            <div className="pt-6">
              <motion.button
                onClick={handleDirections}
                className="flex items-center gap-3 px-6 py-3 border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300"
                whileHover={window.innerWidth >= 1024 ? { scale: 1.02 } : {}}
                whileTap={window.innerWidth >= 1024 ? { scale: 0.98 } : {}}
              >
                <Navigation className="w-5 h-5" />
                <span className="font-light">Cómo llegar</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
