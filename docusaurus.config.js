const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Neon Docs',
  tagline: 'Neon EVM is an open source project implementing the Ethereum virtual machine on Solana.',
  url: 'https://doc.neonlabs.org', // !!! Path to the docs main page
  baseUrl: '/',
  onBrokenLinks: 'throw', // options: throw, warn
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/fav_192.png',
  organizationName: 'neonlabsorg', // Usually your GitHub org/user name.
  projectName: 'neon-evm.docs', // Usually your repo name.
  themeConfig: {
    image: 'img/og_image.png',
    algolia: {
      apiKey: 'd6087190dcafb13244b08a148f16fd70',
      indexName: 'neon-labs',
      inputSelector: 'search something...',
      algoliaOptions: { 'facetFilters': ["type:$TYPE"] },
      debug: false,
      dropdown: true
    },
    navbar: {
      title: 'Neon Docs',
      logo: {
        alt: 'Neon EVM',
        src: 'img/neon-logo.png',
      },
      items: [
        {
          to: 'docs/wallet/setup_metamask/metamask_setup',
          label: 'Develop',
          position: 'left',
        },
        {
          to: 'docs/proxy/connect_to_solana_via_proxy',
          label: 'Operate',
          position: 'left',
        },
        {
          to: 'docs/software_manuals/foundational_topics/web3',
          label: 'Manuals',
          position: 'left',
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
              to: '/docs/intro',
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
              to: 'https://neonlabs.org', // new
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
