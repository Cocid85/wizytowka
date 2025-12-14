'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Shield, 
  Cookie, 
  Mail, 
  Lock, 
  Eye, 
  FileText,
  Clock,
  Server,
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  Sparkles,
  Database,
  Globe,
  AlertTriangle,
  Phone,
  MapPin,
  Menu,
  X,
  Home,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

// ============================================
// KONFIGURACJA - UZUPEŁNIJ SWOJE DANE
// ============================================
const CONFIG = {
  companyName: 'MS Create',
  ownerName: 'Michał Skowroński',
  address: 'Polska',
  email: 'ms.akademiaair@gmail.com',
  phone: '+48 691 409 400',
  websiteUrl: 'https://mscreate.pl',
  lastUpdate: '14 grudnia 2024',
};

// ============================================
// TYPY
// ============================================
type Section = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
  content: any;
};

// ============================================
// SEKCJE POLITYKI
// ============================================
const getSections = (t: (key: string) => string): Section[] => [
  {
    id: 'administrator',
    icon: Users,
    title: 'Administrator danych',
    color: '#3b82f6',
    content: {
      intro: t('privacy.sections.administrator.intro'),
      company: CONFIG.companyName,
      owner: CONFIG.ownerName,
      contact: [
        { icon: Mail, label: t('privacy.sections.administrator.contact.email'), value: CONFIG.email, href: `mailto:${CONFIG.email}` },
        { icon: Phone, label: t('privacy.sections.administrator.contact.phone'), value: CONFIG.phone, href: `tel:${CONFIG.phone}` },
        { icon: MapPin, label: t('privacy.sections.administrator.contact.location'), value: CONFIG.address },
      ],
      note: t('privacy.sections.administrator.note'),
    },
  },
  {
    id: 'zakres',
    icon: Database,
    title: 'Zakres zbieranych danych',
    color: '#8b5cf6',
    content: {
      intro: t('privacy.sections.zakres.intro'),
      categories: [
        {
          title: t('privacy.sections.zakres.categories.contactForm.title'),
          icon: '📝',
          items: t('privacy.sections.zakres.categories.contactForm.items'),
        },
        {
          title: t('privacy.sections.zakres.categories.brief.title'),
          icon: '🔧',
          items: t('privacy.sections.zakres.categories.brief.items'),
        },
        {
          title: t('privacy.sections.zakres.categories.technical.title'),
          icon: '📊',
          items: t('privacy.sections.zakres.categories.technical.items'),
        },
      ],
    },
  },
  {
    id: 'cele',
    icon: Eye,
    title: 'Cele przetwarzania',
    color: '#10b981',
    content: {
      intro: t('privacy.sections.cele.intro'),
      purposes: [
        { purpose: t('privacy.sections.cele.purposes.inquiry.purpose'), legal: 'Art. 6 ust. 1 lit. b RODO', period: t('privacy.sections.cele.purposes.inquiry.period') },
        { purpose: t('privacy.sections.cele.purposes.contract.purpose'), legal: 'Art. 6 ust. 1 lit. b RODO', period: t('privacy.sections.cele.purposes.contract.period') },
        { purpose: t('privacy.sections.cele.purposes.analytics.purpose'), legal: 'Art. 6 ust. 1 lit. a RODO', period: t('privacy.sections.cele.purposes.analytics.period') },
        { purpose: t('privacy.sections.cele.purposes.tax.purpose'), legal: 'Art. 6 ust. 1 lit. c RODO', period: t('privacy.sections.cele.purposes.tax.period') },
        { purpose: t('privacy.sections.cele.purposes.claims.purpose'), legal: 'Art. 6 ust. 1 lit. f RODO', period: t('privacy.sections.cele.purposes.claims.period') },
      ],
    },
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Pliki cookies',
    color: '#f59e0b',
    content: {
      intro: t('privacy.sections.cookies.intro'),
      types: [
        { name: t('privacy.sections.cookies.types.necessary.name'), desc: t('privacy.sections.cookies.types.necessary.desc'), color: '#22c55e', examples: 'session_id, cookie_consent' },
        { name: t('privacy.sections.cookies.types.analytics.name'), desc: t('privacy.sections.cookies.types.analytics.desc'), color: '#3b82f6', examples: '_ga, _gid, _gat' },
        { name: t('privacy.sections.cookies.types.functional.name'), desc: t('privacy.sections.cookies.types.functional.desc'), color: '#8b5cf6', examples: 'language, theme' },
        { name: t('privacy.sections.cookies.types.marketing.name'), desc: t('privacy.sections.cookies.types.marketing.desc'), color: '#f97316', examples: '_fbp, _gcl_au' },
      ],
      note: t('privacy.sections.cookies.note'),
    },
  },
  {
    id: 'prawa',
    icon: Shield,
    title: 'Twoje prawa (RODO)',
    color: '#ef4444',
    content: {
      intro: t('privacy.sections.prawa.intro'),
      rights: [
        { title: t('privacy.sections.prawa.rights.access.title'), desc: t('privacy.sections.prawa.rights.access.desc') },
        { title: t('privacy.sections.prawa.rights.rectification.title'), desc: t('privacy.sections.prawa.rights.rectification.desc') },
        { title: t('privacy.sections.prawa.rights.erasure.title'), desc: t('privacy.sections.prawa.rights.erasure.desc') },
        { title: t('privacy.sections.prawa.rights.restriction.title'), desc: t('privacy.sections.prawa.rights.restriction.desc') },
        { title: t('privacy.sections.prawa.rights.portability.title'), desc: t('privacy.sections.prawa.rights.portability.desc') },
        { title: t('privacy.sections.prawa.rights.objection.title'), desc: t('privacy.sections.prawa.rights.objection.desc') },
        { title: t('privacy.sections.prawa.rights.withdrawal.title'), desc: t('privacy.sections.prawa.rights.withdrawal.desc') },
      ],
      warning: t('privacy.sections.prawa.warning'),
    },
  },
  {
    id: 'bezpieczenstwo',
    icon: Lock,
    title: 'Bezpieczeństwo danych',
    color: '#06b6d4',
    content: {
      intro: t('privacy.sections.bezpieczenstwo.intro'),
      measures: [
        { icon: '🔒', title: t('privacy.sections.bezpieczenstwo.measures.ssl.title'), desc: t('privacy.sections.bezpieczenstwo.measures.ssl.desc') },
        { icon: '🔐', title: t('privacy.sections.bezpieczenstwo.measures.passwords.title'), desc: t('privacy.sections.bezpieczenstwo.measures.passwords.desc') },
        { icon: '🛡️', title: t('privacy.sections.bezpieczenstwo.measures.firewall.title'), desc: t('privacy.sections.bezpieczenstwo.measures.firewall.desc') },
        { icon: '💾', title: t('privacy.sections.bezpieczenstwo.measures.backups.title'), desc: t('privacy.sections.bezpieczenstwo.measures.backups.desc') },
        { icon: '👤', title: t('privacy.sections.bezpieczenstwo.measures.access.title'), desc: t('privacy.sections.bezpieczenstwo.measures.access.desc') },
        { icon: '📋', title: t('privacy.sections.bezpieczenstwo.measures.audits.title'), desc: t('privacy.sections.bezpieczenstwo.measures.audits.desc') },
      ],
    },
  },
  {
    id: 'odbiorcy',
    icon: Server,
    title: 'Odbiorcy danych',
    color: '#ec4899',
    content: {
      intro: t('privacy.sections.odbiorcy.intro'),
      recipients: [
        { name: 'Google LLC', purpose: t('privacy.sections.odbiorcy.recipients.google.purpose'), country: '🇺🇸 USA' },
        { name: 'Hosting', purpose: t('privacy.sections.odbiorcy.recipients.hosting.purpose'), country: '🇵🇱 Polska' },
        { name: 'Dostawca email', purpose: t('privacy.sections.odbiorcy.recipients.email.purpose'), country: '🇪🇺 UE' },
      ],
      note: t('privacy.sections.odbiorcy.note'),
    },
  },
  {
    id: 'zmiany',
    icon: Clock,
    title: 'Zmiany w polityce',
    color: '#6366f1',
    content: {
      intro: t('privacy.sections.zmiany.intro'),
      methods: t('privacy.sections.zmiany.methods'),
      lastUpdate: CONFIG.lastUpdate,
    },
  },
];

