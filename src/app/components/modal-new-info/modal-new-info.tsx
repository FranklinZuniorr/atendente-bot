import { Button, Input, Modal, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { ModalInfoForm } from './interfaces';
import { object, string } from 'yup';
import TextArea from 'antd/es/input/TextArea';
import { yupResolver } from '@hookform/resolvers/yup';
import { PlusOutlined } from '@ant-design/icons';
import { usePostNewInfo } from '@/app/query-api/post-new-info';
import { invalidateGetAllInfos } from '@/app/query-api/get-all-infos';
import { useAppSelector } from '@/app/configs/redux/store';

interface ModalNewInfoProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const ModalNewInfo = ({ isOpen, setIsOpen }: ModalNewInfoProps) => {
  const client = useAppSelector(state  => state.client);
  const schema = object({
    title: string().required('O título é obrigatório!').min(3, 'Insira no mínimo 3 letras'),
    description: string().required('A descrição é obrigatória!').min(3, 'Insira no mínimo 3 letras')
  });

  const { handleSubmit, control, reset } = 
  useForm<ModalInfoForm>({ 
    resolver: yupResolver(schema), 
    defaultValues: {
      description: '',
      title: ''
    } 
  });

  const { mutate: mutateNewInfo, isPending: isPendingNewInfo } = 
  usePostNewInfo({ onSuccess: () => {
    invalidateGetAllInfos();
    setIsOpen(false);
    reset();
  } });

  const onSubmit = (data: ModalInfoForm) => {
    mutateNewInfo({ clientId: client.id, ...data });
  };

  return <Modal 
    title="Nova info" 
    okButtonProps={{ hidden: true }}
    cancelButtonProps={{ hidden: true }}
    open={isOpen} 
    onCancel={() => setIsOpen(false)}
  >
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
      <label>Título: <span className='text-red-500'>*</span></label>
      <Controller 
        name='title' 
        control={control} 
        render={({ field, fieldState }) => (<>
          <Input {...field} placeholder='Lista de produtos' />
          {fieldState.error && <Typography.Text type="danger">{fieldState.error.message}</Typography.Text>}
        </>)} 
      />

      <label>Descrição: <span className='text-red-500'>*</span></label>
      <Controller 
        name='description' 
        control={control} 
        render={({ field, fieldState }) => (
          <>
            <TextArea {...field} placeholder='- Coca cola, R$ 5.00, 250ml.' />
            {fieldState.error && <Typography.Text type="danger">{fieldState.error.message}</Typography.Text>}
          </>
        )} 
      />

      <div className='w-full flex justify-end gap-2'>
        <Button
          variant='solid' 
          htmlType='submit' 
          color='primary' 
          shape="default" 
          loading={isPendingNewInfo}
          icon={<PlusOutlined />}
        >
            Criar
        </Button>
      </div>
    </form>
  </Modal>;
};