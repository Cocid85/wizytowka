'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MessageSquare, CheckCircle2, Loader2, Phone, Clock, Copy, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  email: z.string().email('Nieprawidłowy adres email'),
  message: z.string().min(10, 'Wiadomość musi mieć co najmniej 10 znaków'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Komponent formularza - renderowany w każdej ćwiartce
function FormContent({ 
  register, 
  errors, 
  isSubmitting, 
  foldState,
  onSubmit,
}: {
  register: ReturnType<typeof useForm<ContactFormData>>['register'];
  errors: ReturnType<typeof useForm<ContactFormData>>['formState']['errors'];
  isSubmitting: boolean;
  foldState: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 space-y-6 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 h-full"
      suppressHydrationWarning
    >
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
          Imię i nazwisko
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          disabled={foldState !== 'idle'}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
          placeholder="Jan Kowalski"
          suppressHydrationWarning
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          disabled={foldState !== 'idle'}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
          placeholder="jan@example.com"
          suppressHydrationWarning
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
          Wiadomość
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          disabled={foldState !== 'idle'}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none disabled:opacity-50"
          placeholder="Opisz swój projekt..."
          suppressHydrationWarning
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting || foldState !== 'idle'}
        className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isSubmitting || foldState !== 'idle' ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting || foldState !== 'idle' ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Wysyłanie...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Wyślij wiadomość
          </>
        )}
      </motion.button>
    </form>
  );
}

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [foldState, setFoldState] = useState<'idle' | 'folding' | 'folded' | 'success'>('idle');
  const [formHeight, setFormHeight] = useState(520);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Zmierz wysokość formularza
  useEffect(() => {
    if (formContainerRef.current && foldState === 'idle') {
      setFormHeight(formContainerRef.current.offsetHeight);
    }
  }, [foldState]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Zmierz wysokość przed składaniem
      if (formContainerRef.current) {
        setFormHeight(formContainerRef.current.offsetHeight);
      }
      
      // Wysyłanie formularza do API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Błąd podczas wysyłania wiadomości');
      }

      // Animacja składania koperty
      setFoldState('folding');
      
      setTimeout(() => {
        setFoldState('folded');
      }, 1800);
      
      setTimeout(() => {
        setFoldState('success');
        setSubmitStatus('success');
        reset();
        toast.success('Wiadomość została wysłana pomyślnie!');
      }, 2800);
      
      setTimeout(() => {
        setFoldState('idle');
        setSubmitStatus('idle');
      }, 11000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setFoldState('idle');
      toast.error(error instanceof Error ? error.message : 'Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  // Konfiguracja dla każdej ćwiartki karty - składanie DO ŚRODKA jak koperta
  // Origin na ZEWNĘTRZNEJ krawędzi, rotacja W KIERUNKU środka
  const quarters = [
    {
      // Górna-lewa - origin na górze-lewo, zgina się DO środka (w dół-prawo)
      clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
      origin: 'top left',
      foldRotateX: -140,  // przód idzie w dół
      foldRotateY: 140,   // przód idzie w prawo
      delay: 0,
    },
    {
      // Górna-prawa - origin na górze-prawo, zgina się DO środka (w dół-lewo)
      clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',
      origin: 'top right',
      foldRotateX: -140,  // przód idzie w dół
      foldRotateY: -140,  // przód idzie w lewo
      delay: 0.15,
    },
    {
      // Dolna-prawa - origin na dole-prawo, zgina się DO środka (w górę-lewo)
      clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
      origin: 'bottom right',
      foldRotateX: 140,   // przód idzie w górę
      foldRotateY: -140,  // przód idzie w lewo
      delay: 0.3,
    },
    {
      // Dolna-lewa - origin na dole-lewo, zgina się DO środka (w górę-prawo)
      clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
      origin: 'bottom left',
      foldRotateX: 140,   // przód idzie w górę
      foldRotateY: 140,   // przód idzie w prawo
      delay: 0.45,
    },
  ];

  return (
    <section id="kontakt" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Kontakt</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Masz projekt? Porozmawiajmy o tym, jak mogę pomóc
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info - Efektowna wersja */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Główna karta z danymi */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-white/20 to-[#00ff41] rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="relative glass rounded-2xl p-8 border border-white/10 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '32px 32px',
                  }} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-8 relative">
                  Dane kontaktowe
                  <motion.div 
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-red-500 to-[#00ff41] rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: '80px' } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                </h3>

                <div className="space-y-6 relative">
                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="group/item"
                  >
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-red-500/30"
                         onClick={() => copyToClipboard('ms.akademiaair@gmail.com', 'email')}>
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Mail className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-400 mb-1">Email</p>
                        <p className="text-white font-medium truncate group-hover/item:text-red-400 transition-colors">
                          ms.akademiaair@gmail.com
                        </p>
                      </div>
                      <motion.div
                        className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {copiedField === 'email' ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400 group-hover/item:text-white transition-colors" />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Telefon */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="group/item"
                  >
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-[#00ff41]/30"
                         onClick={() => copyToClipboard('+48 691 409 400', 'phone')}>
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00ff41] to-green-500 flex items-center justify-center shadow-lg shadow-[#00ff41]/20"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Phone className="w-6 h-6 text-black" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-400 mb-1">Telefon</p>
                        <p className="text-white font-medium group-hover/item:text-[#00ff41] transition-colors">
                          +48 691 409 400
                        </p>
                      </div>
                      <motion.div
                        className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {copiedField === 'phone' ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400 group-hover/item:text-white transition-colors" />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Czas odpowiedzi */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-transparent">
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/20"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Clock className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-1">Czas odpowiedzi</p>
                        <p className="text-white font-medium">Do 24 godzin</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-xs text-green-400">Online</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Dodatkowa karta - preferowany kontakt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-xl p-6 border border-white/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Preferuję email</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Najszybciej odpowiadam na wiadomości email. Telefon rezerwuję dla pilnych spraw.
                    Opisz swój projekt w formularzu, a odezwę się z propozycją.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-[#00ff41]/10 border border-red-500/20"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-white"
                  >
                    {['M', 'A', 'K'][i-1]}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">Zaufali mi klienci</p>
                <p className="text-xs text-gray-400">Dołącz do grona zadowolonych</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#00ff41]">100%</p>
                <p className="text-xs text-gray-400">satysfakcji</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form z efektem składania */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
            style={{
              perspective: '1200px',
              perspectiveOrigin: 'center center',
              minHeight: formHeight,
            }}
          >
            <AnimatePresence mode="wait">
              {/* IDLE - normalny formularz */}
              {foldState === 'idle' && (
                <motion.div
                  key="idle-form"
                  ref={formContainerRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl border border-white/10 overflow-hidden"
                >
                  <FormContent
                    register={register}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    foldState={foldState}
                    onSubmit={handleFormSubmit}
                  />
                </motion.div>
              )}

              {/* FOLDING / FOLDED - 4 ćwiartki */}
              {(foldState === 'folding' || foldState === 'folded') && (
                <motion.div
                  key="folding-form"
                  className="absolute inset-0"
                  style={{
                    transformStyle: 'preserve-3d',
                    height: formHeight,
                  }}
                  animate={
                    foldState === 'folded'
                      ? {
                          scale: 0.05,
                          y: -150,
                          opacity: 0,
                          rotateX: 45,
                        }
                      : {
                          scale: 1,
                          y: 0,
                          opacity: 1,
                          rotateX: 0,
                        }
                  }
                  transition={{
                    duration: 0.8,
                    delay: foldState === 'folded' ? 0.3 : 0,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  }}
                >
                  {quarters.map((quarter, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      style={{
                        clipPath: quarter.clipPath,
                        transformStyle: 'preserve-3d',
                        transformOrigin: quarter.origin,
                      }}
                      initial={{
                        rotateX: 0,
                        rotateY: 0,
                      }}
                      animate={{
                        rotateX: quarter.foldRotateX,
                        rotateY: quarter.foldRotateY,
                      }}
                      transition={{
                        duration: 1.2,
                        delay: quarter.delay,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      }}
                    >
                      {/* Przednia strona - zawartość formularza */}
                      <div 
                        className="absolute inset-0 rounded-xl border border-white/10 overflow-hidden"
                        style={{
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <FormContent
                          register={register}
                          errors={errors}
                          isSubmitting={isSubmitting}
                          foldState={foldState}
                          onSubmit={handleFormSubmit}
                        />
                      </div>
                      
                      {/* Tylna strona - złoty gradient jak koperta */}
                      <div
                        className="absolute inset-0 rounded-xl overflow-hidden"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-red-500 via-red-600 to-black">
                          {/* Tekstura papieru */}
                          <div 
                            className="absolute inset-0 opacity-30 mix-blend-overlay"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                            }}
                          />
                          {/* Subtelne linie */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/50" />
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/20" />
                            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/50" />
                            <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-black/20" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Cień */}
                  <motion.div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-black/50 blur-2xl rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              )}

              {/* SUCCESS */}
              {foldState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                  {/* Glow */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.6, 0.4] }}
                    transition={{ duration: 1 }}
                    className="absolute w-64 h-64 bg-gradient-to-r from-red-500/30 via-[#00ff41]/30 to-white/20 blur-3xl rounded-full"
                  />

                  {/* Checkmark */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.6,
                      delay: 0.2,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}
                    className="relative mb-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-green-500/50">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-green-400 rounded-full blur-xl -z-10"
                    />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl md:text-4xl font-bold mb-3"
                  >
                    <span className="bg-gradient-to-r from-white via-red-500 to-[#00ff41] bg-clip-text text-transparent">
                      Wiadomość wysłana!
                    </span>
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-gray-300 mb-2"
                  >
                    Dziękuję za wiadomość
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-400"
                  >
                    Odezwę się wkrótce!
                  </motion.p>

                  {/* Particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(16)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: ['#fbbf24', '#10b981', '#34d399', '#f59e0b'][i % 4],
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        animate={{
                          x: Math.cos((i / 16) * Math.PI * 2) * 120,
                          y: Math.sin((i / 16) * Math.PI * 2) * 120,
                          opacity: [0, 1, 0],
                          scale: [0, 1.2, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 0.3 + i * 0.05,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {submitStatus === 'error' && foldState === 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm"
              >
                Wystąpił błąd. Spróbuj ponownie lub skontaktuj się bezpośrednio przez email.
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}