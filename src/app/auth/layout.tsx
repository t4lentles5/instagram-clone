import { AuthThemeProvider } from '@/components/ui/AuthThemeProvider';
import { Footer } from '@/components/ui/Footer';

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
