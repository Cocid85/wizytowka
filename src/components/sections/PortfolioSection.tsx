'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Code2, CheckCircle2 } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import { useState } from 'react';
import TiltCard from '@/components/TiltCard';
import CodeBlock from '@/components/CodeBlock';

export default function PortfolioSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Rzeczywiste projekty z prawdziwym kodem
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => (
            <TiltCard key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-xl overflow-hidden"
              >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                  <Code2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-300 mb-2">Funkcjonalności:</p>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="text-sm text-gray-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li className="text-sm text-gray-500">
                        +{project.features.length - 3} więcej...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Code Snippet */}
                <button
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  className="w-full text-left"
                >
                  <CodeBlock
                    code={
                      expandedProject === project.id
                        ? project.codeSnippet.code
                        : project.codeSnippet.code.split('\n').slice(0, 5).join('\n') + '\n...'
                    }
                    language={project.codeSnippet.language}
                    filename={project.codeSnippet.file}
                  />
                  {project.codeSnippet.code.split('\n').length > 5 && (
                    <p className="text-purple-400 text-xs mt-2 text-center">
                      {expandedProject === project.id ? 'Zwiń' : 'Rozwiń kod'}
                    </p>
                  )}
                </button>
              </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

