/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  tutorialSidebar: [ {
      type: 'category',
      label: 'About',
      items: [
        'intro',
        'glossary',
      ],
    }, {
      type: 'category',
      label: 'Wallets',
      items: [
          "wallet/metamask_setup"
      ]
    }, {
      type: 'category',
      label: 'Token transferring',
      items: [
        'token_transferring/neonpass_overview',

      ]
    }, {
      type: 'category',
      label: 'Developing',
      items: [
        'developing/getting_started',
        {
          type: 'category',
          label: 'Development environment',
          items: [
              'developing/dev_environment/connect_to_solana_via_proxy',
              'wallet/metamask_setup',
              'developing/dev_environment/choosing_proxy',
              'developing/dev_environment/solana_cluster/cluster_installation'
          ]
        },
        "developing/neonswap_tests",
        {
          type: 'category',
          label: 'Deploying dApps',
          items: [ { type: 'doc', id: 'developing/deploy_facilities/using_remix', label: "Using Remix" },
                   { type: 'doc', id: 'developing/deploy_facilities/using_truffle', label: "Using Truffle" },
                   { type: 'doc', id: 'developing/deploy_facilities/using_hardhat', label: 'Using HardHat' },
                   { type: 'doc', id: 'developing/deploy_facilities/using_erc20_tokens', label: 'Using ERC-20 tokens' },
                   'developing/deploy_facilities/adding_new_tokens',
                   'developing/deploy_facilities/migrating_dapps'
          ]
        }, {
          type: 'category',
          label: 'Using utilities',
          items: [ "developing/utilities/neonswap" ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Explorers',
      link: {
        type: 'doc',
        id: 'explorers',
      },
      items:
      [ {
          type: 'link',
          label: 'NeonScan',
          href: "https://beta.neonscan.org/"
        }, {
          type: 'link',
          label: 'Neon analytics by aleph',
          href: "http://neonqltest.aleph.cloud:8004/"
        }
        // 'architecture/eth_sol_solution',
        // 'architecture/neon_evm_arch',
        // 'architecture/value_token',
      ],
    }, {
      type: 'category',
      label: 'Devportal',
      items:
      [
        'devportal/bpf_trace'
      ],
    },
    {
      type: 'category',
      label: 'Neon Swap',
      items:
      [
        'neonswap/neonswap_overview'
      ],
    },
    {
      type: 'category',
      label: 'Neon Proxy',
      items:
      [
        'proxy/operator_guide',
      ],
    },
    {
      type: 'category',
      label: 'Supported Standards',
      items:
      [
        'supported_standards/standards_overview',
      ],
    },
    {
      type: 'category',
      label: 'Software Manuals',
      items:
      [
        {
          type: 'category',
          label: 'Core Aspects',
          items: 
          [
            'software_manuals/foundational_topics/web3',
            'software_manuals/foundational_topics/account',
            'software_manuals/foundational_topics/transaction',
            'software_manuals/foundational_topics/block',
            'software_manuals/foundational_topics/gas',
            'software_manuals/foundational_topics/proof-of-work',
            'software_manuals/foundational_topics/proof-of-stake',
            'software_manuals/foundational_topics/solana-cluster',
          ],
        },
        {
          type: 'category',
          label: 'How to Guides',
          items: 
          [
            'software_manuals/how_to_guides/deploy_contract',
            'software_manuals/how_to_guides/connect_metamask_to_solana',
            'software_manuals/how_to_guides/support_docs',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Design Proposals',
      items: 
      [
        {
          type: 'category',
          label: 'Implemented',
          items: 
          [
            'design_proposals/implemented/implemented_proposals',
          ],
        },
        {
          type: 'category',
          label: 'Accepted',
          items:
          [
            'design_proposals/accepted/accepted_proposals',
            'design_proposals/accepted/restriction_on_iterative_trx',
            'design_proposals/accepted/spl_token_precision',
            'design_proposals/accepted/erc721-tokens',
            'design_proposals/accepted/precompiled_contracts',
            'design_proposals/accepted/gas_calculator',
            'design_proposals/accepted/unsupported_functions',
            'design_proposals/accepted/storage_size_for_account',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Neon FAQ',
      items: 
      [
        'faq/neon-faq',
      ],
    },
  ]
};
