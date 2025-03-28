'use client';

import './globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigate = useRouter();

  useEffect(() => {
    navigate.push('/');
  }, []);
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
