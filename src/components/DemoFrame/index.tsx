import React from 'react';
import './styles.css';

export const DemoFrame = (props: { src: string, title?: string; }) => {
  return <>
    <iframe className='demo-frame'
            src={props.src}
            title={props.title ?? ''}
            allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
            sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
    ></iframe>
  </>;
};

export default DemoFrame;
