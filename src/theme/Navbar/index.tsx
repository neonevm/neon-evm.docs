import React from 'react';
import './styles.module.css';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from './content';

const Navbar = () => {
  return <>
    <NavbarLayout>
      <NavbarContent />
    </NavbarLayout>
  </>;
};

export default Navbar;
