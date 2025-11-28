import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-black text-white border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-light mb-6 tracking-wider">
              EGO HOUSE
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Experiencia sensorial única en el corazón de Madrid
            </p>
            <motion.a
              href="https://www.instagram.com/egohouse.mad/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Instagram size={18} />
              <span className="text-sm">@egohouse.mad</span>
            </motion.a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white/90">Contacto</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-white/60">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p>Calle de Manuel Pombo Angulo 10</p>
                  <p>Madrid, España</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Phone size={16} />
                <p>+34 646 149 112</p>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Mail size={16} />
                <p>info@egohousebynavs.com</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-medium mb-6 text-white/90">Horarios</h4>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-center gap-3">
                <Clock size={16} />
                <div>
                  <p>Lun-Jue: 10:00am - 01:00am</p>
                  <p>Vie-Dom: 12:00am - 02:00am</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-12 pt-8 text-center">
          <p className="text-white/40 text-sm">
            © {currentYear} Ego House. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
