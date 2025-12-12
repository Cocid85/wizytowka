'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  FileText, 
  Users, 
  Calendar,
  CreditCard,
  Image as ImageIcon,
  MessageSquare,
  BarChart3,
  Bell,
  Lock,
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
  Loader2,
  Sparkles,
  Building2,
  Briefcase,
  Heart,
  Music,
  Utensils,
  Dumbbell,
  GraduationCap,
  Camera,
  Palette,
  X
} from 'lucide-react';

// ============================================
// TYPY
// ============================================
interface WizardData {
  projectType: 'website' | 'app' | null;
  websiteType: string | null;
  appType: string | null;
  features: string[];
  budget: string | null;
  timeline: string | null;
  name: string;
  email: string;
  description: string;
}

interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

// ============================================
// OPCJE DO WYBORU
// ============================================
const websiteTypes = [
  { id: 'landing', label: 'Landing Page', desc: 'Jedna strona promująca produkt/usługę', icon: FileText },
  { id: 'business', label: 'Firmowa', desc: 'Prezentacja firmy, usług, zespołu', icon: Building2 },
  { id: 'portfolio', label: 'Portfolio', desc: 'Prezentacja prac i projektów', icon: Palette },
  { id: 'blog', label: 'Blog', desc: 'Artykuły, wpisy, aktualności', icon: MessageSquare },
  { id: 'ecommerce', label: 'Sklep online', desc: 'Sprzedaż produktów online', icon: ShoppingCart },
  { id: 'booking', label: 'Z rezerwacjami', desc: 'Umawianie wizyt, kalendarz', icon: Calendar },
];

const appTypes = [
  { id: 'business', label: 'Biznesowa', desc: 'Zarządzanie firmą, CRM, ERP', icon: Briefcase },
  { id: 'booking', label: 'Rezerwacje', desc: 'Umawianie wizyt, kalendarz', icon: Calendar },
  { id: 'ecommerce', label: 'E-commerce', desc: 'Sklep, płatności, koszyk', icon: ShoppingCart },
  { id: 'social', label: 'Społecznościowa', desc: 'Profile, posty, interakcje', icon: Users },
  { id: 'fitness', label: 'Fitness/Sport', desc: 'Treningi, postępy, plany', icon: Dumbbell },
  { id: 'education', label: 'Edukacyjna', desc: 'Kursy, lekcje, quizy', icon: GraduationCap },
];

const websiteFeatures = [
  { id: 'gallery', label: 'Galeria zdjęć', icon: ImageIcon },
  { id: 'contact', label: 'Formularz kontaktowy', icon: MessageSquare },
  { id: 'blog', label: 'Blog / Aktualności', icon: FileText },
  { id: 'booking', label: 'System rezerwacji', icon: Calendar },
  { id: 'payments', label: 'Płatności online', icon: CreditCard },
  { id: 'accounts', label: 'Konta użytkowników', icon: Users },
  { id: 'analytics', label: 'Statystyki / Analytics', icon: BarChart3 },
  { id: 'multilang', label: 'Wiele języków', icon: Globe },
];

const appFeatures = [
  { id: 'accounts', label: 'Konta użytkowników', icon: Users },
  { id: 'payments', label: 'Płatności online', icon: CreditCard },
  { id: 'notifications', label: 'Powiadomienia push', icon: Bell },
  { id: 'calendar', label: 'Kalendarz / Rezerwacje', icon: Calendar },
  { id: 'chat', label: 'Czat / Wiadomości', icon: MessageSquare },
  { id: 'gallery', label: 'Galeria / Media', icon: ImageIcon },
  { id: 'stats', label: 'Dashboard / Statystyki', icon: BarChart3 },
  { id: 'offline', label: 'Tryb offline', icon: Lock },
];

const budgetOptions = [
  { id: 'small', label: '2-5 tys. zł', desc: 'Prosty projekt' },
  { id: 'medium', label: '5-15 tys. zł', desc: 'Średni projekt' },
  { id: 'large', label: '15-30 tys. zł', desc: 'Rozbudowany projekt' },
  { id: 'enterprise', label: '30+ tys. zł', desc: 'Duży projekt' },
  { id: 'unknown', label: 'Nie wiem jeszcze', desc: 'Pomóż mi oszacować' },
];

