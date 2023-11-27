'use client';

import { useEffect, useRef, useState } from 'react';
import { axiosInstance } from '@/utils/axios';
import StrcatBoard from '@/component/StrcatBoard';
import BottomButton from '@/component/BottomButton';
import ContentPhoto from '@/component/ContentPhoto';
import { useRecoilState } from 'recoil';
import { themeObj, themeState } from '@/recoil/theme';
import Drawer from '@/component/Drawer';
import StrcatHeader from '@/component/StrcatHeader';
import { observeState } from '@/recoil/observe';
import { useRouter } from 'next/navigation';
import { board } from '@/types/boards';
import { scrollToAdd, setMap } from '@/utils/scrollTo';

export default function Personal({ params }: { params: { id: string } }) {
  const [board, setBoard] = useState<board>({
    id: 0,
    title: '',
    theme: 'strcat',
    content: [],
  });
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const itemsRef = useRef(new Map());
  const [observe] = useRecoilState(observeState);
  const [theme, setTheme] = useRecoilState(themeState);
  const router = useRouter();
  useEffect(() => {
    axiosInstance
      //.get(`/boards/${props.params.id}`)
      .get(`/api/personal`)
      .then((data) => {
        setBoard(data.data.board);
        setTheme(data.data.board.theme);
        setIsOwner(data.data.isOwner);
      })
      .catch((error) => {});
  }, [setTheme]);

  const handleClick = () => {
    setIsAdd(true);
    scrollToAdd(board.id, itemsRef);
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
      const id = params.id;
      const base = 'strcat.me/personal/';
      const url = base + id;
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
      <Drawer />
      <StrcatHeader />
      <div
        className={`relative w-full  p-[24px] text-justify ${
          themeObj[board.theme].background
        } pb-[500px]`}
      >
        <StrcatBoard
          board={board}
          ref={(node) => setMap(node, board, itemsRef)}
          isAdd={isAdd}
          setIsAdd={setIsAdd}
        />
        {!isAdd &&
          (isOwner ? (
            <div className="fixed bottom-5 left-0 z-50 flex w-full items-center justify-center">
              <div className="flex w-full max-w-[calc(100vh*0.6)] items-center justify-center px-[24px]">
                <BottomButton
                  height="h-[42px]"
                  name="저장"
                  width="basis-1/5"
                  onClickHandler={() => router.push(`./${params.id}/export`)}
                  disabled={false}
                  color={`bg-white`}
                />
                <BottomButton
                  name="공유"
                  height="h-[42px]"
                  width="basis-1/5"
                  onClickHandler={() => router.push(`./${params.id}/summary`)}
                  disabled={false}
                  color={`bg-strcat-green`}
                />
                <BottomButton
                  name="이어서 글쓰기"
                  height="h-[42px]"
                  width="basis-3/5"
                  onClickHandler={handleClick}
                  disabled={!observe.boardId}
                  color={`bg-strcat-cyan`}
                />
              </div>
            </div>
          ) : (
            <>
              <div className=" fixed bottom-0 left-0 z-50 flex w-full items-center justify-center">
                <div className="flex w-full max-w-[calc(100vh*0.6)] items-center justify-center px-[24px] ">
                  <BottomButton
                    name="스트링캣 만들기"
                    height="h-[42px]"
                    width="basis-1/2"
                    onClickHandler={() => router.push(`../create`)}
                    disabled={false}
                    color={`bg-white`}
                  />
                  <BottomButton
                    name="이어서 글쓰기"
                    width="basis-1/2"
                    height="h-[42px]"
                    onClickHandler={handleClick}
                    disabled={!observe.boardId}
                    color={`bg-strcat-cyan`}
                  />
                </div>
              </div>
            </>
          ))}
        {!isAdd && <ContentPhoto />}
        <button
          className="  h-32 w-32 bg-slate-200"
          onClick={() => handleShare()}
        >
          공유하기
        </button>
      </div>
    </>
  );
}
