import React, { useEffect, useState } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import './styles.css';

export const CookieBanner = () => {
  const { cookieBanner } = useThemeConfig();
  const [ accepted, setAccepted ] = useState(false);

  useEffect(() => {
    const storageAccepted = localStorage.getItem('cookies:accepted') === 'true'

    if (storageAccepted) {
      setAccepted(storageAccepted)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cookies:accepted', accepted ? 'true' : 'false')
  }, [accepted])

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
        <button onClick={() => setAccepted(true)}>Accept</button>
      </div>
    </div>
  </>
}

export default CookieBanner
