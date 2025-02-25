export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col-reverse sm:grid xl:grid-cols-[244px_1fr] sm:grid-cols-[64px_1fr] w-[72px] h-screen'>
      <div className='w-full bg-slate-600'>Layout</div>
      {children}
    </div>
  );
}
