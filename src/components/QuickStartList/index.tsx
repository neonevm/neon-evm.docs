import React, { useState } from 'react';
import linkList from '@site/static/data/link-list.json';
import './styles.css';

export interface QuickStartData {
  id: number;
  icon: string;
  title: string;
  description: string;
  url?: string;
}

export interface QuickStartListData {
  id: number;
  title: string;
  items: QuickStartData[];
}

export function QuickStartItem({ data }: { data: QuickStartData }) {
  return <>
    <div className={'quick-start-item'}>
      <div className={'quick-start-icon'}>
        <img src={data.icon} alt='' />
      </div>
      <div className={'quick-start-content'}>
        <div className={'quick-start-title'}>{data.title}</div>
        <div className={'quick-start-description'}>{data.description}</div>
      </div>
    </div>
  </>;
}

export function QuickStartList<FC>() {
  const [list] = useState<QuickStartListData[]>(linkList);

  return <>
    <div className={'list-wrapper'}>
      {list.map(i => <div className={'list-wrapper_item'} key={i.id}>
        <h3>{i.title}</h3>
        {i.items.map((d, i) => <QuickStartItem data={d} key={i} />)}
      </div>)}
    </div>
  </>;
}
