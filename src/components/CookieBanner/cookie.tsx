"use client";
import React, { useEffect } from "react";
import './styles.css';

export default function CookieComponent() {

  const classList = {
    container: 'cookie-banner',
    title: 'title',
    description: 'description',
    acceptCta: 'main',
    postponeCta: 'secondary'
  }

  useEffect(() => {
    import("neon-web-components/src/components/cookie-control.js");
  });

  return <div>
    <cookie-control
      containerClass={ classList.container }
      policyUrl={ 'https://neon-labs.org/cookie-policy' }
      linkTarget={ true }
      titleClass={ classList.title }
      descriptionClass={ classList.description }
      acceptCtaClass={ classList.acceptCta }
      postponeCtaClass={ classList.postponeCta }
    />
  </div>

}
