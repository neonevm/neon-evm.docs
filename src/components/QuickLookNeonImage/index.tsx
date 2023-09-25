import React, { useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Ecosystem } from './ecosystem';
import { NeonEvm } from './neon-evm';
import { Proxy } from './proxy';
import './style.css';

export function QuickLookNeonImage() {
  const { colorMode } = useColorMode();
  const [state, setState] = useState(null);

  return <>
    <div className={`image-container`}>
      <Ecosystem changeState={setState} state={state} theme={colorMode}></Ecosystem>
      {state === 'neon' && <NeonEvm changeState={setState} theme={colorMode}></NeonEvm>}
      {state === 'proxy' && <Proxy changeState={setState} theme={colorMode}></Proxy>}
    </div>
  </>;
}
