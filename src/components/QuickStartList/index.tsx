import React from 'react';
import solanaNative from '@site/static/data/solana-native-data.json';
import Link from '@docusaurus/Link';
import './styles.css';

export interface QuickStartData {
  id: number;
  title: string;
  description?: string;
  url?: string;
}

export interface QuickStartListData {
  id: number;
  title: string;
  icon: string;
  items: QuickStartData[];
}

export function QuickStartItem({ data }: { data: QuickStartData }) {
  return <>
    <Link className={'quick-start-item'} to={data.url}>
      <div>
        <div className={'quick-start-title'}>{data.title}</div>
        {!!data.description && (
          <span className={'quick-start-description'}>{data.description}</span>
        )}
      </div>
    </Link>
  </>;
}

function SolanaNativeSection<FC>() {
  return <>
    <div>
      <h4>
        { solanaNative.title }
      </h4>
      <p style={{ fontSize: '14px' }}>
        { solanaNative.description }
      </p>
    </div>
    <div className={'list-wrapper'}>
      {solanaNative.content.map(i => <div className={'list-wrapper_item'} key={i.id}>
        <div className={'list-wrapper_item-heading'}>
          <img src={i.icon} alt={i.title} />
          <h3>{i.title}</h3>
        </div>
        {i.items.map((d, i) => <QuickStartItem data={d} key={i} />)}
      </div>)}
    </div>
  </>;
}

export function QuickStartList<FC>() {
  return <>
    <SolanaNativeSection />
  </>;
}
