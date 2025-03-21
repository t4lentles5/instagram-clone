import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('INSTAGRAM_TOKEN')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const user = await getAuthenticatedUser(token);

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className='flex flex-col-reverse sm:grid xl:grid-cols-[244px_1fr] sm:grid-cols-[72px_1fr] sm:w-[72px] w-screen h-screen'>
      <Sidebar />
      {children}
    </div>
  );
}
