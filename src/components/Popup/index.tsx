import React from "react"
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import CloseSvg from '@site/static/icons/close.svg'
import './style.css'

interface PopupProps extends TooltipProps {
  children?: React.ReactNode;
  closePosition?: 'left' | 'center'
}

export const Popup = (props: PopupProps) => {
  const { children } = props;

  return <>
    <ReactTooltip
      { ...props }
      globalEventOff="click"
      className="tooltip-container"
      place="bottom"
      effect="solid"
    >
      <CloseSvg className={`tooltip-close ${props.closePosition ? props.closePosition : ''}`} />
      {children}
    </ReactTooltip>
  </>
}
