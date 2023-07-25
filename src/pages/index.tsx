import React from 'react';
import { Redirect } from '@docusaurus/router';
import ReactGA from "react-ga4";

ReactGA.initialize("G-S3B89Y6LRP");

export default function Home(): JSX.Element {
  return <Redirect to='/docs/quick_start' />;
}
