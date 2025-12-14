'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Shield, 
  Settings, 
  Check, 
  ChevronDown,
  ExternalLink,
  BarChart3,
  Target,
  Cog,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// ============================================
// TYPY
// ============================================
interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: number;
  version: string;
}

// ============================================
// KONFIGURACJA
// ============================================
const CONSENT_VERSION = '1.0';
const CONSENT_STORAGE_KEY = 'cookie_consent';

const getCookieCategories = (t: (key: string) => string) => [
  { id: 'necessary' as const, name: t('cookie.categories.necessary.name'), desc: t('cookie.categories.necessary.description'), icon: Shield, required: true, color: '#22c55e' },
  { id: 'analytics' as const, name: t('cookie.categories.analytics.name'), desc: t('cookie.categories.analytics.description'), icon: BarChart3, required: false, color: '#3b82f6' },
  { id: 'functional' as const, name: t('cookie.categories.functional.name'), desc: t('cookie.categories.functional.description'), icon: Cog, required: false, color: '#a855f7' },
  { id: 'marketing' as const, name: t('cookie.categories.marketing.name'), desc: t('cookie.categories.marketing.description'), icon: Target, required: false, color: '#f97316' },
];

// ============================================
// HELPERS
// ============================================
const getStoredConsent = (): CookieConsent | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    const consent = JSON.parse(stored) as CookieConsent;
    if (consent.version !== CONSENT_VERSION) return null;
    return consent;
  } catch { return null; }
};

const saveConsent = (consent: CookieConsent): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
};

