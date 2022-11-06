import React from 'react';
import './styles.css';
import { useThemeConfig } from '@docusaurus/theme-common';

const Header = () => {
  const {navbar} = useThemeConfig();

  return <>
    <nav className={'navbar navbar--fixed-top'}></nav>
  </>;
};

export default Header;
