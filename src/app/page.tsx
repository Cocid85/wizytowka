import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TechStackSection from '@/components/sections/TechStackSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ClientFeaturesSection from '@/components/sections/ClientFeaturesSection';
import ContactSection from '@/components/sections/ContactSection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Jednolite tło dla całej strony */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ClientFeaturesSection />
      <TechStackSection />
      <PortfolioSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
      <CookieBanner />
    </main>
  );
}

