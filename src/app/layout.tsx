'use client';

import { RecoilRoot } from 'recoil';
import './globals.css';
import Modal from '@/component/Modal';
import AxiosInterceptor from '@/component/AxiosInterceptor';
import Head from 'next/head';
import Og from '@/component/Og';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full">
      <head>
        <title>strcat : 글을 이어 만드는 롤링페이퍼</title>
        <Og />
        <link rel="icon" href="/Favicon.png"></link>
      </head>
      <body className="h-full">
        <div className="m-auto h-full max-w-[calc(100vh*0.6)] font-sans">
          <RecoilRoot>
            <AxiosInterceptor />
            <Modal />
            {children}
          </RecoilRoot>
        </div>
      </body>
    </html>
  );
}
