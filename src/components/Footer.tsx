'use client';

import { Code2, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-yellow-400" />
              <span className="text-xl font-bold text-gradient">{'<Dev />'}</span>
            </div>
            <p className="text-gray-400 text-sm">
              Tworzę aplikacje i strony internetowe z pasją do kodu i dbałością o szczegóły.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Szybkie linki</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#uslugi" className="text-gray-400 hover:text-white transition-colors">
                  Usługi
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="text-gray-400 hover:text-white transition-colors">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#kontakt" className="text-gray-400 hover:text-white transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Social</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-yellow-500/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:kontakt@example.com"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Wszystkie prawa zastrzeżone. Zbudowane z Next.js i ❤️</p>
        </div>
      </div>
    </footer>
  );
}

