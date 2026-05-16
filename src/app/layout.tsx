import { BASE_URL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

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
  return children;
}
