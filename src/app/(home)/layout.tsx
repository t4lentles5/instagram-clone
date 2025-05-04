import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';
import { Sidebar } from '@/features/sidebar/components/Sidebar';

export default async function Layout({
  modal,
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className='flex min-h-screen flex-col md:grid md:grid-cols-[73px_1fr] xl:grid-cols-[244px_1fr]'>
      <Sidebar user={user} />

      <div className='flex grow flex-col items-center'>{children}</div>
      {modal}
    </div>
  );
}
