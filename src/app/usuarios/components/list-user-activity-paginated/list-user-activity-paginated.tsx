'use client';

import { Switch, Table, TableProps, Tag } from 'antd';
import { UserActivityInternal } from '../../interfaces';
import { useAppSelector } from '@/configs/redux/store';
import { invalidateGetAllUserActivityPaginated, useGetAllUserActivityPaginated } from '../../query-api/get-all-user-activity-paginated';
import { formatTelephone } from 'frutils.js';
import dayjs from 'dayjs';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePutUserActivityStatus } from '../../query-api/put-user-activity-status';

export const ListUserActivityPaginated = () => {
  const { id: clientId } = useAppSelector(state  => state.client);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageSize = 10;
  const pageSearchParams = searchParams.get('page');

  const normalizedPage: number = Number(pageSearchParams) || 1;

  const { mutate } = usePutUserActivityStatus({ onSuccess: () => invalidateGetAllUserActivityPaginated() });

  const columns: TableProps<UserActivityInternal>['columns'] = [
    {
      title: 'Cliente',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true
    },
    {
      title: 'Telefone',
      dataIndex: 'telephone',
      key: 'telephone',
      ellipsis: true,
      render: (text: string) => 
        <span>
          {
            formatTelephone(text.length === 13 ? text.replace('55', '') : 
              text.replace('55', '').replace('79', '799'))
          }
        </span>,
    },
    {
      title: 'Status',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      ellipsis: true,
      render: (isEnabled: boolean) => isEnabled ? <Tag color="success">Ativo</Tag> : <Tag color="error">Inativo</Tag>,
    },
    {
      title: 'Primeiro contato',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
      render: (text: string) => <span>{dayjs(text).format('DD / MM / YYYY')}</span>,
    },
    {
      title: 'Ação',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      ellipsis: true,
      render: (_value, record) => (
        <Switch
          className='!bg-primary'
          checked={record.isEnabled}
          onChange={checked => mutate({ id: record._id, status: checked })}
        />
      ),
    }
  ];

  const { data: page, isFetching } = useGetAllUserActivityPaginated({ clientId, page: normalizedPage, pageSize });

  const totalPages = Math.ceil((page?.total || 1) / pageSize);

  const handleChangePageInSearchParams = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', String(page));

    router.push(`${pathname}?${params.toString()}`);
  };
  
  const normalizedData: UserActivityInternal[] = page ? page?.activities.map(activity => ({ 
    _id: activity._id,
    createdAt: activity.createdAt,
    isEnabled: activity.isEnabled,
    name: activity.name,
    telephone: activity.telephone
  })) : [];

  const handleDefineDefaultSearchParams = () => {
    const params = new URLSearchParams();
    
    if (!pageSearchParams) {
      params.set('page', '1');
    }

    if (params.values().toArray().length !== 0) {
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    handleDefineDefaultSearchParams();
  }, []);
  
  return <div className='overflow-x-auto flex flex-col gap-3 border-t border-neutral-300 pt-4'>
    <span className='flex items-center gap-1'>
          Listagem de usuários
    </span>
    <Table<UserActivityInternal>
      bordered
      className='min-w-[70rem]'
      columns={columns} 
      dataSource={normalizedData}
      loading={isFetching}
      pagination={{ 
        current: normalizedPage, 
        pageSize,
        total: totalPages, 
        onChange: handleChangePageInSearchParams
      }}
      locale={{emptyText: 'Nenhum dado disponível!'}}
    />
  </div>;
};