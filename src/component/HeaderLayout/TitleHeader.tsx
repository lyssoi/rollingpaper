'use client';

import { useRecoilState } from 'recoil';

import { HamburgerMenu } from '../Icon/Header';
import { useScroll } from '@/hooks/useScroll';
import { drawerState, themeState, titleState } from '@/recoil/state';

export default function TitleHeader() {
  const [title] = useRecoilState(titleState);
  const [, setDrawer] = useRecoilState(drawerState);
  const [theme] = useRecoilState(themeState);
  const isHidden = useScroll();

  return (
    <div
      className={`fixed top-0 z-10 w-full max-w-md transition-transform duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div
        className={`flex min-h-[52px] py-[10px] flex-row items-stretch justify-between ${theme.bgTheme.background} px-[24px]`}
        id="titleHeader"
      >
        <div className="text-white pr-[8px] text-24px font-bold flex items-center">
          {title}
        </div>
        <div
          className="pt-[4px]"
          onClick={() => {
            setDrawer(true);
            document.body.style.overflow = 'hidden';
          }}
        >
          <HamburgerMenu />
        </div>
      </div>
    </div>
  );
}
