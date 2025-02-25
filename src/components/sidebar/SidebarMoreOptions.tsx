'use client';

import { List } from 'phosphor-react';

export const SidebarMoreOptions = () => {
  return (
    <>
      <button className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'>
        <List size={29} weight={false ? 'fill' : 'regular'} />
        <span className={` ${false && 'font-bold'}`}>More</span>
      </button>
    </>
  );
};
