import { AuthMiddleware } from './components/auth-middleware';
import ReduxProvider from './configs/redux/provider/redux-provider';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider><AuthMiddleware>{children}</AuthMiddleware></ReduxProvider>
      </body>
    </html>
  );
}
