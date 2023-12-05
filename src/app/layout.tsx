'use client';

import { RecoilRoot } from 'recoil';
import './globals.css';
import Modal from '@/component/Modal';
import AxiosInterceptor from '@/component/AxiosInterceptor';
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full">
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="strcat" />
        <meta
          property="og:description"
          content="함께 문장을 이어 롤링페이퍼를 완성해보세요! : strcat"
        />
        <meta property="og:url" content="https://strcat.me" />
        <meta property="og:image" content="/App-Icon.png" />
      </Head>
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
