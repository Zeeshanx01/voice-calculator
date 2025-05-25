import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'Voice Calculator',
    template: '%s | Voice Calculator'
  },
  description: 'Advanced voice-enabled calculator with modern AI capabilities',
  keywords: ['voice calculator', 'AI calculator', 'speech recognition', 'math tool'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Voice Calculator',
    description: 'Advanced voice-enabled calculator with modern AI capabilities',
    url: 'https://yourdomain.com',
    siteName: 'Voice Calculator',
    images: [
      {
        url: 'https://yourdomain.com/og-image.png', // Create this image later
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#4f46e5',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
