import { content } from '@/types/content';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { observeState } from '@/recoil/observe';
import React from 'react';
import { themeObj, themeState } from '@/recoil/theme';
interface props {
  content: content;
  boardId: number;
  isAdd: boolean;
  boardTheme: 'strcat' | 'calm' | 'green' | 'cyan';
}

const ObserveContent = ({ content, boardId, isAdd, boardTheme }: props) => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [observe, setObserve] = useRecoilState(observeState);
  const [theme, setTheme] = useRecoilState(themeState);
  useEffect(() => {
    let ratio = 0.01;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, boundingClientRect }) => {
          ratio = 10 / boundingClientRect.height;
          if (!isAdd && isIntersecting) {
            setObserve(() => ({
              boardId: boardId,
              contentId: content.id,
              photoUrl: content.photo,
              writer: content.writer,
            }));
            setTheme(() => themeObj[boardTheme]);
          }
        });
      },
      {
        rootMargin: '-30% 0% -70% 0%',
        threshold: [],
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [
    boardId,
    content.id,
    content.photo,
    content.writer,
    setObserve,
    isAdd,
    setTheme,
    boardTheme,
  ]);

  return (
    <div className="inline">
      <div
        ref={ref}
        className={`
      ${
        !isAdd &&
        observe.boardId === boardId &&
        observe.contentId === content.id
          ? `${theme.highlightText} ' duration-500' mb-2   w-full  scale-105 text-[22px] opacity-100 transition-all`
          : `${theme.defaultText} ' duration-500'  mb-2 w-full text-[22px] opacity-30 transition-all`
      }
    `}
      >
        {content.text}
      </div>
      {!isAdd &&
        observe.boardId === boardId &&
        observe.contentId === content.id && (
          <div
            className={`absolute right-[22px] z-10 mt-[1px] animate-slide bg-strcat-green pl-[2px] text-white opacity-100`}
          >
            <div
              className={`relative top-[-3px] z-20 w-full whitespace-pre-wrap bg-strcat-green`}
            >{`From: ${observe.writer} `}</div>
          </div>
        )}
    </div>
  );
};

export default React.memo(ObserveContent);
