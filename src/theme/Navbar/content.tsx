import React, { type ReactNode } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
// @ts-ignore
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';

import styles from './styles.module.css';

export function splitNavbarItems<T extends { position?: 'left' | 'center' | 'right' }>(items: T[]): [leftItems: T[], rightItems: T[]] {
  function isLeft(item: T): boolean {
    return (item.position) === 'left';
  }

  function isRight(item: T): boolean {
    return (item.position) === 'right';
  }

  const leftItems = items.filter(isLeft);
  const rightItems = items.filter(isRight);

  return [leftItems, rightItems];
}

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): JSX.Element {
  return <>{items.map((item, i) => <NavbarItem {...item} key={i} />)}</>;
}

function NavbarContentLayout(props: { left: ReactNode; center: ReactNode; right: ReactNode; }) {
  const { left, center, right } = props;
  return (
    <div className='navbar__inner'>
      <div className='navbar__items'>{left}</div>
      <div className='navbar__items navbar__items--center'>{center}</div>
      <div className='navbar__items navbar__items--right'>{right}</div>
    </div>
  );
}

export default function NavbarContent(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <NavbarContentLayout left={<>
      {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
      <NavbarLogo />
    </>} center={<>
      <NavbarItems items={leftItems} />
    </>} right={<>
      <NavbarItems items={rightItems} />
      <NavbarColorModeToggle className={styles.colorModeToggle} />
      {!searchBarItem && <NavbarSearch><SearchBar /></NavbarSearch>}
    </>}
    />
  );
}
