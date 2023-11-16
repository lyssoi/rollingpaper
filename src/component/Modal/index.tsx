'use client';

import { modalState } from '@/recoil/modal';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function Modal() {
  const [modal, setModal] = useRecoilState(modalState);

  const handleClose = () => {
    setModal(null);
  };

  useEffect(() => {
    window.addEventListener('popstate', handleClose);
    return () => {
      window.removeEventListener('popstate', handleClose);
    };
  }, []);

  return (
    modal && (
      <div className="fixed top-0 flex  h-full w-full max-w-[calc(100vh*0.6)] items-center justify-center bg-slate-400/50 ">
        <div className="relative flex h-[50%] basis-4/5 flex-col items-center justify-center bg-red-300">
          {modal.modalComponent}
        </div>
      </div>
    )
  );
}
