import type { Metadata } from 'next';

import { ThemeProvider } from '@/core/shared/providers/ThemeProvider';
import { ReactQueryProvider } from '@/core/shared/providers/ReactQueryProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Instagram',
  description: 'Instagram clone',
  icons: [
    {
      url: 'https://static.cdninstagram.com/rsrc.php/v4/ys/r/aM-g435MtEX.png',
      sizes: '32x32',
      rel: 'icon',
      type: 'image/png',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ReactQueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
