'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  ArrowUpRight,
  Heart,
  MapPin,
  ChevronUp
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const navigation = [
  { key: 'services', href: '#uslugi' },
  { key: 'techStack', href: '#tech-stack' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'process', href: '#proces' },
  { key: 'contact', href: '#kontakt' },
];

const socials = [
  { 
    name: 'GitHub', 
    href: 'https://github.com', 
    icon: Github,
    color: 'hover:bg-gray-700 hover:text-white',
  },
  { 
    name: 'LinkedIn', 
    href: 'https://linkedin.com', 
    icon: Linkedin,
    color: 'hover:bg-blue-600 hover:text-white',
  },
  { 
    name: 'Email', 
    href: 'mailto:ms.akademiaair@gmail.com', 
    icon: Mail,
    color: 'hover:bg-red-500 hover:text-white',
  },
];

export default function Footer() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative mt-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-transparent pointer-events-none" />
      
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      <div className="relative container mx-auto px-4">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="py-16 text-center border-b border-white/10"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-gradient">{t('footer.cta.title')}</span>
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {t('footer.cta.subtitle')}
          </p>
          <motion.a
            href="#kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('footer.cta.button')}
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1 - Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center md:justify-start"
          >
            <div className="relative">
              <img
                src="/image/logo_svg_jasne.svg"
                alt="Logo"
                className="w-full max-w-[200px] h-auto"
              />
            </div>
          </motion.div>

          {/* Column 2 - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {t('footer.contact')}
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:ms.akademiaair@gmail.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="text-sm">ms.akademiaair@gmail.com</span>
              </a>
              <a 
                href="tel:+48691409400" 
                className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="text-sm">+48 691 409 400</span>
              </a>
              <div className="flex items-center gap-3 text-gray-500">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Polska</span>
              </div>
            </div>
          </motion.div>

          {/* Column 3 - Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3">
              {navigation.map((item, index) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-300" />
                    {t(`nav.${item.key}`)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 - Social & Back to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {t('footer.social')}
            </h4>
            <div className="flex gap-3 mb-8">
              {socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-red-500/30 transition-all group"
            >
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              <span className="text-sm">{t('footer.backToTop')}</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              © {currentYear} {t('footer.copyright')}
            </p>
            
            {/* Link to privacy policy */}
            <div className="flex items-center gap-4 text-sm">
              <a 
                href="/polityka-prywatnosci" 
                className="text-gray-500 hover:text-white transition-colors"
              >
                Polityka Prywatności
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{t('footer.builtWith')}</span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-4 h-4 invert" />
              <span className="text-gray-400">Next.js</span>
            </span>
            <span>{t('footer.and')}</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#00ff41]/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}