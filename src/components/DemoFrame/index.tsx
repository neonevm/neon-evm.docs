import React from 'react';
import './styles.css';

export const DemoFrame = ({ src, title, ...props }: { src: string, title?: string; }) => {
  return <>
    <iframe className='demo-frame'
            src={src}
            title={title ?? ''}
            allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
            sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
            {...props}
    ></iframe>
  </>;
};

export default DemoFrame;
