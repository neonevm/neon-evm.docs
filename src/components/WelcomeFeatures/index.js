import React from 'react';
import clsx from 'clsx';
import styles from './WelcomeFeatures.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import * as icons from '@fortawesome/free-regular-svg-icons'


const FeatureList = [
  {
    title: 'Start Deploying dApps',
    icon: icons.faCompass,
    url: '/docs/developing/getting_started',
    description: (
      <>

      </>
    ),
  }, {
    title: 'Run a Proxy Server',
    icon:  icons.faNewspaper,
    url: 'docs/operating/operator_guide',
    description: (
      <>

      </>
    ),
  }, {
    title: 'Manage a Wallet',
    icon:  icons.faChartBar,
    url: 'docs/wallet/metamask_setup',
    description: (
      <>

      </>
    ),
  }, {
    title: 'Transfer SPL Tokens',
    icon:  icons.faHandshake,
    url: 'docs/token_transferring/neonpass_usage',
    description: (
      <>

      </>
    ),
  }, {
    title: 'Learn How Neon EVM Works',
    icon:  icons.faObjectGroup,
    url: 'docs/architecture/neon_evm_arch',
    description: (
      <>

      </>
    ),
  }, {
    title: 'FAQ',
    icon:  icons.faCircleQuestion,
    url: 'docs/faq/what-is-neon',
    description: (
      <>

      </>
    ),
  }
];

function Feature({title, icon, url, description}) {
  return (
    <div className={clsx('col col--4')} >
      <div className={styles.feature}>
      <Link to={url} className={styles.featureCard}>
        <div className={styles.featureCardHeader}>
          <FontAwesomeIcon className={styles.featureIcon} icon={icon}  size='lg'/>
          <h3 className={styles.featureCardTitle}>{title}</h3>
        </div>
        <div className={styles.featureCardDesc}>
          <p>{description}</p>
        </div>
      </Link>
      </div>
    </div>
  );
}

export default function WelcomeFeatures() {

 return (
   <>
   <Head><title>Neon Docs</title></Head>
     <section className={styles.features}>
     <div className="container">
       <div className={`row ${styles.featuresRow}`}>
         {FeatureList.map((props, idx) => (
           <Feature key={idx} {...props} />
         ))}
       </div>
     </div>
     </section>
   </>
 );
}
