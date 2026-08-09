import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from "next";

import { site } from "@/lib/site";
import { StrictMode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),

  openGraph: {
    type: 'website',
    images: [
      {
        url: '/opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Rita Gonzalez Hesaynes',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph.jpg'],
  },

  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon.ico',
      },
    ],
  },

  manifest: '/manifest.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StrictMode>{children}</StrictMode>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
