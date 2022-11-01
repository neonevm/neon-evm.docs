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
    // <link rel="preconnect" href="https://fonts.googleapis.com">
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'true' }
    },
    // <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
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
            label: 'Quick start',
            position: 'left',
            to: '/docs/quick_start'
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
            items: [{
              label: '🏓 Quick start',
              to: '/docs'
            }, {
              label: '🔑 Set up Wallet',
              to: 'docs/wallet/metamask_setup'
            }, {
              label: '🛰 Tokens Transferring',
              to: 'docs/token_transferring/neonpass_overview'
            }, {
              label: '💬 FAQ',
              to: '/docs/faq/what-is-neon'
            }]
          },
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/about/introduction'
              }
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/d9BhxNWTsj' // OK
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/neonlabsorg' // OK
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'NeonLabs.org',
                to: 'https://neon-labs.org' // new
              },
              {
                label: 'GitHub',
                href: 'https://github.com/neonlabsorg' // OK
              }
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
        redirects: [{ from: '/', to: '/docs/quick_start' }],
        createRedirects(existingPath) {
          console.log(existingPath);
        }
      }
    ]
  ]
};

module.exports = config;
