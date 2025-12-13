'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Smartphone, Globe, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  type: 'mobile' | 'web' | 'hybrid';
  url?: string;
  technologies: string[];
  features: string[];
  image?: string;
  gradient: string;
}

const projects: Project[] = [
  {
    id: 'kravmaga-app',
    title: 'kravmaga-aplikacja.pl',
    description: 'Aplikacja Web + Android dla akademii Krav Maga',
    longDescription: 'Kompleksowy system do zarządzania akademią sztuk walki. Aplikacja webowa i mobilna (Android) z panelem dla kursantów i instruktorów, systemem obecności, płatności i powiadomień.',
    type: 'hybrid',
    url: 'https://kravmaga-aplikacja.pl',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Web', 'Android'],
    features: ['Panel kursanta', 'System obecności', 'Płatności online', 'Aplikacja Android'],
    gradient: 'from-red-500 via-red-600 to-black',
  },
  {
    id: 'akademia-web',
    title: 'akademia-samoobrony.pl',
    description: 'Strona akademii sztuk walki i samoobrony',
    longDescription: 'Nowoczesna strona internetowa prezentująca ofertę akademii Krav Maga z systemem zapisów i galerią treningów.',
    type: 'web',
    url: 'https://akademia-samoobrony.pl',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    features: ['System zapisów', 'Galeria zdjęć', 'Blog', 'SEO optymalizacja'],
    gradient: 'from-white via-red-500 to-[#00ff41]',
  },
  {
    id: 'holisticstar',
    title: 'holisticstar.pl',
    description: 'Strona dla branży wellness i zdrowia',
    longDescription: 'Elegancka strona internetowa dla specjalisty z branży wellness, z systemem rezerwacji wizyt i prezentacją usług.',
    type: 'web',
    url: 'https://holisticstar.pl',
    technologies: ['Next.js', 'React', 'Tailwind', 'Calendly'],
    features: ['Rezerwacja wizyt', 'Blog', 'Formularz kontaktowy', 'Responsywność'],
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
  },
  {
    id: 'djluca',
    title: 'djluca.pl',
    description: 'Strona DJ-a i producenta muzycznego',
    longDescription: 'Dynamiczna strona dla DJ-a z portfolio i formularzem bookingowym na wydarzenia.',
    type: 'web',
    url: 'https://djluca.pl',
    technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    features: ['Formularz bookingu', 'Galeria eventów', 'Animacje'],
    gradient: 'from-cyan-500 via-blue-500 to-purple-500',
  },
];

