import React from 'react';
import './styles.css';

export interface ServiceLinkProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

export const ServiceLink = (props: ServiceLinkProps) => {
  const {title, description, icon, link} = props;
  return <>
    <div className={'service-link'}>
      <div className={'service-link-icon'}>
        <img src={icon} alt={icon} />
      </div>
      <div className={'service-link-content'}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      {link && <a className={'service-link-href'} href={link} target={'_blank'}/>}
    </div>
  </>;
};

