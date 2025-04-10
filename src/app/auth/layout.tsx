import { AuthThemeProvider } from '@/components/theme/AuthThemeProvider';
import { Footer } from '@/components/layout/Footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen max-w-screen flex-col items-center">
      <AuthThemeProvider>{children}</AuthThemeProvider>
      <Footer />
    </div>
  );
}
