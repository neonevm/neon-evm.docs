import React, { useEffect, useState } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import './styles.css';

export const CookieBanner = () => {
  const { cookieBanner } = useThemeConfig();
  const [ accepted, setAccepted ] = useState(false);

  const isPostponeExpired = () => {
    const expire = localStorage.getItem('cookies:expire');
    if (!expire) {
      return false;
    }
    return Date.now() - Number(expire) > 24 * 60 * 60 * 1000
  }

  useEffect(() => {
    setAccepted(!isPostponeExpired() && localStorage.getItem('cookies:accepted') === 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem('cookies:accepted', accepted ? 'true' : 'false')
  }, [accepted])

  const acceptCookies = () => {
    setAccepted(true)

    localStorage.removeItem('cookies:expire')
  }

  const postponeCookies = () => {
    localStorage.setItem('cookies:expire', new Date().getTime().toString())

    setAccepted(true)
  }

  if (!cookieBanner || accepted) {
    return null
  }

  return <>
    <div className='cookie-banner'>
      <p className='title'>
        We use cookies
      </p>
      <p className='description'>
        If you continue browsing, we consider that you have accepted <a href='https://neon-labs.org/cookie-policy' target='_blank'>cookies policy</a>.
      </p>
      <div className='actions'>
        <button className='main' onClick={acceptCookies}>Accept</button>
        <button className='secondary' onClick={postponeCookies}>Ask me later</button>
      </div>
    </div>
  </>
}

export default CookieBanner
