import { Footer } from '@/shared/components/Footer';
import { AuthThemeProvider } from '@/shared/providers/AuthThemeProvider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen max-w-screen flex-col items-center'>
      <AuthThemeProvider>{children}</AuthThemeProvider>
      <Footer />
    </div>
  );
}
