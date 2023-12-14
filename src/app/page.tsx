'use client';

import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import Head from 'next/head';

import MainManStrcat from '@/component/MainManStrcat';
import { useLogin } from '@/hooks/useLogin';
import { themeState } from '@/recoil/theme/theme';
import { focusToHighlight } from '@/utils/focusToHighlight';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLogin] = useLogin();
  const [theme] = useRecoilState(themeState);
  const router = useRouter();
  const ref = useRef<HTMLHeadingElement | null>(null);

  const handleClickPersonal = () => {
    if (isLogin) router.push('create');
    else {
      localStorage.setItem('strcat_login_success_url', '/create');
      router.push('/login');
    }
  };

  return (
<<<<<<< HEAD
    <>
      <div className={`${Theme.background}`}>
        <div className=" fixed flex h-full w-full max-w-[calc(100vh*0.6)]  flex-col">
          <div className="basis-1/12">
            <Drawer />
            <StrcatHeader />
          </div>
          <div className="basis-6/12">
            <div
              className={`mx-[24px] mt-[46px] text-[20px] ${Theme.defaultText}`}
            >
              <p>
                {`// 스트링캣은 문자열을 끝없이 늘려 스크롤을 만들 수 있는 신개념
              롤링페이퍼 서비스 입니다.`}
              </p>
              <p>소중한 사람에게 스트링캣을 남겨보세요!</p>
            </div>
          </div>
          <div className="basis-5/12">
            <div className=" flex h-full w-full flex-col">
              <div className="mx-[24px] mt-[100px] inline basis-1/2 text-[22px]">
                <div className="inline">
                  <button
                    className={`relative h-[33px] w-[150px] items-center ${Theme.leftCTA} text-[22px]`}
                    onClick={() => router.push('/create')}
                  >
                    <div
                      className={`relative bottom-[4.5px] left-[2px] h-[33px] w-[150px] text-[22px] ${Theme.leftCTA}`}
                    >
                      <div className=" bottom-[-4.5px] left-[-2px]">
                        스트링캣 만들기
                      </div>
                    </div>
                  </button>
                </div>
                <div className="inline text-strcat-default-green">
                  &nbsp;를 누르면 하나의 문자열을 할당받을 수 있어요. 링크를
                  공유해 문자열을 끝없이 이어보세요.
                </div>
              </div>
              <div className="mx-[24px] inline basis-1/2 text-[22px]">
                <div className="inline">
                  <button
                    className={`relative h-[33px] w-[200px] items-center ${Theme.rightCTA} text-[22px]`}
                    onClick={() => router.push('/create')}
                  >
                    <div
                      className={`relative bottom-[4.5px] left-[2px] h-[33px]  w-[200px] text-[22px] ${Theme.rightCTA}`}
                    >
                      그룹 스트링캣 만들기
                      <div className=" bottom-[-4.5px] left-[-2px]"></div>
                    </div>
                  </button>
                </div>
                <div className="inline text-[22px] text-strcat-default-cyan">
                  &nbsp;를 누르면 여러 문자열을 한 그룹으로 관리할 수 있어요.
                  주렁주렁~
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-row">
          <div className="basis-1/2"></div>
          <div className="basis-1/2">
            <Image
              src="/strcatImage.png"
              width={153}
              height={1040}
              alt="Image"
              className="mr-[24px] mt-[228px]"
            />
          </div>
=======
    <div className={` bg-strcat-black h-auto min-h-full`}>
      <div className="flex flex-col pt-[152px] items-center justify-center">
        <Image
          src="/StrcatIcon.svg"
          width={42}
          height={42}
          alt="mainStrcatIcon"
        />
        <div className=" font-bold text-[28px] py-[11px] text-white">
          스트링캣
        </div>
        <div className=" text-body-size2 text-white opacity-50">
          함께 문장을 이어가는 롤링페이퍼
        </div>
        <div className="pt-[167px]  text-body-size2 text-white opacity-50 text-center">
          내 롤링페이퍼에서 <br /> 친구들의 이야기를 듣고 싶다면
        </div>
        <div className="flex flex-row mt-[16px] w-[252px] h-[44px] bg-strcat-bright-yellow rounded-[5px] justify-center items-center">
          <div
            className=" text-body-size2 font-bold"
            onClick={handleClickPersonal}
          >
            스트링캣 시작하기
          </div>
          <Image
            src="/IconNext.svg"
            width={24}
            height={24}
            alt="mainStrcatIcon"
          />
>>>>>>> origin
        </div>
        <div className="pt-[54px]">
          <Image
            className="animate-bounce"
            src="/IconUnder.svg"
            width={30}
            height={21}
            alt="IconUnder"
            onClick={() => focusToHighlight(ref)}
          />
        </div>
        <div className="pt-[100px] pb-[500px]">
          <div ref={ref} />
          <MainManStrcat />
        </div>
      </div>
    </>
  );
}
