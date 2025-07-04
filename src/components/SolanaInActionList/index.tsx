import React from 'react';
import solanaNativeInAction from '@site/static/data/solana-native-in-action.json';
import styles from './styles.module.css';

export function SolanaInActionList<FC>() {
  return (
    <div className={styles.content}>
      <div>
        <h4>
          { solanaNativeInAction.title }
        </h4>
      </div>
      <div className={styles.wrapper}>
        {solanaNativeInAction.content.map(i => (
          <div className={styles.item} key={i.id}>
            <div className={styles.itemIcon}>
              <img src={i.icon} alt={i.title} />
            </div>
            <div>
              <h5 className={styles.itemTitle}>
                {i.title}
              </h5>
              <p className={styles.itemDescription}>
                {i.description}
              </p>
            </div>
            <div>
              <a className={styles.itemLink} href={i.link.url} target='_blank'>{i.link.title}</a>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.action}>
        <a target='_blank' className={styles.actionLink} href={solanaNativeInAction.action.link}>
          {solanaNativeInAction.action.title}
        </a>
        <img src={solanaNativeInAction.action.icon} alt={solanaNativeInAction.action.title} />
      </div>
    </div>
  );
}
