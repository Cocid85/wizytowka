const fs = require('fs');
const path = require('path');

const PROJECTS = [
  '../aplikacja-mobilna-samoobrona',
  '../gosia_strona',
  '../strona_djluca',
  '../moja-strona/akademia-samoobrony',
];

const TECH_MAP = {
  // Frontend Frameworks
  'next': { name: 'Next.js', category: 'framework', icon: 'nextjs' },
  'react': { name: 'React', category: 'framework', icon: 'react' },
  'flutter': { name: 'Flutter', category: 'framework', icon: 'flutter' },
  
  // Languages
  'typescript': { name: 'TypeScript', category: 'language', icon: 'typescript' },
  'dart': { name: 'Dart', category: 'language', icon: 'dart' },
  
  // Styling
  'tailwindcss': { name: 'Tailwind CSS', category: 'styling', icon: 'tailwindcss' },
  
  // Backend/Cloud
  'firebase': { name: 'Firebase', category: 'backend', icon: 'firebase' },
  'firebase-admin': { name: 'Firebase Admin', category: 'backend', icon: 'firebase' },
  
  // State Management
  'flutter_bloc': { name: 'BLoC', category: 'state', icon: 'flutter' },
  'flutter_riverpod': { name: 'Riverpod', category: 'state', icon: 'flutter' },
  
  // Animation
  'framer-motion': { name: 'Framer Motion', category: 'animation', icon: 'framer' },
  'flutter_animate': { name: 'Flutter Animate', category: 'animation', icon: 'flutter' },
  
  // Forms
  'react-hook-form': { name: 'React Hook Form', category: 'forms', icon: 'react' },
  'zod': { name: 'Zod', category: 'forms', icon: 'zod' },
  'flutter_form_builder': { name: 'Form Builder', category: 'forms', icon: 'flutter' },
  
  // Email
  'resend': { name: 'Resend', category: 'email', icon: 'resend' },
  'react-email': { name: 'React Email', category: 'email', icon: 'react' },
  'nodemailer': { name: 'Nodemailer', category: 'email', icon: 'nodejs' },
  
  // Analytics
  '@google-analytics/data': { name: 'Google Analytics', category: 'analytics', icon: 'google' },
  '@vercel/speed-insights': { name: 'Vercel Analytics', category: 'analytics', icon: 'vercel' },
  
  // Charts
  'recharts': { name: 'Recharts', category: 'visualization', icon: 'recharts' },
  'fl_chart': { name: 'FL Chart', category: 'visualization', icon: 'flutter' },
  
  // UI Libraries
  'lucide-react': { name: 'Lucide Icons', category: 'ui', icon: 'lucide' },
  'react-icons': { name: 'React Icons', category: 'ui', icon: 'react' },
  
  // Other
  'react-intersection-observer': { name: 'Intersection Observer', category: 'utils', icon: 'react' },
  'date-fns': { name: 'date-fns', category: 'utils', icon: 'date-fns' },
};

function analyzeProject(projectPath) {
  const fullPath = path.join(__dirname, projectPath);
  const packageJsonPath = path.join(fullPath, 'package.json');
  const pubspecPath = path.join(fullPath, 'pubspec.yaml');
  
  const technologies = new Set();
  
  // Check package.json
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      Object.keys(deps).forEach(dep => {
        const baseDep = dep.split('/').pop().replace('@', '');
        if (TECH_MAP[baseDep] || TECH_MAP[dep]) {
          technologies.add(baseDep);
        }
      });
    } catch (e) {
      console.error(`Error reading ${packageJsonPath}:`, e.message);
    }
  }
  
  // Check pubspec.yaml for Flutter
  if (fs.existsSync(pubspecPath)) {
    try {
      const pubspec = fs.readFileSync(pubspecPath, 'utf8');
      Object.keys(TECH_MAP).forEach(tech => {
        if (pubspec.includes(tech)) {
          technologies.add(tech);
        }
      });
      // Always add Flutter if pubspec exists
      technologies.add('flutter');
      technologies.add('dart');
    } catch (e) {
      console.error(`Error reading ${pubspecPath}:`, e.message);
    }
  }
  
  return Array.from(technologies);
}

function getAllTechnologies() {
  const allTechs = new Set();
  
  PROJECTS.forEach(project => {
    const techs = analyzeProject(project);
    techs.forEach(tech => allTechs.add(tech));
  });
  
  return Array.from(allTechs)
    .map(tech => TECH_MAP[tech] || { name: tech, category: 'other', icon: tech })
    .filter(Boolean);
}

// Generate technologies.json
const technologies = getAllTechnologies();
const output = {
  technologies: technologies.map(tech => ({
    name: tech.name,
    category: tech.category,
    icon: tech.icon,
  })),
  generatedAt: new Date().toISOString(),
};

fs.writeFileSync(
  path.join(__dirname, '../src/data/technologies.json'),
  JSON.stringify(output, null, 2)
);

console.log(`✅ Wygenerowano ${technologies.length} technologii:`);
technologies.forEach(tech => {
  console.log(`  - ${tech.name} (${tech.category})`);
});

