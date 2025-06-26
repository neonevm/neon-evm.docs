import React from 'react';
import buildYourDapp from '@site/static/data/build-your-dapp.json';
import styles from './styles.module.css'

export function BuildYourDapp<FC>() {
  return (
    <div className={styles.content}>
      <div>
        <h4>
          {buildYourDapp.title}
        </h4>
        <p className={styles.description}>
          {buildYourDapp.description}
        </p>
      </div>
      <div className={styles.wrapper}>
        {buildYourDapp.content.map(i => (
          <a href={i.link} target='_blank' className={styles.item}>
            <div>
              <span className={styles.itemTitle}>
              {i.title}
            </span>
              <p className={styles.itemDescription}>
                {i.description}
              </p>
            </div>
            <img className={styles.itemIcon} src='/icons/arrow-right.svg' alt={i.title} />
          </a>
        ))}
      </div>
      <div className={styles.action}>
        <a target='_blank' className={styles.actionLink} href={buildYourDapp.action.link}>
          {buildYourDapp.action.title}</a>
        <img src={buildYourDapp.action.icon} alt={buildYourDapp.action.title} />
      </div>
    </div>
  )
}
