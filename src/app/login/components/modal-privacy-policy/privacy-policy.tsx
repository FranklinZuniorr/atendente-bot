'use client';

import { Button, Modal } from 'antd';
import { useState } from 'react';

export const ModalPrivacyPolicy = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  return (
    <>
      <Button type="link" onClick={() => setIsOpenModal(true)}>
            Ver política de privacidade
      </Button>
      <Modal 
        title="Política de privacidade" 
        open={isOpenModal} 
        cancelButtonProps={{ hidden: true }}
        onOk={() => setIsOpenModal(false)}
        onCancel={() => setIsOpenModal(false)}
      >
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', color: 'rgb(68, 68, 68)' }}>
          <p>
        A sua privacidade é importante para nós. É política do <strong>Atendente Bot</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site{' '}
            <a href="https://atendente-bot.site" style={{ color: 'rgb(68, 68, 68)' }}>
          Atendente Bot
            </a>, e outros sites que possuímos e operamos.
          </p>

          <br />

          <p>
        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
          </p>

          <br />

          <p>
        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
          </p>

          <br />

          <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>

          <br />

          <p>
        O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas{' '}
            <a href="https://politicaprivacidade.com/" rel="noopener noreferrer" target="_blank" style={{ color: 'rgb(68, 68, 68)' }}>
          políticas de privacidade
            </a>.
          </p>

          <br />

          <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>

          <br />

          <p>
        O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
          </p>

          <br />

          <h3><strong>Compromisso do Usuário</strong></h3>

          <br />

          <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Atendente Bot oferece no site e com caráter enunciativo, mas não limitativo:</p>

          <br />

          <ul>
            <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
            <li>
          B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica,{' '}
              <a href="https://betnacionalbrasil.br.com" style={{ color: 'rgb(68, 68, 68)', textDecoration: 'none' }}>
            Bet Nacional
              </a>{' '}
          ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
            </li>
            <li>
          C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Atendente Bot, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
            </li>
          </ul>

          <br />

          <h3><strong>Mais informações</strong></h3>

          <br />

          <p>
        Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
          </p>

          <br />

          <p>Esta política é efetiva a partir de <strong>03 de abril de 2025</strong>.</p>
        </div>
      </Modal>
    </>
  );
};