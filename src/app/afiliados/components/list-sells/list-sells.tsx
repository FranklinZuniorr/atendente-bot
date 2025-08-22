'use client';

import { Table } from 'antd';
import type { TableProps } from 'antd';
import { useAppSelector } from '@/app/configs/redux/store';
import { useGetAllAffiliateSells } from '../../query-api/get-all-affiliate-sells';
import { AffiliateSellInternal } from '../../interfaces';
import { formatMoney, formatTelephone } from 'frutils.js';
import dayjs from 'dayjs';
import { DollarOutlined } from '@ant-design/icons';

export const ListSells = () => {
  const columns: TableProps<AffiliateSellInternal>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true
    },
    {
      title: 'Cliente',
      dataIndex: 'clientName',
      key: 'clientName',
      ellipsis: true
    },
    {
      title: 'Telefone do cliente',
      dataIndex: 'clientTelephone',
      key: 'clientTelephone',
      ellipsis: true,
      render: (text) => <span>{formatTelephone(text.replace('55', ''))}</span>,
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      ellipsis: true,
      render: (text) => <span>{formatMoney(text, 'BRL', 'pt-BR', true)}</span>,
    },
    {
      title: 'Data',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
      render: (text) => <span>{dayjs(text).format('DD / MM / YYYY')}</span>,
    },
    {
      title: 'Fatura id',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
      ellipsis: true
    },
  ];
  const { id: clientId } = useAppSelector(state  => state.client);

  const { data, isFetching } = useGetAllAffiliateSells({ clientId });

  const normalizedData: AffiliateSellInternal[] = data ? data.map(sell => ({ 
    clientName: sell.client.name,
    clientTelephone: sell.client.telephone,
    createdAt: sell.createdAt,
    id: sell._id,
    invoiceId: sell.invoiceId,
    value: sell.value
  })) : [];

  return <div className='overflow-x-auto flex flex-col gap-3 border-t border-neutral-300 pt-4'>
    <span className='flex items-center gap-1'>
      <DollarOutlined size={18} />
        Listagem das últimas vendas:
    </span>
    <Table<AffiliateSellInternal>
      bordered
      className='min-w-[70rem]'
      columns={columns} 
      dataSource={normalizedData} 
      pagination={false}
      loading={isFetching}
      locale={{emptyText: 'Nenhum dado disponível!'}}
    />
  </div>;
};
