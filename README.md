# Wizytówka - Landing Page

Elegancka strona-wizytówka dla usług tworzenia aplikacji i stron internetowych.

## 🚀 Funkcjonalności

- **Hero Section** - Animowana sekcja powitalna z efektem terminala
- **Usługi** - Karty z oferowanymi usługami (Aplikacje mobilne, Strony WWW, Systemy webowe, Integracje API)
- **Tech Stack** - Automatycznie generowana sekcja z technologiami znalezionymi w projektach
- **Portfolio** - Showcase zrealizowanych projektów z prawdziwymi snippety kodu
- **Proces** - Wizualizacja procesu współpracy (Brief → Projekt → Rozwój → Wdrożenie)
- **Kontakt** - Formularz kontaktowy z walidacją

## 🛠️ Technologie

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- React Hook Form + Zod
- React Intersection Observer

## 📦 Instalacja

```bash
npm install
```

## 🏃 Uruchomienie

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start
```

## 🔧 Generowanie Tech Stack

Aby zaktualizować listę technologii na podstawie analizy projektów:

```bash
npm run analyze-tech
```

Skrypt automatycznie skanuje projekty w workspace i generuje `src/data/technologies.json`.

## 🎨 Styl

- Ciemny motyw (dark mode)
- Gradienty fiolet/niebieski/zielony
- Animacje przy scrollu
- Efekty glassmorphism
- Mobile-first, responsywna

## 📝 Struktura projektu

```
Wizytówka/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── ServicesSection.tsx
│   │       ├── TechStackSection.tsx
│   │       ├── PortfolioSection.tsx
│   │       ├── ProcessSection.tsx
│   │       └── ContactSection.tsx
│   └── data/
│       ├── technologies.json
│       └── portfolio.json
└── scripts/
    └── analyze-technologies.js
```

## 📧 Kontakt

Zaktualizuj dane kontaktowe w `src/components/sections/ContactSection.tsx` i `src/components/Footer.tsx`.

