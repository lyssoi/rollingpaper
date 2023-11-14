'use client';

import { useEffect, useState, useRef } from 'react';
import { axiosInstance } from '@/utils/axios';
import StrcatComponent from '@/component/StrcatComponent';
import { board } from '@/types/boards';

export default function Home() {
  const [title, setTitle] = useState<string | null>();
  const [boardsTitle, setBoardsTitle] = useState<board[]>([]);
  const [boardsConetent, setBoardsContent] = useState<board[]>([]);
  const itemsRef = useRef(null);
  const scrollToId = (itemId: number) => {
    const map = getMap();
    const node = map.get(itemId);
    const offset = node.offsetTop;
    window.scrollTo({ top: offset, behavior: 'smooth' });
    // node.scrollIntoView({
    //   behavior: 'smooth',
    // });
  };

  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  };
  // const onHandleClick = (
  //   elementRef: MutableRefObject<HTMLDivElement | null>,
  // ) => {
  //   if (elementRef.current != null) {
  //     const offset = elementRef.current.offsetTop;
  //     window.scrollTo({
  //       top: offset,
  //       behavior: 'smooth',
  //     });
  //   }
  // };
  // scroll 이동을 위한 함수
  useEffect(() => {
    axiosInstance
      .get(`/api/group`)
      .then((data) => {
        setTitle(data.data.titleData.title);
        setBoardsTitle(data.data.titleData.boards);
        setBoardsContent(data.data.contentData);
      })
      .catch((error) => {});
  }, []);
  return (
    <div className=" w-full p-[24px]">
      <div className="mb-[20px]">
        <h1 className="black text-4xl ">{title}</h1>
      </div>
      <div>
        {boardsTitle.map((board: board) => {
          return (
            <div
              key={board.id}
              className="my-[32px]"
              onClick={() => scrollToId(board.id)}
            >
              <p className=" cursor-pointer text-xl">{board.title}</p>
            </div>
          );
        })}
      </div>
      <div>
        {boardsConetent.map((board) => {
          return (
            <StrcatComponent
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(board.id, node);
                } else {
                  map.delete(board.id);
                }
              }}
              key={board.id}
              title={board.title}
              data={board.content}
            ></StrcatComponent>
          );
        })}
      </div>
    </div>
  );
}
