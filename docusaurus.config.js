const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Neon EVM Docs',
  tagline: 'Neon EVM is an open source project implementing the Ethereum virtual machine on Solana.',
  url: 'https://doc.neonlabs.org', // !!! Path to the docs main page 
  baseUrl: '/',
  onBrokenLinks: 'throw', // options: throw, warn
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/neon_logo_colors.png',
  organizationName: 'neonlabsorg', // Usually your GitHub org/user name.
  projectName: 'neon-evm.docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Neon Docs',
      logo: {
        alt: 'Neon EVM',
        src: 'img/neon-logo.png',
      },
      items: [
//        {
//          type: 'doc',
//          docId: 'intro', // Tutorial 
//          position: 'left',
//          label: 'Tutorial',
//        },
//        {to: '/blog', label: 'Blog', position: 'left'},
        {
          to: 'docs/devportal/eth_sol_solution',
          label: 'Develop',
          position: 'left',
        },
        {
          to: 'docs/software_manuals/foundational_topics/web3#',
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
//            {
//              label: 'Stack Overflow',
//              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
//            },
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
      copyright: `Copyright © ${new Date().getFullYear()} Solana Foundation`, // OK
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
          // Please change this to your repo.
          editUrl:
            'https://github.com/neonlabsorg/neon-evm.docs',
        },
//        blog: {
//          showReadingTime: true,
//          // Please change this to your repo.
//          editUrl:
//            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
//        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
