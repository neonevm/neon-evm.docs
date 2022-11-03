import React from 'react';
import './style.css';

export interface CommonBannerBlockProps {
  title: string;
  description: string;
  icon: string;
  background: string;
}

export const CommonBannerBlock = (props: CommonBannerBlockProps) => {
  const { title, description, icon, background } = props;

  return <>
    <h2>{title}</h2>
    <div className={'common-banner'} style={{ background }}>
      <div className={'image'}>
        <img src={icon} alt={icon} />
      </div>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  </>;
};
