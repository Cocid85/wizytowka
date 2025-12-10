'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import technologiesData from '@/data/technologies.json';

// Simple icon mapping - można rozszerzyć o prawdziwe ikony
const getTechIcon = (iconName: string) => {
  const iconMap: Record<string, string> = {
    nextjs: '▲',
    react: '⚛️',
    flutter: '💙',
    typescript: '📘',
    dart: '🎯',
    tailwindcss: '🎨',
    firebase: '🔥',
    framer: '✨',
    zod: '🛡️',
    resend: '📧',
    google: '🔍',
    recharts: '📊',
    lucide: '🎭',
    nodejs: '🟢',
    date-fns: '📅',
  };
  return iconMap[iconName] || '⚡';
};

const categoryColors: Record<string, string> = {
  framework: 'from-purple-500 to-pink-500',
  language: 'from-blue-500 to-cyan-500',
  styling: 'from-pink-500 to-rose-500',
  backend: 'from-orange-500 to-red-500',
  state: 'from-green-500 to-emerald-500',
  animation: 'from-yellow-500 to-orange-500',
  forms: 'from-indigo-500 to-purple-500',
  email: 'from-cyan-500 to-blue-500',
  analytics: 'from-red-500 to-pink-500',
  visualization: 'from-purple-500 to-indigo-500',
  ui: 'from-blue-500 to-cyan-500',
  utils: 'from-gray-500 to-slate-500',
  other: 'from-gray-400 to-gray-600',
};

export default function TechStackSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Group technologies by category
  const groupedTechs = technologiesData.technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologiesData.technologies>);

  return (
    <section id="tech-stack" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologie, które znam i używam w projektach
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Automatycznie wygenerowane z analizy moich projektów
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(groupedTechs).map(([category, techs], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white capitalize">
                {category === 'state' ? 'State Management' : 
                 category === 'styling' ? 'Styling' :
                 category === 'visualization' ? 'Wizualizacja danych' :
                 category === 'utils' ? 'Narzędzia' :
                 category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {techs.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                    className="glass rounded-lg p-4 text-center hover:scale-105 transition-transform group cursor-pointer"
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${categoryColors[tech.category] || categoryColors.other} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                      {getTechIcon(tech.icon)}
                    </div>
                    <p className="text-sm font-semibold text-white">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

