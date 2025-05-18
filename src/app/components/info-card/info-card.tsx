import { Controller, useForm } from 'react-hook-form';
import { InfoCardFormEdit } from './interfaces';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Collapse, Input, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteInfo } from '@/app/query-api/delete-info';
import { invalidateGetAllInfos } from '@/app/query-api/get-all-infos';
import { usePutInfo } from '@/app/query-api/put-info';

interface InfoCardProps {
    title: string;
    description: string;
    id: string;
}

export const InfoCard = ({ description, title, id }: InfoCardProps) => {
  const schema = object({
    title: string().required('O título é obrigatório!').min(3, 'Insira no mínimo 3 letras'),
    description: string().required('A descrição é obrigatória!').min(3, 'Insira no mínimo 3 letras')
  });
  const { handleSubmit, control, formState: { isDirty }} = 
  useForm<InfoCardFormEdit>({ resolver: yupResolver(schema), defaultValues: {description: description, title: title} });

  const { mutate: mutateDeleteInfo, isPending: isPendingDeleteInfo } = useDeleteInfo({ onSuccess: () => invalidateGetAllInfos() });
  const { mutate: mutatePutInfo, isPending: isPendingPutInfo } = usePutInfo({ onSuccess: () => invalidateGetAllInfos() });

  const onSubmit = (data: InfoCardFormEdit) => {
    mutatePutInfo({ infoId: id, ...data });
  };

  const handleDeleteInfo = () => {
    mutateDeleteInfo({ infoId: id });
  };

  return <Collapse
    size="small"
    items={[{ key: '1', label: title, children: <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 p-1.5 border-gray-300 border rounded-md'>
      <label>Título: <span className='text-red-500'>*</span></label>
      <Controller 
        name='title' 
        control={control} 
        render={({ field, fieldState }) => (<>
          <Input {...field} maxLength={200} showCount />
          {fieldState.error && <Typography.Text type="danger">{fieldState.error.message}</Typography.Text>}
        </>)} 
      />

      <label>Descrição: <span className='text-red-500'>*</span></label>
      <Controller 
        name='description' 
        control={control} 
        render={({ field, fieldState }) => (
          <>
            <TextArea {...field} maxLength={2000} autoSize showCount />
            {fieldState.error && <Typography.Text type="danger">{fieldState.error.message}</Typography.Text>}
          </>
        )} 
      />

      <div className='w-full flex justify-end gap-2 mt-6'>
        <Button 
          disabled={!isDirty} 
          htmlType='submit' 
          variant='solid' 
          color='primary' 
          type="primary"
          loading={isPendingPutInfo}
        >
        Editar
        </Button>
        <Button 
          variant='solid' 
          htmlType='button' 
          color='red' 
          shape="circle" 
          icon={<DeleteOutlined />} 
          loading={isPendingDeleteInfo}
          onClick={handleDeleteInfo}
        />
      </div>
    </form> }]}
  />;
};