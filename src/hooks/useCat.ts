import { useRecoilState } from 'recoil';

import { catAnimationState } from '@/recoil/theme/catAnimation';
import { themeState } from '@/recoil/theme/theme';
import { catAnimationDetail } from '@/types/animation';

export const useCat = (): [
  (element: string, catAction: string, second: number, theme: string) => void,
] => {
  const [, setCatAnimation] = useRecoilState(catAnimationState);

  const runCatAnimation = (
    elementId: string,
    catActionString: string,
    time: number,
    theme: string,
  ) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element === null) return;
      const elementLeft = element.getBoundingClientRect().left;
      const elementBottom = element.getBoundingClientRect().bottom;
      setCatAnimation({
        src: `/cats/${theme}/${catActionString}.gif`,
        catAction: catActionString,
        width: catAnimationDetail[catActionString].width,
        height: catAnimationDetail[catActionString].height,
        bottom:
          window.innerHeight -
          elementBottom +
          catAnimationDetail[catActionString].bottom,
        left: elementLeft + catAnimationDetail[catActionString].left,
      });
    }, time);
  };
  return [runCatAnimation];
};
