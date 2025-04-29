'use client';

import { removePhoneFormatting, setClientGlobalStateRedux } from '@/app/helpers';
import { AuthService } from '@/app/services/auth';
import { AUTH_CODE_LOCAL_STORAGE_KEY, TELEPHONE_LOCAL_STORAGE_KEY } from '@/constants';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { ModalPrivacyPolicy } from '../modal-privacy-policy';
import { formatTelephone } from '@/app/utils';
import RobotIcon from '../../../assets/images/robot.png';
import ZapSecurityIcon from '../../../assets/images/zap-security.png';
import { ModalGuide } from '../modal-guide';
import Image from 'next/image';
 
export const LoginForm = () => {
  const navigate = useRouter();
  const [inputTelephoneText, setInputTelephoneText] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [pairingCode, setPairingCode] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [isLoadingGetCodes, setIsLoadingGetCodes] = useState<boolean>(false);
  const [isLoadingValidateConnection, setIsLoadingValidateConnection] = useState<boolean>(false);

  const hasCodes = qrCode.length > 0 && pairingCode.length > 0;

  const getQrCode = async () => {
    const normalizedTelephone = `55${removePhoneFormatting(inputTelephoneText)}`;
    if (normalizedTelephone.length < 13) {
      toast.error('Insira um número válido!');
      return;
    }

    try {
      setIsLoadingGetCodes(true);
      const response = await AuthService.getQrCode(normalizedTelephone);
      setIsLoadingGetCodes(false);
      setQrCode(response.data.code);
      setPairingCode(response.data.pairingConde);
      setAuthCode(response.data.authCode);

    } catch {
      setIsLoadingGetCodes(false);
    }
  };

  const checkClient = async () => {
    try {
      const normalizedTelephone = `55${removePhoneFormatting(inputTelephoneText)}`;
      setIsLoadingValidateConnection(true);
      await AuthService.checkClient({ authCode, telephone: normalizedTelephone }, true);
      setIsLoadingValidateConnection(false);

      localStorage.setItem(AUTH_CODE_LOCAL_STORAGE_KEY, authCode);
      localStorage.setItem(TELEPHONE_LOCAL_STORAGE_KEY, normalizedTelephone);
        
      await setClientGlobalStateRedux();
      navigate.push('/');
    } catch {
      setIsLoadingValidateConnection(false);
      toast.error('Conecte o seu dispositivo com o QR-CODE ou CÓDIGO de PAREAMENTO!');
    }
  };

  return <div className="bg-gradient-custom h-full w-full px-3 py-16 rounded-b-2xl">
    <div className='flex flex-col items-center justify-center min-h-full'>
      <div className="bg-white p-4 rounded-md max-w-[30rem] w-full flex flex-col gap-5 border-b-[4px] border-b-primary shadow-2xl">
        <header className="w-full flex flex-col">
          <span className='w-full flex justify-center'>
            <Image width={48} height={48} src={RobotIcon.src} alt='robot' />
          </span>
          <h3 className="text-[1.25rem] text-center w-full">Atendente bot</h3>
          <span className="text-[0.8rem] font-normal text-center w-full">
          Atendimento ágil, inteligente e 24/7 para o seu negócio no WhatsApp! 🚀💬
          </span>
        </header>
        <div className='flex flex-col gap-5'>
          {
            !hasCodes ?
              <>
                <div className='flex flex-col gap-1.5'>
                  <span>Insira o seu número do zap e comece a usar!</span>
                  <Input 
                    value={inputTelephoneText} 
                    onChange={event => setInputTelephoneText(formatTelephone(event.target.value))} 
                    placeholder='(00) 00000-0000'
                  />
                </div>
                <Button 
                  type="primary" 
                  color='primary'
                  loading={isLoadingGetCodes}
                  onClick={getQrCode}
                >
                  Iniciar conexão
                </Button>
                <ModalPrivacyPolicy />
              </> : 
              <div className='w-full flex flex-col items-center gap-4 mt-2'>
                <QRCode
                  style={{ height: '10rem', width: '10rem' }}
                  value={qrCode}
                />
                <div
                  className='flex flex-col gap-1'
                >
                  Código de pareamento:
                  <span 
                    className='w-full text-center text-primary tracking-[0.5rem] text-[1.2rem]'
                  >
                    {pairingCode}
                  </span>
                </div>
                <ModalGuide />
                <div className='w-full text-start flex flex-col'>
                  <li>Aponte o leitor de qr-code do WhatsApp ou use o código de pareamento para conectar!</li>
                  <li>Após conectar, clique em <strong>Validar conexão</strong></li>
                </div>
                <div className="w-full flex gap-2 items-center mt-2">
                  <img className='w-[50px]' src={ZapSecurityIcon.src} alt='robot' />
                  <span className="text-[0.8rem] font-normal text-left">
                  🔒 Integração oficial com o <strong className='text-green-500 font-bold underline underline-offset-2'>WhatsApp</strong>.
                    <strong className='font-bold'> Conexão 100% segura e criptografada com a plataforma.</strong>
                  </span>
                </div>
                <Button 
                  className='w-full'
                  type="primary" 
                  color='primary'
                  loading={isLoadingValidateConnection}
                  onClick={checkClient}
                >
                  Validar conexão
                </Button>
                <Button 
                  className='w-full'
                  onClick={() => window.location.reload()}
                >
                  Cancelar
                </Button>
              </div>
          }
        </div>
      </div>
    </div>
  </div>;
};
