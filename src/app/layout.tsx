import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tworzę aplikacje i strony internetowe",
  description: "Profesjonalne aplikacje mobilne, strony WWW i systemy webowe. Nowoczesne technologie, eleganckie rozwiązania.",
  keywords: ["aplikacje mobilne", "strony internetowe", "Next.js", "Flutter", "React", "TypeScript"],
  // Favicon będzie automatycznie obsługiwany przez Next.js jeśli umieścisz favicon.ico w app/ lub public/
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <SmoothScroll />
        {children}
        <Toaster
          position="top-right"
          containerClassName="toaster-container"
          containerStyle={{
            zIndex: 9999,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(17, 24, 39, 0.95)',
              color: '#fff',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#00ff41',
                secondary: '#000',
              },
              style: {
                border: '1px solid rgba(0, 255, 65, 0.3)',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
              style: {
                border: '1px solid rgba(239, 68, 68, 0.5)',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

