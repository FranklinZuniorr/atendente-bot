'use client';

import { usePathname, useRouter } from 'next/navigation';

interface TopMenuOptionProps {
    pathname: string;
    text: string;
}

export const TopMenuOption = ({ pathname, text }: TopMenuOptionProps) => {
  const currentPathname = usePathname();
  const navigate = useRouter();
  const isSamePath = currentPathname === pathname;

  return <div 
    className={`
    cursor-pointer p-[0.3px] px-[5px] flex items-center m-0
    rounded-md text-[14px] text-white whitespace-nowrap
    ${isSamePath ? 'bg-white !text-primary font-medium' : ''}
    `}
    onClick={() => navigate.push(pathname)}
  >
    {text}
  </div>;
};