import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import Discord from '@site/static/icons/s-discord.svg';
import Github from '@site/static/icons/s-github.svg';
import Medium from '@site/static/icons/s-medium.svg';
import Twitter from '@site/static/icons/s-twitter.svg';
import Youtube from '@site/static/icons/s-youtube.svg';
import './styles.css';

import CookieComponent from '@site/src/components/CookieBanner/cookie';

function Footer() {
  const { footer } = useThemeConfig();

  if (!footer) {
    return null;
  }

  return <footer className='footer'>
    <CookieComponent />
    <div className={'container container-fluid'}>
      <div className={'row footer__links'}>
        <div className='col footer__logo'>
          <img src='/img/logo.svg' alt='Neon EVM' />
        </div>
        {footer.links.map((links, key) => <div className='col footer__col' key={key}>
          <div className='footer__title'>{links.title}</div>
          <ul className='footer__items clean-list'>
            {links.items.map((link, key) => <li className='footer__item' key={key}>
                <Link className='footer__link-item' to={link.to} dangerouslySetInnerHTML={{__html: link.label}}></Link>
              </li>
            )}
          </ul>
        </div>)}
      </div>
      <div className={'row copy-info'}>
        <div className={'copy-info__item copyright'}>
          <Link to='https://neon-labs.org' className={'site'}>Neon-labs.org</Link>
          <span className={'copy'}>{footer.copyright}</span>
        </div>
        <div className={'copy-info__item'}>
          <Link to={'https://twitter.com/neonlabsorg'} className={'social-link'}><Twitter /></Link>
          <Link to={'https://discord.com/invite/d9BhxNWTsj'} className={'social-link'}><Discord /></Link>
          <Link to={'https://github.com/neonlabsorg'} className={'social-link'}><Github /></Link>
          <Link to={'https://www.youtube.com/channel/UCAL2uFkKkfBgz3mXFN3UDTQ'} className={'social-link'}><Youtube /></Link>
          <Link to={'https://medium.com/neon-labs'} className={'social-link'}><Medium /></Link>
        </div>
      </div>
    </div>
  </footer>;
}

export default Footer;
