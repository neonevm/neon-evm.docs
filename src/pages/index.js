import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import WelcomeFeatures from '../components/WelcomeFeatures';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Learn what Neon EVM is and start building on Neon now">
        <WelcomeFeatures />
    </Layout>
  );
}