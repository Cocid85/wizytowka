'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles, ExternalLink } from 'lucide-react';
import { ProjectWizardModal } from '@/components/ProjectWizard';

// Tech stack badges
const techStack = [
  { name: 'React', color: '#61DAFB', x: -20, y: -15 },
  { name: 'Next.js', color: '#ffffff', x: 15, y: -25 },
  { name: 'Flutter', color: '#02569B', x: 25, y: 10 },
  { name: 'TypeScript', color: '#3178C6', x: -25, y: 20 },
  { name: 'Node.js', color: '#339933', x: 5, y: 30 },
];

const codeSnippet = `const developer = {
  name: "Twój Partner Tech",
  skills: ["React", "Next.js", "Flutter"],
  available: true,
  
  createProject(idea) {
    return transformToReality(idea);
  }
};`;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Transform mouse position to rotation/movement
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);
  const moveX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const moveY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Glitch effect trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)',
            x: moveX,
            y: moveY,
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
            x: useTransform(moveX, (v) => -v * 0.5),
            y: useTransform(moveY, (v) => -v * 0.5),
          }}
          animate={{
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating particles */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00ff41]/60 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm text-gray-300">Dostępny do nowych projektów</span>
            </motion.div>

            {/* Main heading with glitch effect */}
            <div className="relative mb-6">
              <motion.h1
                className={`text-5xl md:text-7xl font-black leading-tight ${glitchActive ? 'glitch' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="block text-white">Tworzę</span>
                <span className="relative inline-block">
                  <span className="text-gradient bg-gradient-to-r from-white via-red-500 to-[#00ff41] bg-clip-text text-transparent">
                    aplikacje
                  </span>
                  {/* Glitch layers */}
                  {glitchActive && (
                    <>
                      <span 
                        className="absolute inset-0 text-gradient bg-gradient-to-r from-[#00ff41] to-green-500 bg-clip-text text-transparent"
                        style={{ transform: 'translate(-2px, -2px)', opacity: 0.8 }}
                      >
                        aplikacje
                      </span>
                      <span 
                        className="absolute inset-0 text-gradient bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                        style={{ transform: 'translate(2px, 2px)', opacity: 0.8 }}
                      >
                        aplikacje
                      </span>
                    </>
                  )}
                </span>
                <span className="block text-white">
                  które <span className="text-[#00ff41]">działają</span>
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-400 mb-6 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Przekształcam pomysły w <span className="text-white font-medium">nowoczesne aplikacje</span> mobilne 
              i webowe. Od koncepcji po wdrożenie.
            </motion.p>

            {/* Personal introduction */}
            <motion.div
              className="mb-8 p-4 rounded-xl bg-gradient-to-r from-red-500/10 via-white/5 to-[#00ff41]/10 border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-lg text-white leading-relaxed">
                Nazywam się <span className="font-bold text-red-400">Michał Szymanowski</span> i{' '}
                <span className="text-[#00ff41] font-semibold">stworzę dla Ciebie coś wyjątkowego</span>.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.button
                onClick={() => setIsWizardOpen(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-white text-center overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Rozpocznij projekt
                  <ArrowDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-[#00ff41]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.a
                href="#portfolio"
                className="px-8 py-4 rounded-xl font-semibold text-white text-center border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Zobacz realizacje
              </motion.a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              className="flex gap-8 mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {[
                { value: '5+', label: 'Lat doświadczenia' },
                { value: '100%', label: 'Satysfakcji' },
              ].map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - 3D Card with code */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
            style={{ perspective: '1000px' }}
          >
            {/* Main 3D card */}
            <motion.div
              className="relative"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Code window */}
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Window header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/20">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-white" />
                    <div className="w-3 h-3 rounded-full bg-[#00ff41]" />
                  </div>
                  <span className="text-xs text-gray-500 ml-2 font-mono">developer.ts</span>
                </div>
                
                {/* Code content */}
                <div className="p-6 font-mono text-sm">
                  <pre className="text-gray-300">
                    {codeSnippet.split('\n').map((line, i) => {
                      // Parse line into tokens with syntax highlighting
                      const parseLine = (text: string) => {
                        const parts: Array<{ text: string; className?: string }> = [];
                        let remaining = text;
                        
                        // Match patterns in order of specificity
                        const patterns = [
                          { regex: /(const|return)\b/g, className: 'text-red-400' },
                          { regex: /(".*?")/g, className: 'text-[#00ff41]' },
                          { regex: /(\[.*?\])/g, className: 'text-white' },
                          { regex: /(true|false)\b/g, className: 'text-red-500' },
                          { regex: /(createProject|transformToReality)\b/g, className: 'text-[#00ff41]' },
                        ];
                        
                        let lastIndex = 0;
                        const matches: Array<{ start: number; end: number; className: string }> = [];
                        
                        patterns.forEach(({ regex, className }) => {
                          let match;
                          regex.lastIndex = 0;
                          while ((match = regex.exec(remaining)) !== null) {
                            matches.push({
                              start: match.index,
                              end: match.index + match[0].length,
                              className,
                            });
                          }
                        });
                        
                        // Sort matches by start position
                        matches.sort((a, b) => a.start - b.start);
                        
                        // Remove overlapping matches (keep first)
                        const filteredMatches: typeof matches = [];
                        for (const match of matches) {
                          const overlaps = filteredMatches.some(
                            m => (match.start < m.end && match.end > m.start)
                          );
                          if (!overlaps) {
                            filteredMatches.push(match);
                          }
                        }
                        
                        // Build parts array
                        filteredMatches.forEach((match) => {
                          if (lastIndex < match.start) {
                            parts.push({ text: remaining.slice(lastIndex, match.start) });
                          }
                          parts.push({ 
                            text: remaining.slice(match.start, match.end), 
                            className: match.className 
                          });
                          lastIndex = match.end;
                        });
                        
                        if (lastIndex < remaining.length) {
                          parts.push({ text: remaining.slice(lastIndex) });
                        }
                        
                        return parts.length > 0 ? parts : [{ text: remaining }];
                      };
                      
                      const parts = parseLine(line);
                      
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="leading-relaxed"
                        >
                          <span className="text-gray-600 mr-4 select-none">{i + 1}</span>
                          {parts.map((part, j) => (
                            <span key={j} className={part.className}>
                              {part.text}
                            </span>
                          ))}
                        </motion.div>
                      );
                    })}
                  </pre>
                </div>

                {/* Terminal output */}
                <div className="px-6 pb-6">
                  <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-green-400 text-xs font-mono">
                      <span className="text-gray-500">$</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        npm run create-awesome-project
                      </motion.span>
                      <motion.span
                        className="inline-block w-2 h-4 bg-green-400 ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating tech badges */}
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="absolute px-3 py-1.5 rounded-full bg-gray-900/90 backdrop-blur-sm border border-white/10 text-xs font-medium text-white shadow-lg"
                  style={{
                    top: `${20 + tech.y}%`,
                    left: tech.x < 0 ? `${-5 + tech.x}%` : 'auto',
                    right: tech.x > 0 ? `${-5 - tech.x}%` : 'auto',
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(40px)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <span className="flex items-center gap-1.5">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: tech.color }}
                    />
                    {tech.name}
                  </span>
                </motion.div>
              ))}

              {/* Glow effect behind card */}
              <div 
                className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-white/10 to-[#00ff41]/20 rounded-3xl blur-2xl -z-10"
                style={{ transform: 'translateZ(-50px)' }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs uppercase tracking-widest">Przewiń</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* CSS for glitch effect */}
      <style jsx>{`
        .glitch {
          animation: glitch 0.2s ease-in-out;
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
        }
      `}</style>

      {/* Project Wizard Modal */}
      <ProjectWizardModal 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />
    </section>
  );
}