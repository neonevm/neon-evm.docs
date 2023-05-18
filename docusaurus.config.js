// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Neon Docs',
  tagline: 'Neon EVM is an open source project implementing the Ethereum virtual machine on Solana.',
  url: 'https://docs.neon-labs.org',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'neonlabsorg',
  projectName: 'neon-evm.docs',
  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'true' }
    },
    {
      tagName: 'link',
      attributes: {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap',
        rel: 'stylesheet'
      }
    }
  ],
  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/og_image.png',
      cookieBanner: {},
      algolia: {
        apiKey: 'f091c9673db5f9d6b08e940901f8ede5',
        appId: '879GT1L978',
        indexName: 'neonfoundation',
        contextualSearch: true,
        placeholder: 'search something...',
        algoliaOptions: { 'facetFilters': ['type:$TYPE'] },
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
        title: 'NeonDocs',
        logo: {
          alt: 'Neon EVM',
          src: 'img/logo.svg'
        },
        items: [
          {
            label: 'Quick Start',
            position: 'left',
            to: '/docs/quick_start'
          },
          {
            label: 'Tutorials',
            position: 'left',
            to: '/docs/developing/deploy_facilities/using_hardhat'
          }
        ]
      },
      footer: {
        logo: {
          alt: 'Neon EVM',
          src: 'img/logo.svg'
        },
        links: [
          {
            title: 'Getting Started',
            items: [
              { label: '🏓 Quick Start', to: '/docs/quick_start' },
              { label: '🧬 Neon EVM Overview', to: '/docs/about/why_neon' },
              { label: '🔑 Set Up Wallet', to: '/docs/wallet/metamask_setup' },
              { label: '💰 Tokens', to: '/docs/tokens/neon_token' },
              { label: '🛰 Transfer Tokens', to: '/docs/token_transferring/neonpass_usage' },
              { label: '💬 FAQ', to: '/docs/faq/what-is-neon' }
            ]
          },
          {
            title: 'Tools',
            items: [
              { label: 'BlockExplorer', to: 'https://neonscan.org/' },
              { label: 'NeonPass', to: 'https://neonpass.live/' },
              { label: 'NeonFaucet', to: 'https://neonfaucet.org/' },
              { label: 'NeonAnalytics', to: 'https://neon.aleph.cloud/' }
            ]
          },
          {
            title: 'Developers',
            items: [
              { label: 'Connect to Neon RPC', to: '/docs/developing/connect_rpc' },
              { label: 'Request Test Tokens', to: '/docs/developing/utilities/faucet' },
              {
                label: 'Configure Dev Tools',
                to: '/docs/developing/deploy_facilities/configure_hardhat'
              },
              {
                label: 'Use Tokens',
                to: '/docs/developing/deploy_facilities/interacting_with_spl_tokens'
              },
              {
                label: 'Integrate',
                to: '/docs/developing/integrate/oracles/integrating_chainlink'
              },
              { label: 'Tutorials', to: '/docs/developing/deploy_facilities/using_hardhat' },
            ]
          },
          {
            title: 'Operators',
            items: [
              { label: 'Operate a Neon Proxy', to: '/docs/operating/overview/introduction' },
              { label: 'Command Line Flags', to: '/docs/operating/flags/flags' },
              { label: 'Operator Requirements', to: '/docs/operating/operator_requirements' },
              { label: 'Running a Proxy Server', to: '/docs/operating/operator_guide' }
            ]
          },
          {
            title: 'Governance',
            items: [
              { label: 'Overview', to: '/docs/governance/overview' },
              { label: 'Neon DAO Organization', to: '/docs/governance/neon_daos' },
              { label: 'Voting Process', to: '/docs/governance/proposals' },
              { label: 'Principles and Objectives', to: '/docs/governance/principles' }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Neon Labs` // OK
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    }),

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-Y5QG48111W'
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: '/docs', to: '/docs/quick_start' }
        ]
      }
    ]
  ]
};

module.exports = config;
