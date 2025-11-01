'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface TopMenuOptionProps {
    pathname: string;
    text: string;
    icon: ReactNode;
}

export const TopMenuOption = ({ pathname, text, icon }: TopMenuOptionProps) => {
  const currentPathname = usePathname();
  const navigate = useRouter();
  const isSamePath = currentPathname === pathname;

  return <div 
    className={`
    cursor-pointer p-[0.3px] px-[5px] flex items-center gap-1 m-0
    rounded-md text-[14px] text-white whitespace-nowrap
    ${isSamePath ? 'bg-white !text-primary font-medium' : ''}
    `}
    onClick={() => navigate.push(pathname)}
  >
    {icon}
    <span className='mt-[-2px]'>{text}</span>
  </div>;
};