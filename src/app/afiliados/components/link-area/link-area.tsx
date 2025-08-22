'use client';

import { useAppSelector } from '@/app/configs/redux/store';
import { useGetAffiliateExposeToken } from '../../query-api/get-affiliate-expose-token';
import { limitTextSpread } from 'frutils.js';
import { CopyOutlined } from '@ant-design/icons';
import { copyToClipboard } from '@/app/utils';
import toast from 'react-hot-toast';

export const LinkArea = () => {
  const { id: clientId } = useAppSelector(state  => state.client);

  const { data: token } = useGetAffiliateExposeToken({ clientId });

  
  const createUrl = (): string => {
    if(!token) return 'Carregando...';
    
    const origin: string = window.location.origin;
    
    const newUrl = new URL(origin);
    newUrl.searchParams.set('affiliateToken', token);

    return newUrl.href;
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(createUrl());
    toast.success('Link copiado!');
  };
  
  const normalizedUrl = limitTextSpread(60, createUrl());

  return <div className='gap-2 flex flex-col' onClick={createUrl}>
    <span>Copie o link abaixo e faça a sua divulgação</span>
    <div 
      className='flex gap-1 cursor-pointer p-2 w-fit border border-neutral-300 rounded-md text-neutral-500'
      onClick={handleCopyToClipboard}
    >
      {normalizedUrl}
      <CopyOutlined size={18} />
    </div>
  </div>;
};