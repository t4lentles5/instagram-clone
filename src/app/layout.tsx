import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';

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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
