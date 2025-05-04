import { Footer } from '@/core/shared/components/Footer';
import { AuthThemeProvider } from '@/core/shared/providers/AuthThemeProvider';

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
