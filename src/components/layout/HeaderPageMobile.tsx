'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BackIcon } from '@/features/home/sidebar/icons/BackIcon';

export const HeaderPageMobile = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  return (
    <header className="bg-background border-separator fixed top-0 z-50 flex w-full items-center border-b px-4 py-3 md:hidden">
      <Link href="#" onClick={() => router.back()} className="fixed">
        <BackIcon />
      </Link>
      <p className="w-full text-center font-semibold">{children}</p>
    </header>
  );
};
