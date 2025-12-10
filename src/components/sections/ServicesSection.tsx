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
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Globe,
    title: 'Strony WWW',
    description: 'Nowoczesne strony z Next.js i React. SEO-friendly, szybkie i responsywne.',
    features: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'],
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Server,
    title: 'Systemy webowe',
    description: 'Zaawansowane aplikacje webowe z panelami admin, dashboardami i analityką.',
    features: ['Full-stack', 'Firebase Admin', 'Google Analytics', 'Recharts'],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Plug,
    title: 'Integracje API',
    description: 'Integracje z zewnętrznymi serwisami, automatyzacje i webhooki.',
    features: ['REST API', 'Webhooks', 'Email services', 'Social media APIs'],
    gradient: 'from-orange-500 to-red-500',
  },
];

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="uslugi" className="py-24 relative">
      <div className="container mx-auto px-4">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
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

