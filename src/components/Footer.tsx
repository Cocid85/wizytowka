'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code2, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  ArrowUpRight,
  Heart,
  MapPin,
  ChevronUp
} from 'lucide-react';

const navigation = [
  { name: 'Usługi', href: '#uslugi' },
  { name: 'Tech Stack', href: '#tech-stack' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Proces', href: '#proces' },
  { name: 'Kontakt', href: '#kontakt' },
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
    color: 'hover:bg-yellow-500 hover:text-black',
  },
];

export default function Footer() {
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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

      <div className="relative container mx-auto px-4">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="py-16 text-center border-b border-white/10"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Gotowy na <span className="text-gradient">współpracę</span>?
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Masz pomysł na projekt? Porozmawiajmy o tym, jak mogę pomóc go zrealizować.
          </p>
          <motion.a
            href="#kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-semibold text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Napisz do mnie
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-bold text-gradient">{'<Dev />'}</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              Tworzę nowoczesne aplikacje webowe i mobilne z pasją do czystego kodu 
              i dbałością o każdy detal. Profesjonalizm i jakość to moje priorytety.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <a 
                href="mailto:ms.akademiaair@gmail.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">ms.akademiaair@gmail.com</span>
              </a>
              <a 
                href="tel:+48691409400" 
                className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+48 691 409 400</span>
              </a>
              <div className="flex items-center gap-3 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Polska</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              Nawigacja
            </h4>
            <ul className="space-y-3">
              {navigation.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-yellow-500 transition-all duration-300" />
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Back to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              Social
            </h4>
            <div className="flex gap-3 mb-8">
              {socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
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
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-yellow-500/30 transition-all group"
            >
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              <span className="text-sm">Do góry</span>
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
          <p className="text-sm text-gray-500 flex items-center gap-1">
            © {currentYear} Wszelkie prawa zastrzeżone. 
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Zbudowane z</span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-4 h-4 invert" />
              <span className="text-gray-400">Next.js</span>
            </span>
            <span>i</span>
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
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}