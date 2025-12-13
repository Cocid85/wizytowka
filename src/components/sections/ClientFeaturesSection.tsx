'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  User, 
  Calendar, 
  Image as ImageIcon, 
  BarChart3, 
  Bell, 
  CreditCard,
  MessageSquare,
  Settings,
  ChevronRight,
  Check
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortDesc: string;
  description: string;
  benefits: string[];
  mockup: React.ReactNode;
}

const features = [
  { id: 'dashboard', icon: BarChart3 },
  { id: 'reservations', icon: Calendar },
  { id: 'gallery', icon: ImageIcon },
  { id: 'payments', icon: CreditCard },
  { id: 'users', icon: User },
  { id: 'notifications', icon: Bell },
  { id: 'chat', icon: MessageSquare },
  { id: 'settings', icon: Settings },
];

// ============================================
// MOCKUPY KOMPONENTÓW
// ============================================

function DashboardMockup({ t }: { t: (key: string) => string }) {
  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { key: 'users', value: '2,847', change: '+12%' },
          { key: 'revenue', value: '48.2k', change: '+8%' },
          { key: 'conversion', value: '3.2%', change: '+2%' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 rounded-xl p-3"
          >
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t(`features.mockups.dashboard.${stat.key}`)}</div>
            <div className="text-xl font-bold text-white mt-1">{stat.value}</div>
            <div className="text-[10px] text-green-400">{stat.change}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Chart */}
      <div className="bg-white/5 rounded-xl p-4">
        <div className="text-xs text-gray-400 mb-3">{t('features.mockups.dashboard.revenueLast7Days')}</div>
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-red-500/80 to-red-500/20 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
          {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => <span key={d}>{d}</span>)}
        </div>
      </div>
    </div>
  );
}

