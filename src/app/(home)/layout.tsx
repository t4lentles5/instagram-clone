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
    <div className='flex flex-col-reverse sm:grid xl:grid-cols-[244px_1fr] sm:grid-cols-[72px_1fr] max-w-screen h-screen'>
      <Sidebar user={user} />
      <div className='overflow-y-auto'>{children}</div>
    </div>
  );
}
