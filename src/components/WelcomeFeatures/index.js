import React from 'react';
import clsx from 'clsx';
import styles from './WelcomeFeatures.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { faNewspaper, faCompass, faKeyboard, faPaperPlane } from '@fortawesome/free-regular-svg-icons'


const FeatureList = [
  {
    title: 'Introduction',
    icon: faNewspaper,
    url: '/docs/intro',
    description: (
      <>
        Learn more about Neon and how it works
      </>
    ),
  },
  {
    title: 'Getting Started',
    icon: faCompass,
    url: '/docs/getting_started',
    description: (
      <>
        Start building on Neon
      </>
    ),
  },
  {
    title: 'Нow to deploy a Solidity Smart Contract',
    icon: faKeyboard,
    url: '/docs/software_manuals/how_to_guides/deploy_contract/',
    description: (
      <>
        Move your dApp to Solana and enjoy it's advantages
      </>
    )
  },
  {
    title: 'Neon Swap',
    icon: faPaperPlane,
    url: '/docs/neonswap/neonswap_overview/',
    description: (
      <>
        Play with one of the biggest dApps running on Solana testnet
      </>
    ),
  },
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

// export default function HomepageFeatures() {
//   return (
//     <section className={styles.features}>
//       <div className="container">
//         <div className="row">
//         </div>
//       </div>
//     </section>
//   );
// }