function ReservationsMockup({ t }: { t: (key: string) => string }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const bookedDays = [5, 6, 12, 13, 14, 20, 21, 27];
  
  return (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-white">Grudzień 2024</div>
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs text-gray-400">‹</div>
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs text-gray-400">›</div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
          {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => (
            <div key={d} className="text-gray-500 py-1">{d}</div>
          ))}
          {/* Empty cells for offset */}
          {[...Array(6)].map((_, i) => <div key={`empty-${i}`} />)}
          {days.map(day => (
            <motion.div
              key={day}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: day * 0.01 }}
              className={`aspect-square rounded flex items-center justify-center text-xs cursor-pointer transition-colors ${
                bookedDays.includes(day)
                  ? 'bg-red-500/30 text-red-400'
                  : 'hover:bg-white/10 text-gray-400'
              }`}
            >
              {day}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bg-white/5 rounded-xl p-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-white">{t('features.mockups.reservations.nextReservation')}</div>
            <div className="text-xs text-gray-500">12 gru, 14:00 - Jan Kowalski</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryMockup({ t }: { t: (key: string) => string }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${
              ['from-red-500 to-red-600',
               'from-blue-500 to-cyan-500',
               'from-purple-500 to-pink-500',
               'from-green-500 to-emerald-500',
               'from-red-500 to-rose-500',
               'from-indigo-500 to-violet-500'][i]
            } opacity-70`} />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2">
        {['all', 'portfolio', 'projects'].map((tab, i) => (
          <div
            key={tab}
            className={`px-3 py-1 rounded-full text-[10px] ${
              i === 0 ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-gray-500'
            }`}
          >
            {t(`features.mockups.gallery.${tab}`)}
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsMockup({ t }: { t: (key: string) => string }) {
  return (
    <div className="space-y-4">
      {/* Card mockup */}
      <motion.div
        initial={{ rotateY: -10, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 relative overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="text-[10px] text-gray-400 mb-6">VISA</div>
        <div className="text-lg text-white font-mono tracking-wider mb-4">•••• •••• •••• 4242</div>
        <div className="flex justify-between text-[10px] text-gray-500">
          <span>JAN KOWALSKI</span>
          <span>12/28</span>
        </div>
      </motion.div>
      
      {/* Recent transactions */}
      <div className="space-y-2">
        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t('features.mockups.payments.recentTransactions')}</div>
        {[
          { name: 'Subskrypcja Pro', amount: '-99 PLN', status: 'success' },
          { name: 'Doładowanie', amount: '+500 PLN', status: 'success' },
        ].map((tx, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center justify-between bg-white/5 rounded-lg p-2"
          >
            <div className="text-xs text-gray-300">{tx.name}</div>
            <div className={`text-xs ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-gray-400'}`}>
              {tx.amount}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function UserPanelMockup() {
  return (
    <div className="space-y-4">
      {/* Profile header */}
      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-lg font-bold text-white">
          JK
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white">Jan Kowalski</div>
          <div className="text-[10px] text-gray-500">jan@example.com</div>
        </div>
        <div className="px-2 py-1 bg-green-500/20 rounded text-[10px] text-green-400">
          Pro
        </div>
      </div>
      
      {/* Menu items */}
      <div className="space-y-1">
        {[
          { label: 'Mój profil', icon: User },
          { label: 'Ustawienia', icon: Settings },
          { label: 'Powiadomienia', icon: Bell },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors"
          >
            <item.icon className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
            <span className="text-xs text-gray-400 flex-1">{item.label}</span>
            <ChevronRight className="w-3 h-3 text-gray-600" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function NotificationsMockup() {
  return (
    <div className="space-y-2">
      {[
        { title: 'Nowa rezerwacja', desc: 'Jan K. zarezerwował termin', time: '2 min', unread: true },
        { title: 'Płatność otrzymana', desc: '+299 PLN za subskrypcję', time: '1 godz', unread: true },
        { title: 'Nowy komentarz', desc: 'Anna dodała opinię', time: '3 godz', unread: false },
      ].map((notif, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
            notif.unread ? 'bg-red-500/10' : 'bg-white/5'
          }`}
        >
          <div className={`w-2 h-2 rounded-full mt-1.5 ${notif.unread ? 'bg-red-400' : 'bg-gray-600'}`} />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white">{notif.title}</div>
            <div className="text-[10px] text-gray-500 truncate">{notif.desc}</div>
          </div>
          <div className="text-[10px] text-gray-600">{notif.time}</div>
        </motion.div>
      ))}
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-3 mb-3">
        {[
          { own: false, text: 'Dzień dobry! W czym mogę pomóc?' },
          { own: true, text: 'Chciałbym zapytać o możliwość...' },
          { own: false, text: 'Oczywiście, z przyjemnością wyjaśnię.' },
        ].map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex ${msg.own ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-[11px] ${
              msg.own
                ? 'bg-red-500 text-white rounded-br-sm'
                : 'bg-white/10 text-gray-300 rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1 bg-white/5 rounded-full px-4 py-2 text-[11px] text-gray-500">
          Napisz wiadomość...
        </div>
        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
          <ChevronRight className="w-4 h-4 text-black" />
        </div>
      </div>
    </div>
  );
}

function SettingsMockup() {
  return (
    <div className="space-y-3">
      {[
        { label: 'Powiadomienia email', enabled: true },
        { label: 'Powiadomienia push', enabled: true },
        { label: 'Dwuskładnikowe 2FA', enabled: false },
        { label: 'Tryb ciemny', enabled: true },
      ].map((setting, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
        >
          <span className="text-xs text-gray-400">{setting.label}</span>
          <div className={`w-8 h-5 rounded-full p-0.5 transition-colors ${
            setting.enabled ? 'bg-red-500' : 'bg-gray-700'
          }`}>
            <motion.div
              className="w-4 h-4 rounded-full bg-white shadow-sm"
              animate={{ x: setting.enabled ? 12 : 0 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// GŁÓWNY KOMPONENT
// ============================================

export default function ClientFeaturesSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFeature, setActiveFeature] = useState(features[0]);
  
  // Helper function to get feature data with translations
  const getFeatureData = (id: string) => ({
    id,
    icon: features.find(f => f.id === id)?.icon || BarChart3,
    title: t(`features.items.${id}.title`),
    shortDesc: t(`features.items.${id}.shortDesc`),
    description: t(`features.items.${id}.description`),
    benefits: [
      t(`features.items.${id}.benefits.0`),
      t(`features.items.${id}.benefits.1`),
      t(`features.items.${id}.benefits.2`),
      t(`features.items.${id}.benefits.3`),
    ],
    mockup: getMockupComponent(id, t),
  });
  
  const getMockupComponent = (id: string, t: (key: string) => string) => {
    switch(id) {
      case 'dashboard': return <DashboardMockup t={t} />;
      case 'reservations': return <ReservationsMockup t={t} />;
      case 'gallery': return <GalleryMockup t={t} />;
      case 'payments': return <PaymentsMockup t={t} />;
      case 'users': return <UserPanelMockup />;
      case 'notifications': return <NotificationsMockup />;
      case 'chat': return <ChatMockup />;
      case 'settings': return <SettingsMockup />;
      default: return <DashboardMockup t={t} />;
    }
  };
  
  const activeFeatureData = getFeatureData(activeFeature.id);

  return (
    <section id="funkcjonalnosci" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00ff41]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 mb-6"
          >
            {t('features.badge')}
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('features.title')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Main content - Feature showcase */}
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 max-w-6xl mx-auto">
          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            {features.map((feature, index) => {
              const isActive = activeFeature.id === feature.id;
              const Icon = feature.icon;

              return (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-red-500/20 to-red-600/10 border border-red-500/30'
                      : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-300'}`}>
                      {t(`features.items.${feature.id}.title`)}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{t(`features.items.${feature.id}.shortDesc`)}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-all ${
                    isActive ? 'text-red-400 translate-x-1' : 'text-gray-600'
                  }`} />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Feature preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-white/[0.07] to-white/[0.03] rounded-2xl border border-white/10 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-8"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <activeFeatureData.icon className="w-7 h-7 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{activeFeatureData.title}</h3>
                    <p className="text-gray-400 text-sm">{activeFeatureData.description}</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {activeFeatureData.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <Check className="w-4 h-4 text-[#00ff41] flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Mockup */}
                <div className="bg-black/30 rounded-xl p-4 border border-white/5 min-h-[280px]">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-[10px] text-gray-600">app.example.com/{activeFeature.id}</span>
                    </div>
                  </div>
                  {activeFeatureData.mockup}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-4">
            {t('features.bottomText')}
          </p>
          <motion.a
            href="#kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('features.cta')}
            <ChevronRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}