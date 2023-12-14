import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import React from 'react';

import PhotoModal from './Modal/PhotoModal';
import PhotoPreview from '@/app/personal/[id]/PhotoPreview';
import { themeState } from '@/recoil/state';
import { content } from '@/types/content';
import { observeContent } from '@/types/observe';
import { focusToHighlight } from '@/utils/focusToHighlight';

interface props {
  content: content;
  observe: observeContent;
  theme: themeState;
  setObserve: Dispatch<SetStateAction<observeContent>>;
  openModal: (modalComponent: JSX.Element) => void;
  closeModal: () => void;
}

const ObserveContent = ({
  content,
  observe,
  setObserve,
  theme,
  openModal,
  closeModal,
}: props) => {
  const ref = useRef<HTMLHeadingElement | null>(null);

  const handleClickPhoto = () => {
    openModal(
      <PhotoModal
        photoUrl={content.photoUrl}
        closeModal={closeModal}
        text={content.text}
      />,
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting }) => {
          if (isIntersecting) {
            setObserve(() => ({
              contentId: content.id,
              photoUrl: content.photoUrl,
              writer: content.writer,
            }));
          }
        });
      },
      {
<<<<<<< HEAD
        rootMargin: '-30% 0% -70% 0%',
        threshold: [],
=======
        rootMargin: '-40% 0% -60% 0%',
        threshold: [0],
>>>>>>> origin
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref}>
      {observe.contentId === content.id && observe.photoUrl !== '' && (
        <PhotoPreview
          photoUrl={content.photoUrl}
          handleClickPhoto={handleClickPhoto}
        />
      )}
      <div
        className={`inline pt-[3px] pb-[4px] leading-[31px] text-body-size1 tracking-[-0.36px] font-medium
      ${
        observe.contentId === content.id
<<<<<<< HEAD
          ? `${theme.highlightText} ' duration-500' mb-2   w-full  scale-105 text-[22px] opacity-100 transition-all`
          : `${theme.defaultText} ' duration-500'  mb-2 w-full text-[22px] opacity-30 transition-all`
=======
          ? `${theme.bgTheme.contentContainer} ${theme.textTheme.highlight} transition `
          : `${theme.textTheme.default} opacity-[0.15]`
>>>>>>> origin
      }
    `}
        onClick={() => focusToHighlight(ref)}
      >
        {content.text}
      </div>
<<<<<<< HEAD
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
=======
      {observe.contentId === content.id && (
        <div
          className={`text-right transition-all ${theme.textTheme.writer} text-body-size2`}
        >{`From: ${
          observe.writer.length ? observe.writer : '익명의 스트링캣'
        } `}</div>
      )}
>>>>>>> origin
    </div>
  );
};

export default React.memo(ObserveContent);
