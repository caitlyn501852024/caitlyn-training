import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const sweiNutLeg = localFont({
  src: [
    { path: '../public/fonts/SweiNutLegCJKtc-Thin.woff2', weight: '100', style: 'normal' },
    { path: '../public/fonts/SweiNutLegCJKtc-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/SweiNutLegCJKtc-DemiLight.woff2', weight: '350', style: 'normal' },
    { path: '../public/fonts/SweiNutLegCJKtc-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/SweiNutLegCJKtc-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/SweiNutLegCJKtc-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/SweiNutLegCJKtc-Black.woff2', weight: '900', style: 'normal' }
  ],
  variable: '--font-sweiNutLeg',
  display: 'swap'
});

const antaRegular = localFont({
  src: '../public/fonts/Anta-Regular.ttf',
  variable: '--font-antaRegular',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Funtime training project - My Blog by Caitlyn'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body
        className={`font-body ${sweiNutLeg.variable} ${antaRegular.variable} antialiased flex flex-col min-h-screen`}
        data-theme='light'
      >
      {children}
      </body>
    </html>
  );
};
