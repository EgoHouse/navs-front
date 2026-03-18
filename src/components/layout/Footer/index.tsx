import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Instagram } from 'lucide-react';
import { CONTACT_INFO, BUSINESS_HOURS, BRAND_INFO } from './constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-white/5 bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-6 text-2xl font-medium tracking-wider">
              {BRAND_INFO.name}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              {BRAND_INFO.tagline}
            </p>
            <motion.a
              href={CONTACT_INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
            >
              <Instagram size={18} />
              <span className="text-sm">{CONTACT_INFO.instagram.handle}</span>
            </motion.a>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-semibold text-white/90">Contacto</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <div>
                  <p>{CONTACT_INFO.address.street}</p>
                  <p>{CONTACT_INFO.address.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Phone size={16} />
                <p>{CONTACT_INFO.phone}</p>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Mail size={16} />
                <p>{CONTACT_INFO.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-semibold text-white/90">Horarios</h4>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-center gap-3">
                <Clock size={16} />
                <div>
                  <p>{BUSINESS_HOURS.weekdays}</p>
                  <p>{BUSINESS_HOURS.weekend}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-sm text-white/60">
            © {currentYear} Ego House. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
