import React, { useState } from 'react';
import { HelpNo, HelpYes } from '@site/src/components/icons';
import './styles.css';

export const PageHelpful = (props) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = (type: 'yes' | 'no'): void => {
    if (!disabled) {
      if ('gtag' in window) {
        try {
          const gtag = window['gtag'] as any;
          gtag('event', 'PAGE_HELPFUL_FEEDBACK', { value: type });
        } catch (e) {
          console.log(e);
        }
      }
      setDisabled(true);
    }
  };

  return <>
    <div className={'page-helpful'}>
      <div className={'page-helpful-item title'}>Was this page helpful?</div>
      <div className={'page-helpful-item'}>
        <button className={'page-helpful-button'} onClick={() => handleSubmit('yes')}
                disabled={disabled}>
          <HelpYes />
          Yes
        </button>
        <button className={'page-helpful-button'} onClick={() => handleSubmit('no')}
                disabled={disabled}>
          <HelpNo />
          No
        </button>
      </div>
    </div>
  </>;
};

