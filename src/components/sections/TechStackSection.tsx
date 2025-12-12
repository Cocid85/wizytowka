'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import React from 'react';

// Prawdziwe ikony SVG dla technologii
const techIcons: Record<string, React.ReactElement> = {
  nextjs: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.127zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
    </svg>
  ),
  flutter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  firebase: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z" />
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.283.283 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.24v10.15c0 .099.053.19.139.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15a1.86 1.86 0 0 1-.924 1.604l-8.795 5.078c-.28.163-.6.247-.924.247zm2.715-6.997c-3.857 0-4.662-1.772-4.662-3.261 0-.14.114-.254.256-.254h1.137c.127 0 .233.092.253.216.172 1.168.686 1.758 3.016 1.758 1.856 0 2.646-.42 2.646-1.404 0-.567-.224-.988-3.107-1.271-2.41-.239-3.901-.77-3.901-2.696 0-1.776 1.498-2.835 4.01-2.835 2.821 0 4.216.978 4.394 3.08a.256.256 0 0 1-.253.283h-1.143a.253.253 0 0 1-.246-.207c-.274-1.217-.938-1.607-2.752-1.607-2.027 0-2.264.707-2.264 1.237 0 .643.279.83 3.013 1.193 2.708.36 3.994.868 3.994 2.762 0 1.917-1.598 3.016-4.39 3.016z" />
    </svg>
  ),
  dart: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643-.302-.267-.567-.468-1.07-.462-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z" />
    </svg>
  ),
};

// Dane technologii z poziomem i opisem
const technologies = [
  // Główne - duże karty
  { 
    name: 'Next.js', 
    icon: 'nextjs', 
    color: '#000000',
    textColor: '#ffffff',
    level: 95,
    description: 'Framework React dla produkcji',
    size: 'large',
    category: 'framework'
  },
  { 
    name: 'React', 
    icon: 'react', 
    color: '#61DAFB',
    textColor: '#000000',
    level: 95,
    description: 'Biblioteka UI',
    size: 'large',
    category: 'framework'
  },
  { 
    name: 'Flutter', 
    icon: 'flutter', 
    color: '#02569B',
    textColor: '#ffffff',
    level: 90,
    description: 'Cross-platform mobile',
    size: 'large',
    category: 'framework'
  },
  // Średnie
  { 
    name: 'TypeScript', 
    icon: 'typescript', 
    color: '#3178C6',
    textColor: '#ffffff',
    level: 92,
    description: 'Typowany JavaScript',
    size: 'medium',
    category: 'language'
  },
  { 
    name: 'Tailwind', 
    icon: 'tailwind', 
    color: '#06B6D4',
    textColor: '#ffffff',
    level: 95,
    description: 'Utility-first CSS',
    size: 'medium',
    category: 'styling'
  },
  { 
    name: 'Firebase', 
    icon: 'firebase', 
    color: '#FFCA28',
    textColor: '#000000',
    level: 88,
    description: 'Backend as a Service',
    size: 'medium',
    category: 'backend'
  },
  { 
    name: 'Node.js', 
    icon: 'nodejs', 
    color: '#339933',
    textColor: '#ffffff',
    level: 85,
    description: 'JavaScript runtime',
    size: 'medium',
    category: 'backend'
  },
  { 
    name: 'Dart', 
    icon: 'dart', 
    color: '#0175C2',
    textColor: '#ffffff',
    level: 88,
    description: 'Język dla Flutter',
    size: 'medium',
    category: 'language'
  },
];

export default function TechStackSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden">
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
            💻 Technologie
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Narzędzia, które wykorzystuję do tworzenia nowoczesnych aplikacji
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
            {technologies.map((tech, index) => {
              const isLarge = tech.size === 'large';
              const isMedium = tech.size === 'medium';
              const isHovered = hoveredTech === tech.name;

              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08,
                    type: 'spring',
                    stiffness: 100
                  }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className={`
                    relative rounded-3xl overflow-hidden cursor-pointer
                    ${isLarge ? 'col-span-2 row-span-2' : ''}
                    ${isMedium ? 'col-span-1 row-span-1' : ''}
                  `}
                  style={{ 
                    perspective: '1000px',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{ backgroundColor: tech.color }}
                    animate={{
                      scale: isHovered ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 rounded-3xl" />

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{ 
                      boxShadow: `0 0 60px ${tech.color}50`,
                    }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative h-full p-5 flex flex-col justify-between z-10">
                    {/* Icon */}
                    <motion.div
                      className={`${isLarge ? 'w-16 h-16' : 'w-10 h-10'}`}
                      style={{ color: tech.textColor }}
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? [0, -5, 5, 0] : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {techIcons[tech.icon] || (
                        <div className="w-full h-full rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                          ⚡
                        </div>
                      )}
                    </motion.div>

                    {/* Text content */}
                    <div>
                      <h3 
                        className={`font-bold ${isLarge ? 'text-2xl' : 'text-lg'}`}
                        style={{ color: tech.textColor }}
                      >
                        {tech.name}
                      </h3>
                      
                      {isLarge && (
                        <motion.p
                          className="text-sm mt-1 opacity-80"
                          style={{ color: tech.textColor }}
                          animate={{
                            opacity: isHovered ? 1 : 0.7,
                          }}
                        >
                          {tech.description}
                        </motion.p>
                      )}

                      {/* Skill level bar - only on large */}
                      {isLarge && (
                        <div className="mt-3">
                          <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: tech.textColor }}
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${tech.level}%` } : {}}
                              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                            />
                          </div>
                          <div 
                            className="text-xs mt-1 opacity-60"
                            style={{ color: tech.textColor }}
                          >
                            {tech.level}%
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Floating particles for large cards */}
                  {isLarge && isHovered && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{ 
                            backgroundColor: tech.textColor,
                            left: `${20 + i * 15}%`,
                            bottom: '10%',
                          }}
                          initial={{ y: 0, opacity: 0 }}
                          animate={{ 
                            y: -100 - Math.random() * 50, 
                            opacity: [0, 0.6, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.1,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Additional tools - compact pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">Oraz wiele innych narzędzi:</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {['Framer Motion', 'Zod', 'React Hook Form', 'Prisma', 'tRPC', 'Zustand', 'React Query', 'Supabase', 'Vercel', 'GitHub Actions'].map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + i * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 cursor-default transition-colors"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}