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
      algolia: {
        apiKey: 'b42bf0be9b7f964aa534f802164b53f8',
        appId: 'IMU5IHYKIJ',
        indexName: 'neon-labs',
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
            to: '/docs'
          },
          {
            label: 'Operate',
            position: 'left',
            to: '/docs/operating/operator_guide'
          },
          {
            label: 'Learn',
            position: 'left',
            to: '/docs/architecture/neon_evm_arch'
          }
          /*{
            href: 'https://github.com/neonlabsorg',
            label: 'GitHub',
            position: 'right',
          },*/
        ]
      },
      footer: {
        logo: {
          alt: 'Neon EVM',
          src: 'img/logo.svg'
        },
        links: [
          {
            title: 'Get started',
            items: [
              { label: '🏓 Quick Start', to: '/docs' },
              { label: '🧬 Neon EVM Overview', to: '/docs/about/why_neon' },
              { label: '🔑 Set up Wallet', to: '/docs/wallet/metamask_setup' },
              { label: '🪙 Tokens', to: '/docs/tokens/neon_token' },
              { label: '🛰 Transfer Tokens', to: '/docs/token_transferring/neonpass_usage' },
              { label: '💬 FAQ', to: '/docs/faq/what-is-neon' }
            ]
          },
          {
            title: 'Tools',
            items: [
              { label: 'BlockExplorer', href: 'https://neonscan.org/' },
              { label: 'NeonPass', href: 'https://neonpass.live/' },
              { label: 'NeonFaucet', href: 'https://neonfaucet.org/' },
              { label: 'Indexing Dashboard', href: 'https://neon.aleph.cloud/' },
            ]
          },
          {
            title: 'Developers',
            items: [
              { label: 'Connect to Neon RPC', to: '/docs/developing/connect_rpc' },
              { label: 'Request Test Tokens', to: '/docs/developing/utilities/faucet' },
              { label: 'Configure Dev Tools', to: '/docs/developing/deploy_facilities/configure_hardhat' },
              { label: 'Use Tokens', to: '/docs/developing/deploy_facilities/interacting_with_spl_tokens' },
              { label: 'Integrate', to: '/docs/developing/integrate/oracles/integrating_chainlink' },
              { label: 'Tutorials', to: '/docs/developing/deploy_facilities/using_hardhat' },
              { label: 'EVM Compatibility', to: '/docs/evm_compatibility/json_rpc_api_methods' },
              { label: 'Set up Neon EVM Locally', to: '/docs/developing/dev_environment/op2_local_proxy_local_solana' },
              { label: 'Learn', to: '/docs/architecture/neon_evm_arch' },
            ]
          },
          {
            title: 'Operators',
            items: [
              { label: 'Operator Requirements', to: '/docs/operating/operator_requirements' },
              { label: 'Running a Proxy server', to: '/docs/operating/operator_guide' },
            ]
          },
          {
            title: 'Governance',
            items: [
              { label: 'Overview', to: '/docs/governance/overview' },
              { label: 'Neon DAO Organization', to: '/docs/governance/neon_daos' },
              { label: 'Voting Process', to: '/docs/governance/proposals' },
              { label: 'Principles and Objectives', to: '/docs/governance/principles' },
            ]
          },
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
        redirects: [{ from: '/', to: '/docs' }],
        createRedirects(existingPath) {
          console.log(existingPath);
        }
      }
    ]
  ]
};

module.exports = config;
