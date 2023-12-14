'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import NoneContent from './NoneContent';
import Summary from './Summary';
import BottomButton from '@/component/BottomButton';
import Loading from '@/component/Loading';
import StrcatBoard from '@/component/StrcatBoard';
import { useLogin } from '@/hooks/useLogin';
import { useScroll } from '@/hooks/useScroll';
import { themeState, titleState } from '@/recoil/state';
import { board } from '@/types/boards';
import { axiosInstance } from '@/utils/axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

require('intersection-observer');
export default function Personal({ params }: { params: { id: string } }) {
  const [board, setBoard] = useState<board[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const [theme] = useRecoilState(themeState);
  const router = useRouter();
  const [isLogin] = useLogin();
  const [, setTitle] = useRecoilState(titleState);
  const { isHidden, setIsHidden } = useScroll();

  useEffect(() => {
    axiosInstance
      .get(`/boards/${params.id}`)
      .then((data) => {
        setBoard([data.data.board]);
        setIsOwner(data.data.isOwner);
      })
      .catch((err) => {
        if (err.response.status === 406) router.push('/not-found');
      });
    if (window) setWindowHeight(window.innerHeight);
  }, [params.id]);

  useEffect(() => {
    if (!board.length) return;
    setTitle(board[0].title);
  }, [board]);

  const handleClickWrite = () => {
    router.push(`${params.id}/add`);
  };

  const handleClickCreate = () => {
    if (!isLogin) {
      localStorage.setItem(
        'strcat_login_success_url',
        `/personal/${params.id}`,
      );
      router.push('/login');
    } else {
      router.push('/personal/${params.id}');
    }
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '내 스트링캣 공유하기',
          text: 'strcat을 달아주세요~~',
          url: `strcat.me/personal/${params.id}`,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      const url = `https://strcat.me/personal/${params.id}`;
      const handleCopyClipBoard = async (text: string) => {
        try {
          await navigator.clipboard.writeText(text);
          alert('strcat주소가 복사되었습니다! 친구에게 공유해보세요');
        } catch (error) {
          alert('복사 실패하였습니다');
        }
      };
      handleCopyClipBoard(url);
    }
  };

  return (
    <>
      <div
<<<<<<< HEAD
        className={`relative w-full  py-[24px] text-justify ${
          themeObj[board.theme].background
        } pb-[500px]`}
=======
        className={`${theme.bgTheme.background} min-h-full`}
        onClick={() => {
          setIsHidden(!isHidden);
        }}
>>>>>>> origin
      >
        {board.length ? (
          <>
            <div className="pt-[100px]" />
            {board[0].contents.length !== 0 && <Summary id={params.id} />}
            <div className="pt-[150px]" />
            {board[0].contents.length === 0 && (
              <NoneContent handleClickNoneContent={handleClickWrite} />
            )}
            <StrcatBoard board={board[0]} />
          </>
        ) : (
          <Loading />
        )}
        <div style={{ minHeight: `${windowHeight}px` }}></div>
        {isOwner ? (
          <div
            className={`fixed bottom-0 pb-[12px] left-0 z-20 flex w-full items-center justify-center transition-transform duration-300 ${
              isHidden ? 'translate-y-full' : 'translate-y-0'
            }`}
          >
            <div className="flex w-full max-w-md items-center justify-center px-[24px] space-x-[12px]">
              <div className="flex basis-1/12 items-center justify-center">
                <div
                  className={`h-[46px] flex rounded-[5px] w-[46px] justify-center items-center ${theme.bgTheme.leftCTA}`}
                >
                  <Image
                    src="/Download.svg"
                    width={24}
                    height={24}
                    alt="Download"
                  />
                </div>
              </div>
<<<<<<< HEAD
            </>
          ))}
        {!isAdd && <ContentPhoto />}
        <button
          className="  h-32 w-32 bg-slate-200"
          onClick={() => handleShare()}
        >
          공유하기
        </button>
=======
              <BottomButton
                textColor="text-strcat-bright-yellow"
                name="공유하기"
                height="h-[46px]"
                width="basis-5/12"
                onClickHandler={() => router.push(`${params.id}/summary`)}
                disabled={false}
                color={`${theme.bgTheme.leftCTA}`}
              />
              <BottomButton
                textColor="text-strcat-bright-yellow"
                name="글쓰기"
                height="h-[46px]"
                width="basis-5/12"
                onClickHandler={handleClickWrite}
                disabled={false}
                color={`${theme.bgTheme.rightCTA}`}
              />
            </div>
          </div>
        ) : (
          <>
            <div
              className={`fixed bottom-0 pb-[12px] left-0 z-20 flex w-full items-center justify-center transition-transform duration-300 ${
                isHidden ? 'translate-y-full' : 'translate-y-0'
              }`}
            >
              <div className="flex w-full max-w-md items-center justify-center px-[24px] space-x-[12px] ">
                <BottomButton
                  textColor=" text-strcat-white2"
                  name="나도 만들기"
                  width="basis-1/3"
                  height="h-[46px]"
                  onClickHandler={handleClickCreate}
                  disabled={false}
                  color={`${theme.bgTheme.leftCTA}`}
                />
                <BottomButton
                  textColor=" text-strcat-bright-yellow"
                  name="글쓰기"
                  width="basis-2/3"
                  height="h-[46px]"
                  onClickHandler={handleClickWrite}
                  disabled={false}
                  color={`${theme.bgTheme.rightCTA}`}
                />
              </div>
            </div>
          </>
        )}
>>>>>>> origin
      </div>
    </>
  );
}
