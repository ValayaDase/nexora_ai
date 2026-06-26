import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NEXORA AI | Autonomous AI Agent & Workflow Orchestration',
  description:
    'Deploy autonomous AI agents that connect event triggers, enrich prompt contexts, route models, and execute serverless code pipelines at the edge under 15ms.',
  keywords: [
    'AI Agents',
    'Workflow Automation',
    'LLM Orchestration',
    'Serverless Edge',
    'Vector DB Cache',
    'Model Router',
  ],
  metadataBase: new URL('https://nexora-ai-landing.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NEXORA AI | Autonomous AI Agent & Workflow Orchestration',
    description:
      'Deploy autonomous AI agents that connect event triggers, enrich prompt contexts, route models, and execute serverless code pipelines at the edge under 15ms.',
    url: 'https://nexora-ai-landing.vercel.app',
    siteName: 'NEXORA AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXORA AI | Autonomous AI Agent & Workflow Orchestration',
    description:
      'Deploy autonomous AI agents that connect event triggers, enrich prompt contexts, route models, and execute serverless code pipelines at the edge under 15ms.',
    creator: '@nexora_ai',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-[#f1f6f4] selection:bg-forsythia/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