// ============================================
// ANIMATED 3D SHIELD
// ============================================
function AnimatedShield({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const rotateX = useSpring(mouseY * 15, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(mouseX * 15, { stiffness: 150, damping: 20 });

  return (
    <motion.div
      className="relative w-32 h-32"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid rgba(251, 191, 36, ${0.4 - i * 0.1})`,
          }}
          animate={{
            scale: [1 + i * 0.2, 1.4 + i * 0.2, 1 + i * 0.2],
            opacity: [0.4 - i * 0.1, 0.7 - i * 0.1, 0.4 - i * 0.1],
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 4 + i, 
            repeat: Infinity, 
            ease: 'linear',
          }}
        />
      ))}

      {/* Main shield */}
      <motion.div
        className="relative w-full h-full"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Shield body */}
        <motion.div
          className="absolute inset-0 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
            boxShadow: `
              0 20px 60px rgba(251, 191, 36, 0.4),
              inset 0 2px 10px rgba(255,255,255,0.3),
              inset 0 -2px 10px rgba(0,0,0,0.2)
            `,
          }}
          animate={{
            boxShadow: [
              '0 20px 60px rgba(251, 191, 36, 0.4)',
              '0 20px 80px rgba(251, 191, 36, 0.6)',
              '0 20px 60px rgba(251, 191, 36, 0.4)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield className="w-16 h-16 text-black/80" strokeWidth={1.5} />
        </motion.div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ transform: 'translateZ(1px)' }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-yellow-400"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos((i / 8) * Math.PI * 2) * 60],
            y: [0, Math.sin((i / 8) * Math.PI * 2) * 60],
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </motion.div>
  );
}

// ============================================
// NAVIGATION SIDEBAR
// ============================================
function NavigationSidebar({ 
  activeSection, 
  progress, 
  onNavigate,
  sections
}: { 
  activeSection: string; 
  progress: number; 
  onNavigate: (id: string) => void;
  sections: Section[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40"
    >
      <div className="relative">
        {/* Progress line background */}
        <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />
        
        {/* Progress line filled */}
        <motion.div
          className="absolute left-[18px] top-0 w-[2px] bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"
          style={{ height: `${progress}%` }}
        />

        {/* Navigation items */}
        <div className="space-y-4">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const Icon = section.icon;
            
            return (
              <motion.button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className="flex items-center gap-3 group"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                {/* Dot/Icon */}
                <motion.div
                  className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/30' 
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                  animate={isActive ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-gray-500 group-hover:text-white'}`} />
                  
                  {/* Active ring */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-yellow-500"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <motion.span
                  className={`text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'text-yellow-400' : 'text-gray-500 group-hover:text-white'
                  }`}
                  initial={{ opacity: 0, width: 0 }}
                  whileHover={{ opacity: 1, width: 'auto' }}
                >
                  {section.title}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MOBILE NAVIGATION
// ============================================
function MobileNavigation({ 
  activeSection, 
  isOpen,
  onToggle,
  onNavigate,
  sections
}: { 
  activeSection: string;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (id: string) => void;
  sections: Section[];
}) {
  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={onToggle}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
          boxShadow: '0 4px 20px rgba(251,191,36,0.4)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Menu className="w-6 h-6 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={onToggle}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-white/10 rounded-t-3xl z-40 p-6 pb-24 max-h-[70vh] overflow-y-auto"
            >
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
              <h3 className="text-lg font-bold text-white mb-4">Spis treści</h3>
              <div className="space-y-2">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  const Icon = section.icon;
                  
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => {
                        onNavigate(section.id);
                        onToggle();
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-yellow-500/20 border border-yellow-500/30' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ 
                          background: isActive 
                            ? `linear-gradient(135deg, ${section.color} 0%, ${section.color}cc 100%)`
                            : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <span className={`font-medium ${isActive ? 'text-yellow-400' : 'text-gray-300'}`}>
                        {section.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// SECTION CARD
// ============================================
function SectionCard({ 
  section, 
  index,
  isExpanded,
  onToggle,
  t,
}: { 
  section: Section;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  t: (key: string) => string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = section.icon;

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="scroll-mt-24"
    >
      <motion.div
        className={`relative rounded-3xl border overflow-hidden transition-all duration-500 ${
          isExpanded 
            ? 'bg-white/[0.08] border-white/20' 
            : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/15'
        }`}
        layout
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 0% 0%, ${section.color}15 0%, transparent 50%)`,
            opacity: isExpanded ? 1 : 0,
          }}
        />

        {/* Header - always visible */}
        <motion.button
          onClick={onToggle}
          className="w-full p-6 flex items-center gap-5 text-left relative z-10"
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {/* Animated icon */}
          <motion.div
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${section.color} 0%, ${section.color}99 100%)`,
              boxShadow: `0 4px 20px ${section.color}40`,
            }}
            animate={isExpanded ? {
              rotate: [0, -5, 5, 0],
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-7 h-7 text-white" />
            
            {/* Sparkle on expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Title */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{t(`privacy.sectionTitles.${section.id}`) || section.title}</h3>
            <p className="text-sm text-gray-500">
              {isExpanded ? t('privacy.ui.clickToCollapse') : t('privacy.ui.clickToExpand')}
            </p>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </motion.button>

        {/* Content - expandable */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 relative z-10">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                
                <SectionContent section={section} t={t} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// SECTION CONTENT RENDERER
// ============================================
function SectionContent({ section, t }: { section: Section; t: (key: string) => string }) {
  const content = section.content;

  // Administrator
  if (section.id === 'administrator') {
    return (
      <div className="space-y-6">
        <p className="text-gray-400">{content.intro}</p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-white/5 rounded-2xl border border-white/10"
        >
          <p className="text-2xl font-bold text-white mb-1">{content.company}</p>
          <p className="text-gray-400">{content.owner}</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-3">
          {content.contact?.map((item: any, i: number) => {
            const ItemIcon = item.icon;
            return (
              <motion.a
                key={i}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                whileHover={{ y: -2 }}
              >
                <ItemIcon className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="text-sm text-white font-medium truncate">{item.value}</p>
              </motion.a>
            );
          })}
        </div>

        <p className="text-sm text-gray-500 italic">{content.note}</p>
      </div>
    );
  }

  // Zakres danych
  if (section.id === 'zakres') {
    return (
      <div className="space-y-6">
        <p className="text-gray-400">{content.intro}</p>
        
        <div className="grid sm:grid-cols-3 gap-4">
          {content.categories?.map((cat: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 bg-white/5 rounded-2xl border border-white/10"
              whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <h4 className="font-semibold text-white mb-3">{cat.title}</h4>
              <ul className="space-y-2">
                {cat.items.map((item: string, j: number) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Cele przetwarzania
  if (section.id === 'cele') {
    return (
      <div className="space-y-6">
        <p className="text-gray-400">{content.intro}</p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">{t('privacy.ui.purpose')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">{t('privacy.ui.legalBasis')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">{t('privacy.ui.period')}</th>
              </tr>
            </thead>
            <tbody>
              {content.purposes?.map((item: any, i: number) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 text-white font-medium">{item.purpose}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{item.legal}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{item.period}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Cookies
  if (section.id === 'cookies') {
    return (
      <div className="space-y-6">
        <p className="text-gray-400">{content.intro}</p>
        
        <div className="grid sm:grid-cols-2 gap-3">
          {content.types?.map((type: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl border transition-all"
              style={{
                background: `${type.color}10`,
                borderColor: `${type.color}30`,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ background: type.color }}
                />
                <h4 className="font-semibold text-white">{type.name}</h4>
              </div>
              <p className="text-sm text-gray-400 mb-2">{type.desc}</p>
              <p className="text-xs text-gray-600">{t('privacy.ui.examples')}: {type.examples}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl"
        >
          <p className="text-sm text-yellow-200">
            <strong>💡 {t('privacy.ui.tip')}:</strong> {content.note}
          </p>
        </motion.div>
      </div>
    );
  }

  // Prawa RODO
  if (section.id === 'prawa') {
    return (
      <div className="space-y-6">
        <p className="text-gray-400">{content.intro}</p>
        
        <div className="space-y-2">
          {content.rights?.map((right: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ x: 5 }}
            >
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-white">{right.title}</span>
                <span className="text-gray-400"> – {right.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-200">{content.warning}</p>
        </motion.div>
      </div>
    );
  }

  // Bezpieczeństwo
  if (section.id === 'bezpieczenstwo') {
    return (
      <div className="space-y-6">
        <p className="text-gray-400">{content.intro}</p>
        
        <div className="grid sm:grid-cols-3 gap-3">
          {content.measures?.map((measure: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all text-center"
              whileHover={{ y: -3 }}
            >
              <span className="text-3xl mb-2 block">{measure.icon}</span>
              <h4 className="font-semibold text-white text-sm mb-1">{measure.title}</h4>
              <p className="text-xs text-gray-500">{measure.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Odbiorcy
  if (section.id === 'odbiorcy') {
    return (
      <div className="space-y-6">
        <p className="text-gray-400">{content.intro}</p>
        
        <div className="space-y-3">
          {content.recipients?.map((recipient: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 bg-white/5 rounded-xl border border-white/10"
              whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">{recipient.name}</h4>
                <span className="text-sm text-gray-500">{recipient.country}</span>
              </div>
              <p className="text-sm text-gray-400">{recipient.purpose}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-gray-500 italic">{content.note}</p>
      </div>
    );
  }

  // Zmiany
  if (section.id === 'zmiany') {
    return (
      <div className="space-y-6">
        <p className="text-gray-400">{content.intro}</p>
        
        <div className="space-y-2">
          {content.methods?.map((method: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
            >
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <span className="text-gray-300">{method}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-white/5 rounded-xl border border-white/10"
        >
          <p className="text-gray-400">
            <strong className="text-white">{t('privacy.ui.lastUpdate')}:</strong> {content.lastUpdate}
          </p>
        </motion.div>
      </div>
    );
  }

  return null;
}

// ============================================
// GŁÓWNY KOMPONENT
// ============================================
export default function PrivacyPolicyPage() {
  const { language, setLanguage, t } = useLanguage();
  const sections = getSections(t);
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [expandedSections, setExpandedSections] = useState<string[]>([sections[0].id]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    return progress.on('change', (v) => setProgressValue(v));
  }, [progress]);

  // Mouse tracking for hero
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  }, []);

  // Scroll spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Navigate to section
  const navigateToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (!expandedSections.includes(id)) {
        setExpandedSections((prev) => [...prev, id]);
      }
    }
  };

  // Toggle section
  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#0a0a0a]"
      onMouseMove={handleMouseMove}
    >
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Back to home button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 left-4 z-50"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{t('privacy.backToHome')}</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Language switcher */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 z-50"
      >
        <motion.button
          onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center text-gray-300 hover:text-white"
          title={language === 'pl' ? 'Switch to English' : 'Przełącz na Polski'}
        >
          <Globe className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Navigation */}
      <NavigationSidebar 
        activeSection={activeSection} 
        progress={progressValue}
        onNavigate={navigateToSection}
        sections={sections}
      />
      
      <MobileNavigation
        activeSection={activeSection}
        isOpen={mobileNavOpen}
        onToggle={() => setMobileNavOpen(!mobileNavOpen)}
        onNavigate={navigateToSection}
        sections={sections}
      />

      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              y: [0, -20, 0],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', damping: 15 }}
              className="flex justify-center mb-8"
            >
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <img
                    src="/image/logo_svg_jasne.svg"
                    alt="Logo"
                    className="w-48 md:w-64 h-auto"
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Animated Shield */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <AnimatedShield mouseX={mousePosition.x} mouseY={mousePosition.y} />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-gradient">{t('privacy.title')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              {t('privacy.subtitle')}
            </motion.p>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500"
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t('privacy.update')}: {CONFIG.lastUpdate}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {CONFIG.companyName}
              </span>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-6 mt-10"
            >
              {[
                { label: t('privacy.sectionsLabel'), value: sections.length },
                { label: t('privacy.rights'), value: '7' },
                { label: t('privacy.cookieTypes'), value: '4' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.p
                    className="text-3xl font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto lg:ml-48 space-y-6">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                section={section}
                index={index}
                isExpanded={expandedSections.includes(section.id)}
                onToggle={() => toggleSection(section.id)}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('privacy.questions')}
            </h2>
            <p className="text-gray-400 mb-8">
              {t('privacy.questionsDesc')}
            </p>
            <motion.a
              href={`mailto:${CONFIG.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-black"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
                boxShadow: '0 4px 20px rgba(251,191,36,0.3)',
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 4px 30px rgba(251,191,36,0.5)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              {t('privacy.writeToMe')}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Back to top */}
      <AnimatePresence>
        {progressValue > 20 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-20 lg:right-4 z-40 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}