import { Footer } from '@/components/ui/Footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col h-screen max-w-screen'>
      {children}
      <Footer />
    </div>
  );
}
