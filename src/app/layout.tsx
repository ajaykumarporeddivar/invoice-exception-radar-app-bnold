import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Exception Radar — Automate invoice exception finding and approval',
  description: 'Invoice Exception Radar provides a focused platform for fractional finance teams to quickly ingest messy invoice data, identify and prioritize critical exceptions, and generate client-ready reports for swift resolution before month-end.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Demo Mode Banner */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 text-zinc-100 text-xs px-4 py-2 flex justify-between items-center">
          <span>⚡ Demo Mode — Invoice Exception Radar · Built with NEXUS OS</span>
          <a href="/dashboard" className="text-blue-300 hover:text-blue-200 transition-colors">
            Open Dashboard →
          </a>
        </div>
        <div className="pt-9"> {/* Offset for the fixed banner */}
          {children}
        </div>
      </body>
    </html>
  );
}