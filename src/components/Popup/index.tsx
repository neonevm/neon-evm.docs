import React  from 'react';
import ReactTooltip from 'react-tooltip';

export function Popup<FC>() {
  return <>
    <div className={'popup-button'}>
      <button
        data-tip="Lorem ipsum dolor sit amet,<br> consectetur adipisicing elit"
      >
        test button
      </button>

      <ReactTooltip multiline={true} />
    </div>
  </>
}