const timelineOptions = [
  { id: 'asap', label: 'Jak najszybciej', desc: '2-4 tygodnie' },
  { id: 'month', label: '1-2 miesiące', desc: 'Standardowy czas' },
  { id: 'quarter', label: '2-3 miesiące', desc: 'Rozbudowany projekt' },
  { id: 'flexible', label: 'Elastyczny termin', desc: 'Bez pośpiechu' },
];

// ============================================
// KOMPONENTY KROKÓW
// ============================================

// Krok 1: Typ projektu
function StepProjectType({ data, updateData, onNext }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Co chcesz stworzyć?</h3>
        <p className="text-gray-400">Wybierz typ projektu</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: 'website', label: 'Stronę WWW', desc: 'Strona internetowa, landing page, sklep', icon: Globe },
          { id: 'app', label: 'Aplikację', desc: 'Aplikacja mobilna lub webowa', icon: Smartphone },
        ].map((option) => (
          <motion.button
            key={option.id}
            onClick={() => {
              updateData({ projectType: option.id as 'website' | 'app' });
              setTimeout(onNext, 300);
            }}
            className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
              data.projectType === option.id
                ? 'border-red-500 bg-red-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
              data.projectType === option.id
                ? 'bg-gradient-to-br from-red-500 to-red-600'
                : 'bg-white/10'
            }`}>
              <option.icon className={`w-7 h-7 ${
                data.projectType === option.id ? 'text-white' : 'text-gray-400'
              }`} />
            </div>
            <h4 className="text-xl font-semibold text-white mb-1">{option.label}</h4>
            <p className="text-sm text-gray-400">{option.desc}</p>
            
            {data.projectType === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Krok 2: Typ strony / aplikacji
function StepSpecificType({ data, updateData, onNext, onBack }: StepProps) {
  const options = data.projectType === 'website' ? websiteTypes : appTypes;
  const currentValue = data.projectType === 'website' ? data.websiteType : data.appType;
  const updateKey = data.projectType === 'website' ? 'websiteType' : 'appType';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          Jaki typ {data.projectType === 'website' ? 'strony' : 'aplikacji'}?
        </h3>
        <p className="text-gray-400">Wybierz najbliższy opis</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => {
              updateData({ [updateKey]: option.id });
              setTimeout(onNext, 300);
            }}
            className={`relative p-4 rounded-xl border text-left transition-all ${
              currentValue === option.id
                ? 'border-red-500 bg-red-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                currentValue === option.id
                  ? 'bg-gradient-to-br from-red-500 to-red-600'
                  : 'bg-white/10'
              }`}>
                <option.icon className={`w-5 h-5 ${
                  currentValue === option.id ? 'text-white' : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">{option.label}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{option.desc}</p>
              </div>
            </div>
            
            {currentValue === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Krok 3: Funkcjonalności
function StepFeatures({ data, updateData, onNext, onBack }: StepProps) {
  const features = data.projectType === 'website' ? websiteFeatures : appFeatures;

  const toggleFeature = (featureId: string) => {
    const current = data.features;
    const updated = current.includes(featureId)
      ? current.filter(f => f !== featureId)
      : [...current, featureId];
    updateData({ features: updated });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Jakie funkcje potrzebujesz?</h3>
        <p className="text-gray-400">Wybierz wszystkie pasujące (opcjonalne)</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {features.map((feature) => {
          const isSelected = data.features.includes(feature.id);
          return (
            <motion.button
              key={feature.id}
              onClick={() => toggleFeature(feature.id)}
              className={`relative p-4 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                isSelected
                  ? 'bg-gradient-to-br from-red-500 to-red-600'
                  : 'bg-white/10'
              }`}>
                <feature.icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <p className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                {feature.label}
              </p>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          Pomiń ten krok →
        </button>
      </div>
    </div>
  );
}

// Krok 4: Budżet i termin
function StepBudgetTimeline({ data, updateData, onNext, onBack }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Budżet i termin</h3>
        <p className="text-gray-400">Pomoże mi lepiej dopasować ofertę</p>
      </div>

      {/* Budżet */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Orientacyjny budżet
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {budgetOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => updateData({ budget: option.id })}
              className={`p-3 rounded-xl border text-left transition-all ${
                data.budget === option.id
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <p className={`font-semibold text-sm ${
                data.budget === option.id ? 'text-red-400' : 'text-white'
              }`}>
                {option.label}
              </p>
              <p className="text-xs text-gray-500">{option.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Termin */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Kiedy potrzebujesz?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {timelineOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => updateData({ timeline: option.id })}
              className={`p-3 rounded-xl border text-left transition-all ${
                data.timeline === option.id
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <p className={`font-semibold text-sm ${
                data.timeline === option.id ? 'text-red-400' : 'text-white'
              }`}>
                {option.label}
              </p>
              <p className="text-xs text-gray-500">{option.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Krok 5: Dane kontaktowe i opis
function StepContact({ data, updateData, onNext, onBack }: StepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!data.name || !data.email) return;
    
    setIsSubmitting(true);
    
    try {
      // Wysyłanie briefu do API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: `BRIEF PROJEKTU:\n\nTyp: ${data.projectType === 'website' ? 'Strona WWW' : 'Aplikacja'}\n${data.projectType === 'website' ? `Typ strony: ${websiteTypes.find(w => w.id === data.websiteType)?.label || 'Nie wybrano'}` : `Typ aplikacji: ${appTypes.find(a => a.id === data.appType)?.label || 'Nie wybrano'}`}\n\nFunkcje: ${data.features.length > 0 ? data.features.join(', ') : 'Brak'}\nBudżet: ${budgetOptions.find(b => b.id === data.budget)?.label || 'Nie wybrano'}\nTermin: ${timelineOptions.find(t => t.id === data.timeline)?.label || 'Nie wybrano'}\n\nOpis projektu:\n${data.description || 'Brak opisu'}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Błąd podczas wysyłania');
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      setIsSubmitting(false);
      onNext();
    } catch (error) {
      console.error('Error submitting brief:', error);
      setIsSubmitting(false);
      alert('Wystąpił błąd. Spróbuj ponownie.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Ostatni krok!</h3>
        <p className="text-gray-400">Jak mogę się z Tobą skontaktować?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Imię i nazwisko *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            placeholder="Jan Kowalski"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            placeholder="jan@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Opisz swój projekt (opcjonalnie)
          </label>
          <textarea
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
            placeholder="Opowiedz więcej o swoim pomyśle, inspiracjach, oczekiwaniach..."
          />
        </div>
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={!data.name || !data.email || isSubmitting}
        className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: !data.name || !data.email || isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: !data.name || !data.email || isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Wysyłanie...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Wyślij brief
          </>
        )}
      </motion.button>
    </div>
  );
}

// Krok 6: Sukces
function StepSuccess({ data }: { data: WizardData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00ff41] to-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00ff41]/30"
      >
        <Check className="w-10 h-10 text-black" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-white mb-2">
        Dziękuję, {data.name.split(' ')[0]}!
      </h3>
      <p className="text-gray-400 mb-6">
        Otrzymałem Twój brief. Odezwę się w ciągu 24 godzin.
      </p>
      
      {/* Podsumowanie */}
      <div className="text-left bg-white/5 rounded-xl p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Typ projektu:</span>
          <span className="text-white">{data.projectType === 'website' ? 'Strona WWW' : 'Aplikacja'}</span>
        </div>
        {data.features.length > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-500">Funkcje:</span>
            <span className="text-white">{data.features.length} wybranych</span>
          </div>
        )}
        {data.budget && (
          <div className="flex justify-between">
            <span className="text-gray-500">Budżet:</span>
            <span className="text-white">
              {budgetOptions.find(b => b.id === data.budget)?.label}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// GŁÓWNY KOMPONENT
// ============================================
export default function ProjectWizard({ onClose }: { onClose?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<WizardData>({
    projectType: null,
    websiteType: null,
    appType: null,
    features: [],
    budget: null,
    timeline: null,
    name: '',
    email: '',
    description: '',
  });

  const updateData = (updates: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const goNext = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const goBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const stepProps = { data, updateData, onNext: goNext, onBack: goBack };

  return (
    <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-white/10 p-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">Nowy projekt</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Progress bar */}
        {currentStep < totalSteps && (
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-red-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && <StepProjectType {...stepProps} />}
            {currentStep === 1 && <StepSpecificType {...stepProps} />}
            {currentStep === 2 && <StepFeatures {...stepProps} />}
            {currentStep === 3 && <StepBudgetTimeline {...stepProps} />}
            {currentStep === 4 && <StepContact {...stepProps} />}
            {currentStep === 5 && <StepSuccess data={data} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer navigation */}
      {currentStep > 0 && currentStep < 5 && (
        <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-white/10 p-4 flex justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Wstecz
          </button>
          
          {currentStep < 4 && (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              Dalej
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// MODAL WRAPPER
// ============================================
export function ProjectWizardModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectWizard onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

