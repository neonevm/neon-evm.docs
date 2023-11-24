import React, { Dispatch, useMemo } from 'react';
import './style.css';

export function Proxy(props: { changeState: Dispatch<any>, theme: 'dark' | 'light'  }) {
  const { changeState, theme } = props;

  const backdropTheme = useMemo(() => {
    return theme === 'dark' ? '#60606066' : '#FFFFFF33';
  }, [theme]);

  const textColor = useMemo(() => {
    return theme === 'dark' ? '#FFFFFF' : '#010202';
  }, [theme]);

  const linkColor = useMemo(() => {
    return theme === 'dark' ? '#FF86FF' : '#E53B95';
  }, [theme]);

  const tooltipBg = useMemo(() => {
    return theme === 'dark' ? '#5B5959' : '#FFFFFF';
  }, [theme]);

  const closeColor = useMemo(() => {
    return theme === 'dark' ? '#FFFFFF' : '#66636F';
  }, [theme]);

  const closeBg = useMemo(() => {
    return theme === 'dark' ? '#1B1B1D' : '#FFFFFF';
  }, [theme]);

  const tooltipBorder = useMemo(() => {
    return theme === 'dark' ? '#FFFFFF' : '#66636F';
  }, [theme]);

  const onStateChange = (size: string) => {
    if (typeof changeState === 'function') {
      changeState(size);
    }
  }

  return <div className='white-backdrop' style={{ background: backdropTheme }} onClick={() => onStateChange(null)}>
    <svg viewBox="0 0 1916 794" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g onClick={e => e.stopPropagation()}>
        <g filter="url(#filter0_dddd_75_3643)">
          <rect x="739" y="321" width="402" height="183" rx="16" fill="white"/>
          <rect x="739" y="321" width="402" height="183" rx="16" fill="#F33F9A" fillOpacity="0.3"/>
        </g>
        <text fill="#232129" fontFamily="Inter" fontSize="28" fontWeight="bold" letterSpacing="-1.5px"><tspan x="771" y="366.182">Proxy Operators</tspan></text>
        <text fill="#66636F" fontFamily="Inter" fontSize="20" letterSpacing="-0.514979px"><tspan x="818" y="436.273">P2P</tspan></text>
        <path fillRule="evenodd" clipRule="evenodd" d="M769.149 425.012C769.068 425.012 769 425.079 769 425.157V429.597C769 429.675 769.068 429.742 769.149 429.742H780.97C781.051 429.742 781.119 429.675 781.119 429.597V425.157C781.119 425.079 781.051 425.012 780.97 425.012H769.149ZM779.531 428.27C779.574 428.27 779.605 428.24 779.605 428.198V426.569C779.605 426.526 779.574 426.496 779.531 426.496H770.589C770.545 426.496 770.514 426.526 770.514 426.569V428.198C770.514 428.24 770.545 428.27 770.589 428.27H779.531Z" fill="#232129"/>
        <path d="M770.508 431.674C770.508 431.595 770.44 431.528 770.359 431.528H769.149C769.068 431.528 769 431.595 769 431.674V432.855C769 432.933 769.068 433 769.149 433H770.359C770.44 433 770.508 432.933 770.508 432.855V431.674Z" fill="#232129"/>
        <path d="M798.401 431.674C798.401 431.595 798.333 431.528 798.252 431.528H797.042C796.962 431.528 796.893 431.595 796.893 431.674V432.855C796.893 432.933 796.962 433 797.042 433H798.252C798.333 433 798.401 432.933 798.401 432.855V431.674Z" fill="#232129"/>
        <path d="M782.937 431.674C782.937 431.595 783.006 431.528 783.086 431.528H794.908C794.988 431.528 795.056 431.595 795.056 431.674V432.855C795.056 432.933 794.988 433 794.908 433H783.092C783.012 433 782.944 432.933 782.944 432.855V431.674H782.937Z" fill="#232129"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M796.881 425.164C796.881 425.085 796.949 425.018 797.03 425.018H808.851C808.932 425.018 809 425.085 809 425.164V429.603C809 429.681 808.932 429.748 808.851 429.748H797.036C796.955 429.748 796.887 429.681 796.887 429.603V425.164H796.881ZM807.418 426.496C807.461 426.496 807.492 426.526 807.492 426.569V428.198C807.492 428.24 807.461 428.27 807.418 428.27H798.476C798.432 428.27 798.401 428.24 798.401 428.198V426.569C798.401 426.526 798.432 426.496 798.476 426.496H807.418Z" fill="#232129"/>
        <path d="M783.092 425.012C783.012 425.012 782.944 425.079 782.944 425.157V426.338C782.944 426.417 783.012 426.484 783.092 426.484H793.474C793.518 426.484 793.549 426.514 793.549 426.556V428.185C793.549 428.228 793.518 428.258 793.474 428.258H783.092C783.012 428.258 782.944 428.325 782.944 428.403V429.584C782.944 429.663 783.012 429.73 783.092 429.73H794.914C794.994 429.73 795.063 429.663 795.063 429.584V425.145C795.063 425.067 794.994 425 794.914 425H783.092V425.012Z" fill="#232129"/>
        <text fill="#66636F" fontFamily="Inter" fontSize="20" letterSpacing="-0.514979px"><tspan x="818" y="481.273">Everstake</tspan></text>
        <path d="M798.768 460.609C798.453 460.126 797.981 459.643 797.51 459.322C797.038 459.161 796.566 459 795.938 459H782.691C782.062 459 781.276 459.161 780.647 459.483C780.018 459.804 779.547 460.448 779.075 460.93L772.472 472.391C772.157 472.874 772 473.517 772 474C772 474.643 772.157 475.126 772.472 475.609L779.075 487.07C779.39 487.713 780.018 488.196 780.647 488.517C781.276 488.839 782.062 489 782.691 489H795.78C796.409 489 796.881 488.839 797.51 488.517C797.981 488.196 798.453 487.874 798.768 487.231L805.371 475.769C805.686 475.126 806 474.483 806 473.678C806 472.874 805.843 472.231 805.371 471.587L798.768 460.609ZM774.476 474.322L775.262 473.035L781.08 462.74L784.696 469.174C784.853 469.496 785.168 469.657 785.482 469.657C785.797 469.657 786.111 469.657 786.425 469.496C786.74 469.335 786.897 469.013 787.054 468.692C787.212 468.37 787.054 468.048 786.897 467.727L783.91 462.74C783.595 462.418 783.281 462.097 782.966 461.936C782.652 461.775 782.18 461.614 781.709 461.453H794.955L788.666 472.271L788.194 472.753C788.037 472.914 787.723 472.914 787.565 472.914H776.52C776.049 472.914 775.577 473.075 775.262 473.236C774.948 473.517 774.634 473.839 774.476 474.322ZM794.955 486.869H783.163L786.779 480.434C786.936 480.273 786.936 480.113 786.936 479.952V479.469L786.779 478.987C786.779 478.987 786.622 478.665 786.465 478.665C786.308 478.665 786.15 478.504 785.993 478.504H785.521L785.05 478.665L784.735 478.987L781.119 485.421L780.333 486.708C780.49 486.386 780.647 485.903 780.647 485.582C780.647 485.26 780.647 484.777 780.49 484.456L775.302 475.287H787.762C787.919 475.287 788.234 475.287 788.391 475.448L788.862 475.93L794.365 485.582C794.68 485.903 794.994 486.225 795.309 486.386C795.623 486.547 796.095 486.708 796.566 486.708H794.994V486.869H794.955ZM803.013 475.448L797.195 485.743L790.906 474.925C790.749 474.764 790.749 474.442 790.749 474.281C790.749 474.121 790.749 473.799 790.906 473.638L797.195 462.82L797.982 461.534C797.667 462.016 797.667 462.499 797.667 462.981C797.667 463.464 797.824 463.946 798.139 464.429C798.296 464.751 803.17 473.115 803.17 473.115H795.78C795.466 473.115 795.151 473.276 794.837 473.437C794.68 473.598 794.523 473.92 794.523 474.241C794.523 474.563 794.68 474.885 794.837 475.046C794.994 475.206 795.309 475.367 795.78 475.367H801.598C802.069 475.367 802.541 475.206 802.855 475.046C803.17 474.885 803.642 474.563 803.799 474.08C803.799 474.161 803.013 475.448 803.013 475.448Z" fill="#232129"/>
        <g filter="url(#filter1_b_75_3643)">
          <rect x="1019" y="351" width="650" height="437" rx="10" fill={tooltipBg} fillOpacity="0.5"/>
          <rect x="1018.5" y="350.5" width="651" height="438" rx="10.5" stroke={tooltipBorder}/>
        </g>
        <text fill={textColor} fontFamily="Inter" fontSize="25" fontWeight="bold" letterSpacing="-0.514979px"><tspan x="1437.35" y="428.091">Neon Proxy </tspan><tspan x="1049" y="668.091">Neon operators</tspan></text>
        <text fill={textColor} fontFamily="Inter" fontSize="25" letterSpacing="-0.514979px"><tspan x="1049" y="398.091">The </tspan><tspan x="1238.91" y="398.091">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is used to pay the </tspan><tspan x="1587.76" y="398.091"> </tspan><tspan x="1049" y="428.091">required for transaction execution </tspan><tspan x="1049" y="458.091">is&#xa0;an&#xa0;essential tool for packaging a Neon transaction </tspan><tspan x="1049" y="488.091">into a Solana transaction. It&#xa0;improves the user </tspan><tspan x="1049" y="518.091">experience for operators in&#xa0;the Neon ecosystem, </tspan><tspan x="1049" y="548.091">and it allows Ethereum dApps to be ported to Neon </tspan><tspan x="1049" y="578.091">with virtually no&#xa0;code or configuration changes, </tspan><tspan x="1049" y="608.091">as&#xa0;all the&#xa0;&#x201c;translating&#x201d; is&#xa0;handled by the proxy.&#10;</tspan><tspan x="1049" y="638.091">&#10;</tspan><tspan x="1231.39" y="668.091"> run Neon Proxy servers, which </tspan><tspan x="1049" y="698.091">helps facilitate seamless execution of Ethereum-like </tspan><tspan x="1049" y="728.091">transactions on Solana. This allows Ethereum dApps </tspan><tspan x="1049" y="758.091">to be ported to Neon with no code change</tspan></text>
        <a href="/docs/tokens/neon_token">
          <text fill={linkColor} fontFamily="Inter" fontSize="25" letterSpacing="-0.514979px" textDecoration="underline"><tspan x="1099.33" y="398.091">NEON token</tspan></text>
          <g>
            <path d="M1252.6 382.8H1266.2V396.4" stroke={linkColor} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
            <path d="M1266.2 382.8L1252.6 396.4" stroke={linkColor} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
            <circle cx="1259" cy="390" r="15" stroke={linkColor} strokeWidth="2"/>
          </g>
        </a>
        <a href="/docs/tokens/gas_fees">
          <text fill={linkColor} fontFamily="Inter" fontSize="25" letterSpacing="-0.514979px" textDecoration="underline"><tspan x="1491.85" y="398.091">gas fees</tspan></text>
          <g>
            <path d="M1602.6 382.8H1616.2V396.4" stroke={linkColor} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
            <path d="M1616.2 382.8L1602.6 396.4" stroke={linkColor} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
            <circle cx="1609" cy="390" r="15" stroke={linkColor} strokeWidth="2"/>
          </g>
        </a>
        <g onClick={() => onStateChange(null)} style={{cursor: 'pointer'}}>
          <circle cx="1019" cy="351" r="20.5" fill={closeBg} stroke={closeColor}/>
          <rect width="2" height="19" rx="1" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 1026.85 345.414)" fill={closeColor}/>
          <rect x="1012" y="345.414" width="2" height="19" rx="1" transform="rotate(-45 1012 345.414)" fill={closeColor}/>
        </g>
      </g>
      <defs>
        <filter id="filter0_dddd_75_3643" x="720.13" y="321" width="439.74" height="224.206" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="2.76726"/>
          <feGaussianBlur stdDeviation="1.1069"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.145098 0 0 0 0 0.0823529 0 0 0 0 0.239216 0 0 0 0.0934 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_75_3643"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="6.6501"/>
          <feGaussianBlur stdDeviation="2.66004"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.145098 0 0 0 0 0.0823529 0 0 0 0 0.239216 0 0 0 0.0967 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow_75_3643" result="effect2_dropShadow_75_3643"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="12.5216"/>
          <feGaussianBlur stdDeviation="5.00862"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.145098 0 0 0 0 0.0823529 0 0 0 0 0.239216 0 0 0 0.105 0"/>
          <feBlend mode="normal" in2="effect2_dropShadow_75_3643" result="effect3_dropShadow_75_3643"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="22.3363"/>
          <feGaussianBlur stdDeviation="9.435"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.145098 0 0 0 0 0.0823529 0 0 0 0 0.239216 0 0 0 0.1233 0"/>
          <feBlend mode="normal" in2="effect3_dropShadow_75_3643" result="effect4_dropShadow_75_3643"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_75_3643" result="shape"/>
        </filter>
        <filter id="filter1_b_75_3643" x="993" y="325" width="702" height="489" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="12.5"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_75_3643"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_75_3643" result="shape"/>
        </filter>
      </defs>
    </svg>
  </div>;
}

export default Proxy;
