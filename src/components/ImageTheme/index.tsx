import React, { useMemo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import './style.css';

export const ImgTheme = (props: { src: string; srcDark?: string; alt?: string; description?: string; }) => {
  const { colorMode } = useColorMode();
  const { src, srcDark, alt = '', description = '' } = props;
  const srcResult = useMemo(() => {
    return typeof srcDark === 'string' && colorMode === 'dark' ? srcDark : src;
  }, [src, srcDark, colorMode]);

  return <figure className='image-zoom'>
    <img src={srcResult} alt={alt} />
    {description && <div className='description'>{description}</div>}
  </figure>;
};
