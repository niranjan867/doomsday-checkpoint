import type { Metadata, Viewport } from 'next';
import { Cinzel, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'DOOMSDAY CHECKPOINT — WATCH. TRACK. CONTINUE.',
  description:
    'A personal fan-made preparation tracker toward Avengers: Doomsday. 72 canonical checkpoints, spoiler-protected intelligence, and verified multiverse connections.',
  applicationName: 'DOOMSDAY CHECKPOINT',
  authors: [{ name: 'Antigravity Engineering' }],
  keywords: [
    'Marvel watch order',
    'Doomsday Checkpoint',
    'MCU roadmap',
    'Multiverse Saga tracker',
    'Avengers Doomsday guide',
  ],
  openGraph: {
    title: 'DOOMSDAY CHECKPOINT — WATCH. TRACK. CONTINUE.',
    description:
      'A personal fan-made preparation tracker toward Avengers: Doomsday. 72 canonical checkpoints, spoiler-protected intelligence, and verified multiverse connections.',
    type: 'website',
    siteName: 'DOOMSDAY CHECKPOINT',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <a href="#mission-stage" className="skip-to-content">
          Skip to main journey
        </a>
        {children}
      </body>
    </html>
  );
}
