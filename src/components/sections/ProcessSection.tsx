'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Palette, Code, Rocket, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Brief',
    description: 'Omawiamy Twoje potrzeby, cele i wymagania. Ustalamy zakres projektu.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Palette,
    title: 'Projekt',
    description: 'Tworzę mockupy, wireframe\'y i planuję architekturę rozwiązania.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Code,
    title: 'Rozwój',
    description: 'Piszę kod, implementuję funkcjonalności i testuję rozwiązanie.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Rocket,
    title: 'Wdrożenie',
    description: 'Deploy, optymalizacja i wsparcie po wdrożeniu. Projekt gotowy!',
    color: 'from-orange-500 to-red-500',
  },
];

export default function ProcessSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="proces" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Jak wygląda współpraca?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Prosty, przejrzysty proces od pomysłu do gotowego produktu
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-cyan-500 via-green-500 to-orange-500 opacity-30" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm font-bold text-purple-400">0{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow (mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-cyan-500" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">
              Regularne aktualizacje i transparentna komunikacja na każdym etapie
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

