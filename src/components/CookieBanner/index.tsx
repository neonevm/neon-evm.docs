import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';

const COOKIES_EXPIRE = 'cookies:expire';
const COOKIES_ACCEPTED = 'cookies:accepted';

export const CookieBanner = () => {
  const [show, setShow] = useState(false);

  const isPostponeExpired = useMemo<boolean>(() => {
    const expire = localStorage.getItem(COOKIES_EXPIRE);
    if (typeof expire === 'string') {
      return Math.abs(Number(expire) - new Date().getTime()) / 36e5 > 24;
    }
    return true;
  }, []);

  useEffect(() => {
    setShow(isPostponeExpired && !JSON.parse(localStorage.getItem(COOKIES_ACCEPTED)));
  }, [isPostponeExpired]);

  const acceptCookies = () => {
    setShow(false);
    localStorage.setItem(COOKIES_ACCEPTED, 'true');
    localStorage.removeItem(COOKIES_EXPIRE);
  };

  const postponeCookies = () => {
    setShow(false);
    localStorage.setItem(COOKIES_ACCEPTED, 'false');
    localStorage.setItem(COOKIES_EXPIRE, new Date().getTime().toString());
  };

  if (show) {
    return <>
      <div className='cookie-banner'>
        <h4 className='title'>We use cookies</h4>
        <p className='description'>
          If you continue browsing, we consider that you have show <a
          href='https://neon-labs.org/cookie-policy' target='_blank'>cookies policy</a>.
        </p>
        <div className='actions'>
          <button className='main' onClick={acceptCookies}>Accept</button>
          <button className='secondary' onClick={postponeCookies}>Ask me later</button>
        </div>
      </div>
    </>;
  }

  return null;
};

export default CookieBanner;
