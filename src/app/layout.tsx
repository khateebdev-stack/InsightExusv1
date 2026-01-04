import './globals.css';
import React from 'react';
import { Navigation } from '../components/layout/NavigationNext';
import { Footer } from '../components/layout/Footer';
import { ToastProvider } from '@/components/ui/ToastContext';
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insightexus.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'InsightExus | Engineering Scalable Digital Systems',
    template: '%s | InsightExus'
  },
  description: 'Expert software engineering services specializing in web development, system architecture, DevOps, cloud infrastructure, and AI/ML integration. Transform your digital infrastructure with proven solutions.',
  keywords: [
    'software engineering',
    'web development',
    'system architecture',
    'devops',
    'cloud infrastructure',
    'AI integration',
    'machine learning',
    'custom software development',
    'enterprise solutions',
    'microservices architecture'
  ],
  authors: [{ name: 'InsightExus' }],
  creator: 'InsightExus',
  publisher: 'InsightExus',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'InsightExus',
    title: 'InsightExus | Engineering Scalable Digital Systems',
    description: 'Transform your digital infrastructure with expert software engineering services. Specializing in web development, system architecture, DevOps, and AI/ML integration.',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'InsightExus - Engineering Scalable Digital Systems'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InsightExus | Engineering Scalable Digital Systems',
    description: 'Expert software engineering services for scalable digital transformation.',
    images: [`${baseUrl}/twitter-image.png`],
    creator: '@insightexus',
    site: '@insightexus'
  },
  alternates: {
    canonical: baseUrl
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
  other: {
    'application-ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'InsightExus',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: 'Expert software engineering services specializing in web development, system architecture, DevOps, and AI/ML integration.',
      sameAs: [
        'https://twitter.com/insightexus',
        'https://linkedin.com/company/insightexus',
        'https://github.com/insightexus'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        availableLanguage: ['en']
      }
    })
  },
  icons: {
    icon: '/logo2.png',
    shortcut: '/logo2.png',
    apple: '/logo2.png',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <Navigation />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
