import { AdditionalProviders } from './components/additional-providers';
import { AuthMiddleware } from './components/auth-middleware';
import ReduxProvider from './configs/redux/provider/redux-provider';
import './globals.css';

export const metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/robot.png', type: 'image/png' },
    ],
    apple: [
      { url: '/robot.png' },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Atendente bot</title>
        <meta name="description" content="Atendimento ágil, inteligente e 24/7 para o seu negócio no WhatsApp! 🚀💬" />
        <meta name="robots" content="all" />
        <meta name="author" content="Franklin Vieira Barbosa" />
        <meta name="keywords" content="robô, bot, zap bot, whatsapp bot, whats, whatsapp" />
        <meta name="language" content="pt-BR" />
        <link rel="canonical" href="https://atendente-bot.site" />
      </head>
      <body>
        <ReduxProvider>
          <AuthMiddleware>
            <AdditionalProviders>{children}</AdditionalProviders>
          </AuthMiddleware>
        </ReduxProvider>
      </body>
    </html>
  );
}
