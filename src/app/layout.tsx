'use client';

import { RecoilRoot } from 'recoil';

import InApp from './InApp';
import './globals.css';
import AxiosInterceptor from '@/component/AxiosInterceptor';
<<<<<<< HEAD
import Head from 'next/head';
import Og from '@/component/Og';
=======
import HeaderLayout from '@/component/HeaderLayout';
import Modal from '@/component/Modal';
import OpenGraph from '@/component/OpenGraph';
>>>>>>> origin

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full">
      <head>
        <title>strcat : 글을 이어 만드는 롤링페이퍼</title>
<<<<<<< HEAD
        <Og />
        <link rel="icon" href="/Favicon.png"></link>
      </head>
      <body className="h-full">
        <div className="m-auto h-full max-w-[calc(100vh*0.6)] font-sans">
=======
        <OpenGraph />
        <link rel="icon" href="/Favicon.png"></link>
      </head>
      <body className="h-full overscroll-none">
        <div className="m-auto h-full max-w-md font-pretentdard">
          <InApp />
>>>>>>> origin
          <RecoilRoot>
            <AxiosInterceptor />
            <Modal />
            <HeaderLayout />
            {children}
          </RecoilRoot>
        </div>
      </body>
    </html>
  );
}
