import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { HeaderPageMobile } from '@/components/ui/HeaderPageMobile';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className='flex flex-col md:grid xl:grid-cols-[244px_1fr] md:grid-cols-[72px_1fr] min-h-screen'>
      {/* Sidebar con posición sticky */}

      <Sidebar user={user} />

      {/* Contenido principal */}
      <div className='flex flex-col items-center pt-4 overflow-y-auto md:pt-0'>
        {children}
      </div>

      {/* Header móvil */}
      <HeaderPageMobile>algo</HeaderPageMobile>
    </div>
  );
}
