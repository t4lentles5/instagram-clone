import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { Sidebar } from '@/components/sidebar/Sidebar';

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
      <Sidebar user={user} />

      <div className='flex flex-col items-center overflow-y-auto md:border-l border-separator grow md:pt-0'>
        {children}
      </div>
    </div>
  );
}