// ============================================
// 3D COOKIE Z MOUSE TRACKING
// ============================================
function Cookie3D({ mouseX, mouseY, isHovered }: { mouseX: number; mouseY: number; isHovered: boolean }) {
  const rotateX = useSpring(useTransform(useMotionValue(mouseY), [-1, 1], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(useMotionValue(mouseX), [-1, 1], [-15, 15]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    rotateX.set(mouseY * 20);
    rotateY.set(mouseX * 20);
  }, [mouseX, mouseY, rotateX, rotateY]);

  return (
    <motion.div
      className="relative w-28 h-28"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Outer glow rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid rgba(251, 191, 36, ${0.3 - i * 0.1})`,
          }}
          animate={{
            scale: [1 + i * 0.15, 1.3 + i * 0.15, 1 + i * 0.15],
            opacity: [0.5 - i * 0.15, 0.8 - i * 0.15, 0.5 - i * 0.15],
          }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Main cookie with 3D rotation */}
      <motion.div
        className="relative w-full h-full rounded-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Cookie shadow */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-black/30 blur-md"
          animate={{ 
            scaleX: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.4 : 0.3,
          }}
        />

        {/* Cookie body - multiple layers for depth */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Base layer */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(145deg, #fcd34d 0%, #f59e0b 40%, #d97706 80%, #b45309 100%)',
              boxShadow: `
                inset 0 4px 20px rgba(255,255,255,0.4),
                inset 0 -4px 20px rgba(0,0,0,0.2),
                0 10px 40px rgba(245,158,11,0.5)
              `,
            }}
          />
          
          {/* Texture overlay */}
          <div 
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, transparent 0%, rgba(139,69,19,0.3) 100%)`,
            }}
          />

          {/* Cracks pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
            <path d="M20 50 Q40 35 50 50 T80 50" stroke="#78350f" strokeWidth="1" fill="none" />
            <path d="M35 70 Q50 60 65 70" stroke="#78350f" strokeWidth="0.8" fill="none" />
            <path d="M45 25 Q50 35 55 25" stroke="#78350f" strokeWidth="0.6" fill="none" />
          </svg>
        </div>

        {/* Chocolate chips with 3D effect */}
        {[
          { x: 25, y: 28, size: 14, z: 8 },
          { x: 55, y: 22, size: 10, z: 6 },
          { x: 72, y: 45, size: 12, z: 7 },
          { x: 40, y: 58, size: 11, z: 6 },
          { x: 22, y: 55, size: 9, z: 5 },
          { x: 62, y: 68, size: 10, z: 6 },
          { x: 48, y: 38, size: 8, z: 4 },
        ].map((chip, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: chip.size,
              height: chip.size,
              left: `${chip.x}%`,
              top: `${chip.y}%`,
              transform: `translate(-50%, -50%) translateZ(${chip.z}px)`,
              background: `linear-gradient(145deg, #5c3d2e 0%, #3d2516 50%, #2d1810 100%)`,
              boxShadow: `
                inset 0 2px 4px rgba(255,255,255,0.2),
                inset 0 -2px 4px rgba(0,0,0,0.4),
                0 2px 4px rgba(0,0,0,0.3)
              `,
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 200 }}
          />
        ))}

        {/* Shine highlight */}
        <motion.div
          className="absolute top-4 left-5 w-8 h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)',
            filter: 'blur(2px)',
          }}
          animate={{
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Secondary shine */}
        <motion.div
          className="absolute top-8 left-10 w-3 h-3 rounded-full bg-white/50"
          style={{ filter: 'blur(1px)' }}
        />
      </motion.div>

      {/* Floating crumbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            background: '#d97706',
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 80],
            y: [0, -20 - Math.random() * 40],
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </motion.div>
  );
}

// ============================================
// ANIMATED WAVE BACKGROUND
// ============================================
function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -15, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            background: ['#fbbf24', '#f97316', '#22c55e', '#3b82f6'][i % 4],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [-20, -50, -20],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// CATEGORY CARD WITH MICRO-ANIMATIONS
// ============================================
function CategoryCard({ 
  category, 
  enabled, 
  onToggle, 
  index,
  t
}: { 
  category: ReturnType<typeof getCookieCategories>[0];
  enabled: boolean;
  onToggle: () => void;
  index: number;
  t: (key: string) => string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className={`relative p-4 rounded-2xl border backdrop-blur-sm overflow-hidden cursor-pointer transition-colors ${
          enabled
            ? 'bg-white/10 border-white/20'
            : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
        }`}
        onClick={category.required ? undefined : onToggle}
        animate={{
          rotateY: isHovered && !category.required ? 2 : 0,
          rotateX: isHovered && !category.required ? -2 : 0,
        }}
        whileTap={category.required ? {} : { scale: 0.98 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated background glow */}
        <AnimatePresence>
          {enabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 -z-10"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${category.color}20 0%, transparent 70%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)',
          }}
          animate={{ x: isHovered ? '200%' : '-100%' }}
          transition={{ duration: 0.6 }}
        />

        <div className="flex items-center gap-4">
          {/* Icon with pulse effect */}
          <motion.div
            className="relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: enabled
                ? `linear-gradient(135deg, ${category.color} 0%, ${category.color}cc 100%)`
                : 'rgba(255,255,255,0.1)',
              boxShadow: enabled ? `0 4px 20px ${category.color}40` : 'none',
            }}
            animate={enabled ? {
              boxShadow: [
                `0 4px 20px ${category.color}40`,
                `0 4px 30px ${category.color}60`,
                `0 4px 20px ${category.color}40`,
              ],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className={`w-5 h-5 ${enabled ? 'text-white' : 'text-gray-400'}`} />
            
            {/* Sparkle on enabled */}
            {enabled && (
              <motion.div
                className="absolute -top-1 -right-1"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </motion.div>
            )}
          </motion.div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${enabled ? 'text-white' : 'text-gray-300'}`}>
                {category.name}
              </span>
              {category.required && (
                <motion.span
                  className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-green-500/20 text-green-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t('cookie.required').toUpperCase()}
                </motion.span>
              )}
            </div>
            <span className="text-xs text-gray-500">{category.desc}</span>
          </div>

          {/* Toggle */}
          <motion.div
            className={`relative w-14 h-8 rounded-full ${category.required ? 'opacity-60' : 'cursor-pointer'}`}
            style={{
              background: enabled
                ? `linear-gradient(90deg, ${category.color} 0%, ${category.color}cc 100%)`
                : '#374151',
              boxShadow: enabled ? `0 0 20px ${category.color}40` : 'none',
            }}
            whileHover={category.required ? {} : { scale: 1.05 }}
            whileTap={category.required ? {} : { scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
              animate={{ left: enabled ? 30 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {enabled && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="w-3 h-3" style={{ color: category.color }} />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// SUCCESS CELEBRATION
// ============================================
function SuccessCelebration({ t }: { t: (key: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: 'rgba(10,10,10,0.95)' }}
    >
      {/* Confetti explosion */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 8 + Math.random() * 12,
            height: 8 + Math.random() * 12,
            background: ['#fbbf24', '#22c55e', '#3b82f6', '#f43f5e', '#a855f7', '#f97316'][i % 6],
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            left: '50%',
            top: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0.8],
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 300,
            rotate: Math.random() * 720,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.2 + Math.random() * 0.5, ease: 'easeOut' }}
        />
      ))}

      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
        className="relative mb-6"
      >
        {/* Pulsing rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border-2 border-green-500"
            animate={{
              scale: [1, 1.5 + ring * 0.2],
              opacity: [0.6, 0],
            }}
            transition={{ duration: 1, delay: ring * 0.15, repeat: 2 }}
          />
        ))}
        
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
            boxShadow: '0 10px 40px rgba(34,197,94,0.5)',
          }}
          animate={{
            boxShadow: [
              '0 10px 40px rgba(34,197,94,0.5)',
              '0 10px 60px rgba(34,197,94,0.7)',
              '0 10px 40px rgba(34,197,94,0.5)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-white mb-2"
      >
        {t('cookie.saved')}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400"
      >
        {t('cookie.savedMessage')}
      </motion.p>
    </motion.div>
  );
}

// ============================================
// GŁÓWNY KOMPONENT
// ============================================
export default function CookieBanner() {
  const { language, setLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  });

  const cookieCategories = getCookieCategories(t);

  // Mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
    } else {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (acceptAll: boolean) => {
    const newConsent: CookieConsent = {
      necessary: true,
      analytics: acceptAll ? true : consent.analytics,
      marketing: acceptAll ? true : consent.marketing,
      functional: acceptAll ? true : consent.functional,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    
    saveConsent(newConsent);
    setShowSuccess(true);
    
    setTimeout(() => setIsVisible(false), 2500);
  };

  const toggleCategory = (id: keyof Omit<CookieConsent, 'timestamp' | 'version'>) => {
    if (id === 'necessary') return;
    setConsent(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const enabledCount = cookieCategories.filter(c => consent[c.id]).length;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Backdrop with animated blur */}
          <motion.div
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(12px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 bg-black/70"
          />

          {/* Main banner */}
          <motion.div
            ref={bannerRef}
            initial={{ scale: 0.8, y: 100, rotateX: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full max-w-xl"
            style={{ perspective: 1000 }}
          >
            {/* Animated border */}
            <motion.div
              className="absolute -inset-[2px] rounded-3xl overflow-hidden"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  background: 'conic-gradient(from 0deg, #fbbf24, #f97316, #ef4444, #f97316, #fbbf24)',
                }}
              />
            </motion.div>

            {/* Card with 3D tilt */}
            <motion.div
              className="relative bg-gray-900 rounded-3xl overflow-hidden"
              style={{
                rotateX: isHovered ? mousePosition.y * -5 : 0,
                rotateY: isHovered ? mousePosition.x * 5 : 0,
                transformStyle: 'preserve-3d',
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
              <WaveBackground />

              {/* Success overlay */}
              <AnimatePresence>
                {showSuccess && <SuccessCelebration t={t} />}
              </AnimatePresence>

              {/* Content */}
              <div className="relative p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  <Cookie3D 
                    mouseX={mousePosition.x} 
                    mouseY={mousePosition.y} 
                    isHovered={isHovered}
                  />
                  
                  <div className="text-center sm:text-left flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl sm:text-3xl font-bold text-white"
                      >
                        {t('cookie.title')}{' '}
                        <span className="text-gradient">{t('cookie.titleHighlight')}</span>
                      </motion.h2>
                      
                      {/* Language switcher */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-4 w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center text-gray-300 hover:text-white"
                        title={language === 'pl' ? 'Switch to English' : 'Przełącz na Polski'}
                      >
                        <Globe className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-400"
                    >
                      {t('cookie.description')}
                      {' '}
                      <a 
                        href="/polityka-prywatnosci" 
                        className="text-yellow-400 hover:text-yellow-300 ml-1 inline-flex items-center gap-1"
                      >
                        {t('cookie.privacyPolicy')} <ExternalLink className="w-3 h-3" />
                      </a>
                    </motion.p>

                    {/* Stats badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-white/5 rounded-full border border-white/10"
                    >
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-sm text-gray-400">
                        <span className="text-white font-semibold">{enabledCount}</span>/{cookieCategories.length} {t('cookie.active')}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Categories */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden mb-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {cookieCategories.map((cat, i) => (
                          <CategoryCard
                            key={cat.id}
                            category={cat}
                            enabled={consent[cat.id]}
                            onToggle={() => toggleCategory(cat.id)}
                            index={i}
                            t={t}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    onClick={() => setShowSettings(!showSettings)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    {t('cookie.customize')}
                    <motion.div animate={{ rotate: showSettings ? 180 : 0 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.button>

                  <motion.button
                    onClick={() => handleAccept(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium"
                  >
                      {t('cookie.onlyNecessary')}
                  </motion.button>

                  <motion.button
                    onClick={() => handleAccept(true)}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 40px rgba(34,197,94,0.5)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex-1 px-5 py-3 rounded-xl font-semibold text-white overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                      boxShadow: '0 4px 25px rgba(34,197,94,0.4)',
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                        {t('cookie.acceptAll')}
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// FLOATING BUTTON
// ============================================
export function CookieSettingsButton() {
  const { t } = useLanguage();
  const [hasConsent, setHasConsent] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setHasConsent(!!getStoredConsent());
  }, []);

  if (!hasConsent) return null;

  return (
    <motion.button
      onClick={() => {
        localStorage.removeItem(CONSENT_STORAGE_KEY);
        window.location.reload();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
        boxShadow: isHovered 
          ? '0 0 30px rgba(251,191,36,0.6)' 
          : '0 4px 20px rgba(251,191,36,0.3)',
      }}
    >
      <motion.span
        className="text-2xl"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        🍪
      </motion.span>

      {/* Pulse */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-yellow-400"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-full ml-3 px-3 py-2 bg-gray-900 rounded-xl text-white text-sm whitespace-nowrap border border-white/10"
          >
            {t('cookie.settings')}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ============================================
// HOOK
// ============================================
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  useEffect(() => { setConsent(getStoredConsent()); }, []);
  return {
    consent,
    hasAnalytics: consent?.analytics ?? false,
    hasMarketing: consent?.marketing ?? false,
    hasFunctional: consent?.functional ?? false,
    hasConsent: !!consent,
  };
}