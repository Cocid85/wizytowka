'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Palette, Code, Rocket, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const steps = [
  {
    icon: FileText,
    title: 'Brief',
    description: 'Omawiamy Twoje potrzeby, cele i wymagania. Ustalamy zakres projektu.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500',
    shadowColor: 'shadow-amber-500/30',
  },
  {
    icon: Palette,
    title: 'Projekt',
    description: "Tworzę mockupy, wireframe'y i planuję architekturę rozwiązania.",
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500',
    shadowColor: 'shadow-orange-500/30',
  },
  {
    icon: Code,
    title: 'Rozwój',
    description: 'Piszę kod, implementuję funkcjonalności i testuję rozwiązanie.',
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-500',
    shadowColor: 'shadow-red-500/30',
  },
  {
    icon: Rocket,
    title: 'Wdrożenie',
    description: 'Deploy, optymalizacja i wsparcie po wdrożeniu. Projekt gotowy!',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500',
    shadowColor: 'shadow-rose-500/30',
  },
];

export default function ProcessSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Animacja kroków po kolei - zapętlona
  useEffect(() => {
    if (!inView) return;

    let isCancelled = false;

    const animateSteps = async () => {
      while (!isCancelled) {
        // Reset na początek
        setActiveStep(-1);
        setCompletedSteps([]);
        
        // Krótka pauza przed startem
        await new Promise((resolve) => setTimeout(resolve, 500));

        for (let i = 0; i < steps.length; i++) {
          if (isCancelled) return;
          
          await new Promise((resolve) => setTimeout(resolve, 800));
          setActiveStep(i);
          
          if (i > 0) {
            setCompletedSteps((prev) => [...prev, i - 1]);
          }
        }
        
        // Oznacz ostatni jako ukończony
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (isCancelled) return;
        setCompletedSteps((prev) => [...prev, steps.length - 1]);
        
        // Czekaj 4 sekundy przed powtórzeniem
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    };

    animateSteps();

    return () => {
      isCancelled = true;
    };
  }, [inView]);

  return (
    <section id="proces" className="py-24 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Nagłówek */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Jak wygląda współpraca?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Prosty, przejrzysty proces od pomysłu do gotowego produktu
          </p>
        </motion.div>

        {/* Desktop - Timeline poziomy */}
        <div className="hidden lg:block max-w-5xl mx-auto">
          {/* Linia łącząca */}
          <div className="relative mb-8">
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-800 rounded-full" />
            <motion.div
              className="absolute top-6 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 via-red-500 to-rose-500 rounded-full"
              initial={{ width: '0%' }}
              animate={inView ? { width: `${(Math.max(0, activeStep) / (steps.length - 1)) * 100}%` } : {}}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Punkty na linii */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const isCompleted = completedSteps.includes(index);
                const isPast = activeStep > index;

                return (
                  <motion.div
                    key={step.title}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 300 }}
                    className="flex flex-col items-center"
                  >
                    {/* Punkt / Ikona */}
                    <motion.div
                      animate={
                        isActive
                          ? { scale: [1, 1.2, 1], boxShadow: ['0 0 0 0 rgba(251, 191, 36, 0)', '0 0 0 12px rgba(251, 191, 36, 0.3)', '0 0 0 0 rgba(251, 191, 36, 0)'] }
                          : {}
                      }
                      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isCompleted
                          ? 'bg-green-500 shadow-lg shadow-green-500/30'
                          : isActive
                          ? `bg-gradient-to-br ${step.color} shadow-lg ${step.shadowColor}`
                          : isPast
                          ? `bg-gradient-to-br ${step.color} opacity-60`
                          : 'bg-gray-800 border-2 border-gray-700'
                      }`}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <CheckCircle className="w-6 h-6 text-white" />
                        </motion.div>
                      ) : (
                        <step.icon className={`w-5 h-5 ${isActive || isPast ? 'text-white' : 'text-gray-500'}`} />
                      )}
                    </motion.div>

                    {/* Etykieta */}
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`mt-3 text-sm font-medium transition-colors duration-300 ${
                        isActive ? 'text-white' : isCompleted || isPast ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Karty z opisami */}
          <div className="grid grid-cols-4 gap-6 mt-12">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const isCompleted = completedSteps.includes(index);
              const isVisible = activeStep >= index;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative p-6 rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? 'bg-white/5 border-white/20 shadow-xl'
                      : isCompleted
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-transparent border-gray-800/50'
                  }`}
                >
                  {/* Numer kroku */}
                  <span
                    className={`text-5xl font-black transition-colors duration-300 ${
                      isActive ? 'text-white/10' : 'text-gray-800'
                    }`}
                  >
                    0{index + 1}
                  </span>

                  {/* Opis */}
                  <p
                    className={`mt-2 text-sm leading-relaxed transition-colors duration-300 ${
                      isActive ? 'text-gray-300' : isCompleted ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {step.description}
                  </p>

                  {/* Badge aktywności */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <span className="flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500" />
                      </span>
                    </motion.div>
                  )}

                  {/* Checkmark dla ukończonych */}
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile - Timeline pionowy */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="relative">
            {/* Linia pionowa */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-800" />
            <motion.div
              className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-amber-500 via-orange-500 via-red-500 to-rose-500"
              initial={{ height: '0%' }}
              animate={inView ? { height: `${(Math.max(0, activeStep + 1) / steps.length) * 100}%` } : {}}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Kroki */}
            <div className="space-y-8">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const isCompleted = completedSteps.includes(index);
                const isVisible = activeStep >= index;

                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex gap-6"
                  >
                    {/* Punkt */}
                    <motion.div
                      animate={
                        isActive
                          ? { scale: [1, 1.2, 1] }
                          : {}
                      }
                      transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isCompleted
                          ? 'bg-green-500'
                          : isActive
                          ? `bg-gradient-to-br ${step.color}`
                          : 'bg-gray-800 border-2 border-gray-700'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <step.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      )}
                    </motion.div>

                    {/* Treść */}
                    <div className={`flex-1 pb-8 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-30'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold text-lg ${isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-500'}`}>
                          {step.title}
                        </h3>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="px-2 py-0.5 text-xs font-medium bg-amber-500/20 text-amber-400 rounded-full"
                          >
                            W trakcie
                          </motion.span>
                        )}
                      </div>
                      <p className={`text-sm ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA na końcu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={completedSteps.length === steps.length ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.div
            animate={
              completedSteps.length === steps.length
                ? { scale: [1, 1.02, 1] }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full"
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">
              Regularne aktualizacje i transparentna komunikacja na każdym etapie
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}