'use client';

import Drawer from '@/component/Drawer';
import StrcatHeader from '@/component/StrcatHeader';
import ExportTheme from './ExportTheme';
import { useEffect, useState } from 'react';
import { content } from '@/types/content';
import { axiosInstance } from '@/utils/axios';
import BottomButton from '@/component/BottomButton';
import Default from './Default';
import Writer from './Writer';
import LineBreak from './LineBreak';
import html2canvas from 'html2canvas';

const exportThemeEnum = {
  default: 'default',
  lineBreak: 'lineBreak',
  writer: 'writer',
};

const exportThemeButton = [
  {
    name: '기본',
    src: '/strcatButton.png',
    alt: 'strcatButton',
    select: exportThemeEnum.default,
  },
  {
    name: '줄바꿈',
    src: '/CalmButton.png',
    alt: 'CalmButton',
    select: exportThemeEnum.lineBreak,
  },
  {
    name: '작성자',
    src: '/GreenButton.png',
    alt: 'GreenButton',
    select: exportThemeEnum.writer,
  },
];

export default function Export() {
  const [title, setTitle] = useState<string>('');
  const [data, setData] = useState<content[] | undefined>(undefined);
  const [exportTheme, setExportTheme] = useState<string>(
    exportThemeEnum.default,
  );

  useEffect(() => {
    axiosInstance
      .get(`/api/personal`)
      .then((data) => {
        setTitle(data.data.title);
        setData(data.data.contents);
      })
      .catch((error) => {});
  }, []);

  const saveImageHandler = () => {
    const target = document.getElementById('content');
    if (!target) {
      return alert('결과 저장에 실패했습니다.');
    }
    html2canvas(target).then((canvas) => {
      const element = document.createElement('a');
      document.body.appendChild(element);
      element.href = canvas.toDataURL('image/png');
      element.download = `strcat_${title}.png`;
      element.click();
      document.body.removeChild(element);
    });
  };

  return (
    <div className="mb-10">
      <Drawer />
      <StrcatHeader />
      <div id="content" className=" mx-5 mt-5 text-[22px]">
        <div className=" mb-10">{title}</div>
        <div className=" text-justify  text-[18px]">
          {data?.map((item: content) => (
            <span key={item.id}>
              {exportTheme === exportThemeEnum.default && (
                <Default content={item} />
              )}
              {exportTheme === exportThemeEnum.writer && (
                <Writer content={item} />
              )}
              {exportTheme === exportThemeEnum.lineBreak && (
                <LineBreak content={item} />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className=" fixed bottom-5 w-full max-w-[calc(100vh*0.6)]">
        <div className="mb-5 flex w-full flex-row items-center justify-around">
          {exportThemeButton.map((item) => (
            <ExportTheme
              name={item.name}
              src={item.src}
              alt={item.alt}
              onClick={() => setExportTheme(item.select)}
            />
          ))}
        </div>
        <BottomButton
          name="저장하기"
          // w-full 안됨 왜??
          width="w-[370px]"
          onClickHandler={saveImageHandler}
          disabled={false}
        />
      </div>
    </div>
  );
}