// Mockup telefonu
function PhoneMockup({ project, isHovered }: { project: Project; isHovered: boolean }) {
  return (
    <div className="relative mx-auto w-[180px] h-[360px]">
      {/* Ramka telefonu */}
      <div className="absolute inset-0 bg-gray-900 rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
        
        {/* Ekran */}
        <div className="absolute inset-2 rounded-[2rem] overflow-hidden bg-black">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${project.gradient} opacity-80`}>
              {/* Placeholder UI */}
              <div className="p-4 pt-8 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white/20" />
                <div className="h-3 bg-white/30 rounded w-3/4" />
                <div className="h-2 bg-white/20 rounded w-1/2" />
                <div className="mt-6 space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 bg-white/10 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center">
              <Smartphone className="w-8 h-8 text-white mx-auto mb-2" />
              <span className="text-white text-sm font-medium">Aplikacja mobilna</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-r ${project.gradient} rounded-[3rem] blur-2xl -z-10`}
        animate={{ opacity: isHovered ? 0.4 : 0.15 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

// Mockup przeglądarki
function BrowserMockup({ project, isHovered }: { project: Project; isHovered: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      {/* Ramka przeglądarki */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
        {/* Pasek przeglądarki */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-950 border-b border-gray-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-white" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 mx-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-md text-xs text-gray-400">
              <Globe className="w-3 h-3" />
              <span className="truncate">{project.url?.replace('https://', '')}</span>
            </div>
          </div>
        </div>
        
        {/* Zawartość strony */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${project.gradient} opacity-80`}>
              {/* Placeholder UI */}
              <div className="p-6 space-y-4">
                {/* Nav */}
                <div className="flex items-center justify-between">
                  <div className="w-24 h-6 bg-white/20 rounded" />
                  <div className="flex gap-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-12 h-3 bg-white/20 rounded" />
                    ))}
                  </div>
                </div>
                {/* Hero */}
                <div className="mt-8 space-y-3">
                  <div className="h-8 bg-white/30 rounded w-3/4" />
                  <div className="h-4 bg-white/20 rounded w-1/2" />
                  <div className="flex gap-3 mt-4">
                    <div className="h-10 w-28 bg-white/30 rounded-lg" />
                    <div className="h-10 w-28 bg-white/10 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: isHovered ? 1 : 0.8 }}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full text-black font-medium"
            >
              <span>Odwiedź stronę</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-r ${project.gradient} rounded-2xl blur-2xl -z-10`}
        animate={{ opacity: isHovered ? 0.3 : 0.1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

// Mockup hybrydowy (Web + Mobile)
function HybridMockup({ project, isHovered }: { project: Project; isHovered: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[450px] h-[320px]">
      {/* Przeglądarka w tle */}
      <motion.div 
        className="absolute left-0 top-0 w-[320px]"
        animate={{ 
          x: isHovered ? -10 : 0,
          rotate: isHovered ? -2 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-950 border-b border-gray-800">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 mx-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded text-[10px] text-gray-400">
                <Globe className="w-2 h-2" />
                <span className="truncate">{project.url?.replace('https://', '')}</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-br ${project.gradient} opacity-70`}>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-4 bg-white/20 rounded" />
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-2 bg-white/20 rounded" />
                    ))}
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-5 bg-white/30 rounded w-3/4" />
                  <div className="h-3 bg-white/20 rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Telefon na pierwszym planie */}
      <motion.div 
        className="absolute right-0 bottom-0 w-[140px] h-[280px] z-10"
        animate={{ 
          x: isHovered ? 10 : 0,
          rotate: isHovered ? 3 : 0,
          y: isHovered ? -5 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gray-900 rounded-[2rem] border-4 border-gray-800 shadow-2xl overflow-hidden">
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-10" />
          <div className="absolute inset-1.5 rounded-[1.5rem] overflow-hidden bg-black">
            <div className={`w-full h-full bg-gradient-to-br ${project.gradient} opacity-80`}>
              <div className="p-3 pt-6 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white/20" />
                <div className="h-2 bg-white/30 rounded w-3/4" />
                <div className="h-1.5 bg-white/20 rounded w-1/2" />
                <div className="mt-4 space-y-1.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-6 bg-white/10 rounded-md" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Badge Android + Web */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="px-2 py-1 bg-gray-900 border border-gray-700 rounded-full text-[10px] text-gray-400 flex items-center gap-1">
          <Globe className="w-2.5 h-2.5" />
          Web
        </span>
        <span className="px-2 py-1 bg-gray-900 border border-gray-700 rounded-full text-[10px] text-gray-400 flex items-center gap-1">
          <Smartphone className="w-2.5 h-2.5" />
          Android
        </span>
      </motion.div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: isHovered ? 1 : 0.8 }}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-full text-black font-medium"
        >
          <span>{t('portfolio.visitSite')}</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-r ${project.gradient} rounded-2xl blur-2xl -z-10`}
        animate={{ opacity: isHovered ? 0.4 : 0.15 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

// Karta projektu
function ProjectCard({ project, index, inView, t }: { project: Project; index: number; inView: boolean; t: (key: string) => string }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (project.url) {
      window.open(project.url, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`group ${project.url ? 'cursor-pointer' : ''}`}
    >
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Mockup - na przemian lewa/prawa strona */}
        <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
          {project.type === 'mobile' ? (
            <PhoneMockup project={project} isHovered={isHovered} />
          ) : (
            <BrowserMockup project={project} isHovered={isHovered} />
          )}
        </div>

        {/* Info */}
        <div className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
          {/* Badge typu */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.1 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
              project.type === 'mobile'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}
          >
            {project.type === 'mobile' ? (
              <>
                <Smartphone className="w-3 h-3" />
                {t('portfolio.types.mobile')}
              </>
            ) : project.type === 'hybrid' ? (
              <>
                <Smartphone className="w-3 h-3" />
                {t('portfolio.types.hybrid')}
              </>
            ) : (
              <>
                <Globe className="w-3 h-3" />
                {t('portfolio.types.web')}
              </>
            )}
          </motion.div>

          {/* Tytuł */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.15 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors"
          >
            {project.title}
          </motion.h3>

          {/* Opis */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.2 }}
            className="text-gray-400 mb-6 leading-relaxed"
          >
            {project.longDescription}
          </motion.p>

          {/* Technologie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.25 }}
            className={`flex flex-wrap gap-2 mb-6 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}
          >
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.3 }}
            className={`grid grid-cols-2 gap-2 mb-6 ${index % 2 === 1 ? 'lg:justify-items-end' : ''}`}
          >
            {project.features.map((feature, i) => (
              <div
                key={feature}
                className={`flex items-center gap-2 text-sm text-gray-500 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          {project.url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.35 }}
            >
              <span
                className={`inline-flex items-center gap-2 text-red-400 font-medium group-hover:gap-3 transition-all ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {t('portfolio.visitSite')}
                <ExternalLink className="w-4 h-4" />
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#00ff41]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 mb-6"
          >
            {t('portfolio.badge')}
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('portfolio.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-32 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
              t={t}
            />
                  ))}
                </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-gray-500 mb-6">
            {t('portfolio.cta.text')}
          </p>
          <motion.a
            href="#kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('portfolio.cta.button')}
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
              </motion.div>
      </div>
    </section>
  );
}