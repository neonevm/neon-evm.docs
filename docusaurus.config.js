const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {

  title: 'Neon Docs',
  tagline: 'Neon EVM is an open source project implementing the Ethereum virtual machine on Solana.',
  url: 'https://doc.neon-labs.org', // !!! Path to the docs main page
  baseUrl: '/',
  onBrokenLinks: 'throw', // options: throw, warn
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/fav_192.png',
  organizationName: 'neonlabsorg', // Usually your GitHub org/user name.
  projectName: 'neon-evm.docs', // Usually your repo name.
  themeConfig: {
    image: 'img/og_image.png',
    algolia: {
      apiKey: 'b42bf0be9b7f964aa534f802164b53f8',
      appId: "IMU5IHYKIJ",
      indexName: 'neon-labs',
      contextualSearch: true,
      placeholder: 'search something...',
      algoliaOptions: { 'facetFilters': ["type:$TYPE"] },
      debug: false,
      dropdown: true
    },
    metadata: [
      {
        name: 'docsearch:language',
        content: 'en'
      }, {
        name: 'docsearch:version',
        content: 'current'
      }, {
        name: 'docsearch:docusaurus_tag',
        content: 'docs-default-current'
      }
    ],
    navbar: {
      title: 'Neon Docs',
      logo: {
        alt: 'Neon EVM',
        src: 'img/neon-logo.png',
      },
      items: [
        {
          label: 'Develop',
          position: 'left',
          to: 'docs/developing/getting_started',
        },
        {
          label: 'Operate',
          position: 'left',
          to: 'docs/operating/operator_guide',
        },
        {
          label: 'Learn',
          position: 'left',
          to: 'docs/architecture/neon_evm_arch',
        },
        {
          href: 'https://github.com/neonlabsorg',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/about/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.com/invite/d9BhxNWTsj', // OK
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/neonlabsorg', // OK
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'NeonLabs.org',
              to: 'https://neon-labs.org', // new
            },
            {
              label: 'GitHub',
              href: 'https://github.com/neonlabsorg', // OK
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Neon Labs`, // OK
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        gtag: {
          trackingID: 'G-Y5QG48111W'
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
