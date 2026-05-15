import SEO from '@components/common/SEO';

//* Components
import WhatsAppButton from '@components/common/WhatsAppButton';
import {Navbar, Footer} from '@components/layout';

//* Sections
import HeroSection from './sections/HeroSection';
import MenuSection from './sections/MenuSection';
import ShishaGallerySection from './sections/ShishaGallerySection';
import CocktailSection from './sections/CocktailSection';
import LocationSection from './sections/LocationSection';

//* Constants
import { LANDING_SEO } from './constants/seo';
import { WHATSAPP_CONFIG } from './constants/content';

const LandingPage = () => {
  return (
    <>
      <SEO {...LANDING_SEO} />
      <Navbar />

      <main>
        <HeroSection />
        <MenuSection />
        <CocktailSection />
        <ShishaGallerySection />
        <LocationSection />
      </main>

      <Footer />
      <WhatsAppButton
        phoneNumber={WHATSAPP_CONFIG.phoneNumber}
        defaultMessage={WHATSAPP_CONFIG.defaultMessage}
      />
    </>
  );
};

export default LandingPage;
