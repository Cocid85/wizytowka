'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Sparkles } from 'lucide-react';
import ParticlesBackground from '@/components/ParticlesBackground';

const codeLines = [
  'const developer = {',
  '  skills: ["React", "Next.js", "Flutter"],',
  '  passion: "tworzenie aplikacji",',
  '  motto: "code with purpose"',
  '};',
];

export default function HeroSection() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const line = codeLines[currentLine];
    let charIndex = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (charIndex < line.length) {
        setDisplayedText(line.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentLine((prev) => (prev + 1) % codeLines.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentLine]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Particles background */}
      <ParticlesBackground />
      
      {/* Animated background */}
      <div className="absolute inset-0 code-bg opacity-30" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
            }}
            animate={{
              y: typeof window !== 'undefined' ? [null, Math.random() * window.innerHeight] : 0,
              x: typeof window !== 'undefined' ? [null, Math.random() * window.innerWidth] : 0,
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Dostępny do projektów</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Tworzę aplikacje</span>
              <br />
              <span className="text-white">i strony internetowe</span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Przekształcam pomysły w działające aplikacje mobilne i nowoczesne strony WWW.
              <br />
              <span className="text-purple-400">Kod, który ma znaczenie.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#kontakt"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold text-white text-center glow-purple"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Rozpocznijmy projekt
              </motion.a>
              <motion.a
                href="#portfolio"
                className="px-8 py-4 glass rounded-lg font-semibold text-white text-center border border-purple-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Zobacz portfolio
              </motion.a>
            </div>
          </motion.div>

          {/* Right side - Code animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-lg p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-500 ml-4">terminal</span>
              </div>
              <div className="space-y-2">
                {codeLines.map((line, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-purple-400 mr-2">$</span>
                    <span className={index === currentLine ? 'text-cyan-400' : 'text-gray-400'}>
                      {index === currentLine ? displayedText : line}
                      {index === currentLine && (
                        <span className="terminal-cursor text-cyan-400">|</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
}

