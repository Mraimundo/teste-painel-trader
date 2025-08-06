import type { Metadata } from 'next';
import Head from 'next/head';
import localFont from 'next/font/local';

import '../styles/globals.css';
import { Providers } from './providers';

const localPoppins = localFont({
  src: [
    {
      path: './fonts/Poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Poppins/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Poppins/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Poppins/Poppins-Black.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Painel Traider',
  description: '',
  openGraph: {
    title: 'Painel Traider',
    description: '',
    images: [
      {
        url: '',
        alt: 'Logo Painel Traider',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Head>
        {/* Google search Console Configuration */}
        <meta name="google-site-verification" content="" />
      </Head>
      <body className={`${localPoppins.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
