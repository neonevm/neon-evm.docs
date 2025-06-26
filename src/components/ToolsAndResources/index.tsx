import React from 'react';
import toolsAndResources from '@site/static/data/tools-and-resources.json'
import styles from './styles.module.css'

export function ToolsAndResources<FC>() {
  return (
    <div className={styles.content}>
      <div>
        <h4>
          {toolsAndResources.title}
        </h4>
      </div>
      <div className={styles.wrapper}>
        {toolsAndResources.content.map(i => (
          <a href={i.link} target='_blank' className={styles.item}>
            <span>
              {i.title}
            </span>
            <img src="/icons/arrow-top-right.svg" alt={i.title} />
          </a>
        ))}
      </div>
    </div>
  )
}
