'use client';

import { removePhoneFormatting, setClientGlobalStateRedux } from '@/app/helpers';
import { AuthService } from '@/app/services/auth';
import { AUTH_CODE_LOCAL_STORAGE_KEY, META_DATA_LOGIN_LOCAL_STORAGE_KEY, TELEPHONE_LOCAL_STORAGE_KEY } from '@/constants';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { ModalPrivacyPolicy } from '../modal-privacy-policy';
import { copyToClipboard, formatTelephone } from '@/app/utils';
import RobotIcon from '../../../assets/images/robot.png';
import { ModalGuide } from '../modal-guide';
import Image from 'next/image';
import { CopyOutlined } from '@ant-design/icons';
import { WhatsappCardFloat } from '../whatsapp-card-float';
import useScreenWidth from '@/app/hooks/useScreenWidth';
 
export const LoginForm = () => {
  const SPLIT_CODE_CHAR = '<!!!>';
  const navigate = useRouter();
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth <= 1024;
  const [inputTelephoneText, setInputTelephoneText] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [pairingCode, setPairingCode] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [isLoadingGetCodes, setIsLoadingGetCodes] = useState<boolean>(false);
  const [isLoadingValidateConnection, setIsLoadingValidateConnection] = useState<boolean>(false);

  const hasCodes = qrCode.length > 0 && pairingCode.length > 0;
  const normalizedTelephone = `55${removePhoneFormatting(inputTelephoneText)}`;

  const calmInfo = `
  Ao conectar seu WhatsApp, nenhuma mensagem será respondida de imediato.
  Você poderá configurar tudo com calma. A conexão pode ser pausada ou 
  desconectada quando desejar.
  `;

  const getQrCode = async () => {
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
      localStorage.setItem(
        META_DATA_LOGIN_LOCAL_STORAGE_KEY, 
        `
          ${response.data.code}
          ${SPLIT_CODE_CHAR}
          ${response.data.pairingConde}
          ${SPLIT_CODE_CHAR}
          ${inputTelephoneText}
          ${SPLIT_CODE_CHAR}
          ${response.data.authCode}
        `.trim()
      );

    } catch {
      setIsLoadingGetCodes(false);
    }
  };

  const checkClient = async () => {
    try {
      setIsLoadingValidateConnection(true);
      await AuthService.checkClient({ authCode, telephone: normalizedTelephone }, true);
      setIsLoadingValidateConnection(false);

      localStorage.setItem(AUTH_CODE_LOCAL_STORAGE_KEY, authCode);
      localStorage.setItem(TELEPHONE_LOCAL_STORAGE_KEY, normalizedTelephone);
      localStorage.removeItem(META_DATA_LOGIN_LOCAL_STORAGE_KEY);
        
      await setClientGlobalStateRedux();
      navigate.push('/');
    } catch {
      setIsLoadingValidateConnection(false);
      toast.error('Conecte o seu dispositivo com o QR-CODE ou CÓDIGO de PAREAMENTO!');
      handleOpenWhatsAppLink(2000);
    }
  };

  const handleOpenWhatsAppLink = (delay: number) => {
    if (!isMobile) return;
    const link = `https://wa.me/${normalizedTelephone}?text=Insira%20esse%20c%C3%B3digo%20de%20pareamento%20na%20aba%20'dispositivos%20conectados'%20no%20WhatsApp: ${pairingCode}`;
    setTimeout(() => {
      window.open(link);
    }, delay);
  };

  const handleOnClickCopyPairingCode = () => {
    copyToClipboard(pairingCode);
    toast.success('Copiado!');
  };

  const handleLocalStorageMetaData = () => {
    const hasLocalStorageCodes = localStorage.getItem(META_DATA_LOGIN_LOCAL_STORAGE_KEY);
    if(!hasLocalStorageCodes) return;
    const metaData = hasLocalStorageCodes.split(SPLIT_CODE_CHAR);
    const code = metaData[0].trim();
    const pairingCode = metaData[1].trim();
    const telephone = metaData[2].trim();
    const authCode = metaData[3].trim();

    setPairingCode(pairingCode);
    setQrCode(code);
    setInputTelephoneText(telephone);
    setAuthCode(authCode);
  };

  const handleBtnCancel = () => {
    window.location.reload();
    localStorage.removeItem(META_DATA_LOGIN_LOCAL_STORAGE_KEY);
  };

  useEffect(() => {
    handleLocalStorageMetaData();
  }, []);

  return <div className="bg-gradient-custom h-full w-full px-3 py-16 rounded-b-2xl">
    <div className='flex flex-col items-center justify-center min-h-full'>
      <div className="bg-white p-4 rounded-md max-w-[30rem] w-full flex flex-col gap-5 border-b-[4px] border-b-primary shadow-2xl">
        {
          !hasCodes ? 
            <header className="w-full flex flex-col">
              <span className='w-full flex justify-center'>
                <Image width={48} height={48} src={RobotIcon.src} alt='robot' />
              </span>
              <h3 className="text-[1.25rem] text-center w-full">Atendente bot</h3>
              <span className="text-[0.8rem] font-normal text-center w-full">
          Atendimento ágil, inteligente e 24/7 para o seu negócio no WhatsApp! 🚀💬
              </span>
            </header>: 
            <header className="w-full flex flex-col items-center text-center">
              <h3 className='text-[1.4rem] text-primary'>Etapa final</h3>
              <span>
              Escaneie o <b>QR Code</b> ou use o <b>código de pareamento</b> abaixo para parear com o WhatsApp e ativar sua conexão.
              </span>
            </header>
        }
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
                {isMobile && <WhatsappCardFloat onClick={() => handleOpenWhatsAppLink(0)} />}
                <QRCode
                  style={{ height: '10rem', width: '10rem' }}
                  value={qrCode}
                />
                <div
                  className='flex flex-col gap-2 text-center'
                >
                  Código de pareamento:
                  <span 
                    className='flex items-center w-full text-center text-primary tracking-[0.5rem] text-[1.2rem]'
                  >
                    {pairingCode}
                    <Button 
                      shape="circle" 
                      icon={<CopyOutlined />} 
                      onClick={handleOnClickCopyPairingCode} 
                    />
                  </span>
                </div>
                <ModalGuide />
                {/* <div className="w-full flex gap-2 items-center mt-2">
                  <img className='w-[50px]' src={ZapSecurityIcon.src} alt='robot' />
                  <span className="text-[0.8rem] font-normal text-left">
                  🔒 Integração oficial com o <strong className='text-green-500 font-bold underline underline-offset-2'>WhatsApp</strong>.
                    <strong className='font-bold'> Conexão 100% segura e criptografada com a plataforma.</strong>
                  </span>
                </div> */}
                <div className="relative mt-2 pl-3">
                  <div className='h-full w-1 bg-primary absolute left-0 rounded-2xl' />
                  <span className="text-[0.8rem] font-normal text-left tracking-[0.1rem]">
                    <strong>IMPORTANTE!</strong>
                    {calmInfo}
                  </span>
                </div>
                <Button 
                  className='w-full'
                  type="primary" 
                  color='primary'
                  loading={isLoadingValidateConnection}
                  onClick={checkClient}
                >
                  <b>ATIVAR CONEXÃO</b>
                </Button>
                <Button 
                  className='w-full'
                  onClick={handleBtnCancel}
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
