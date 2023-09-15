import React, { useMemo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import './style.css';

export const ImgTheme = (props: { src: string; srcDark?: string; alt?: string; }) => {
  const { colorMode } = useColorMode();
  const { src, srcDark, alt = '' } = props;
  const srcResult = useMemo(() => {
    return typeof srcDark === 'string' && colorMode === 'dark' ? srcDark : src;
  }, [src, srcDark, colorMode]);
  return <div className='image-zoom'>
    <img src={srcResult} alt={alt} />
  </div>;
};
