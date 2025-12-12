'use client';

import { motion } from 'framer-motion';
import { Smartphone, Globe, Server, Plug } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import TiltCard from '@/components/TiltCard';

const services = [
  {
    icon: Smartphone,
    title: 'Aplikacje mobilne',
    description: 'Natywne aplikacje iOS i Android w Flutter. Szybkie, płynne i piękne interfejsy.',
    features: ['Flutter/Dart', 'Firebase', 'Offline-first', 'Push notifications'],
    gradient: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Globe,
    title: 'Strony WWW',
    description: 'Nowoczesne strony z Next.js i React. SEO-friendly, szybkie i responsywne.',
    features: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
    gradient: 'from-yellow-400 to-yellow-500',
  },
  {
    icon: Server,
    title: 'Systemy webowe',
    description: 'Zaawansowane aplikacje webowe z panelami admin, dashboardami i analityką.',
    features: ['Full-stack', 'Firebase Admin', 'Google Analytics', 'Recharts'],
    gradient: 'from-yellow-600 to-yellow-700',
  },
  {
    icon: Plug,
    title: 'Integracje API',
    description: 'Integracje z zewnętrznymi serwisami, automatyzacje i webhooki.',
    features: ['REST API', 'Webhooks', 'Email services', 'Social media APIs'],
    gradient: 'from-yellow-500 to-yellow-400',
  },
];

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="uslugi" className="py-24 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Co mogę dla Ciebie zbudować?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Kompleksowe rozwiązania od aplikacji mobilnych po zaawansowane systemy webowe
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <TiltCard key={service.title}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-xl p-6 group"
              >
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    {feature}
                  </li>
                ))}
                </ul>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

