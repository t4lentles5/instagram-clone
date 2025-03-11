import { Sidebar } from '../../components/sidebar/Sidebar';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col-reverse sm:grid xl:grid-cols-[244px_1fr] sm:grid-cols-[72px_1fr] sm:w-[72px] w-screen h-screen'>
      <Sidebar />
      {children}
    </div>
  );
}
