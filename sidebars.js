/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [{
    type: 'category',
    label: 'About',
    items: ['about/introduction', 'about/terminology']
  }, {
    type: 'category',
    label: 'Wallets',
    items: ['wallet/metamask_setup']
  }, {
    type: 'category',
    label: 'Explorers',
    items: [{ type: 'link', label: 'NeonScan', href: 'https://neonscan.org/' },
      { type: 'link', label: 'Indexing Dashboard', href: 'https://neon.aleph.cloud/' }]
  }, {
    type: 'category',
    label: 'Tokens Transferring',
    items: ['token_transferring/neonpass_overview',
      'token_transferring/neonpass_usage']
  }, {
    type: 'category',
    label: 'Developing',
    items: [
      'developing/getting_started',
      {
        type: 'category',
        label: 'Setting up Environment',
        items: ['developing/dev_environment/setting_up_the_dev_environment',
          'developing/dev_environment/op1_remote_proxy_remote_solana',
          'developing/dev_environment/op2_local_proxy_local_solana',
          'developing/dev_environment/op3_local_proxy_remote_solana',
          'developing/dev_environment/faucet_and_test_suite_services'
        ]
      }, {
        type: 'category',
        label: 'Deploying dApps',
        items: [
          'developing/deploy_facilities/using_remix',
          'developing/deploy_facilities/using_truffle',
          'developing/deploy_facilities/using_hardhat',
          //  'developing/deploy_facilities/migrating_dapps',
          'developing/deploy_facilities/interacting_with_spl_tokens',
          'developing/deploy_facilities/adding_new_tokens'
        ]
      },
//        'developing/contract_testing/neonswap_tests',
      {
        type: 'category',
        label: 'Using Neon Tools',
        items: [
          { type: 'link', label: 'NeonScan', href: 'https://neonscan.org/' },
          'developing/utilities/neonpass',
//          'developing/utilities/neonswap',
          'developing/utilities/faucet'
        ]
      },
      {
        type: 'category',
        label: 'Integrating',
        items: [
          'developing/integrate/neon_transfer_sdk',
          {
            type: 'category',
            label: 'Wallets',
            items: [
              'developing/integrate/wallets/integrating_metamask_into_your_dapp'
            ]
          },
          {
            type: 'category',
            label: 'Oracles',
            items: [
              'developing/integrate/oracles/integrating_pyth',
              'developing/integrate/oracles/integrating_chainlink'
            ]
          }
          // 'developing/integrate/indexers',
        ]
      }
    ]
  }, {
    type: 'category',
    label: 'Operating',
    items: [
      'operating/operator_requirements',
      'operating/operator_guide'
    ]
  },
//    {
//      type: 'category',
//      label: 'Contributing',
//      items: [ 'contributing/maintain_docs','contributing/bpf_trace' ]
//    },
    {
      type: 'category',
      label: 'Governance',
      items: [
        'governance/overview/overview',
        'governance/neon_daos/neon_daos',
        'governance/proposals/proposals',
        'governance/principles/principles'
        // 'governance/technical_implementation/technical_implementation',
      ]
    }, {
      type: 'category',
      label: 'Environment',
      items: [
        'clusters/solana_cluster',
        'clusters/neon_proxy_rpc_endpoints'
      ]
    }, {
      type: 'category',
      label: 'EVM Compatibility',
      items: [
        'evm_compatibility/json_rpc_api_methods',
        // 'evm_compatibility/gas_metering',
        {
          type: 'category',
          label: 'Architectural Limitations',
          items: [
            'evm_compatibility/architectural_limitations/restriction_on_iterative_trx',
            'evm_compatibility/architectural_limitations/erc721_tokens',
            'evm_compatibility/architectural_limitations/precompiled_contracts',
            // 'evm_compatibility/architectural_limitations/gas_calculator',
            'evm_compatibility/architectural_limitations/unsupported_functions',
            'evm_compatibility/architectural_limitations/storage_size_for_account'
          ]
        }
      ]
    }, {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/neon_evm_arch',
        'architecture/eth_sol_solution',
        {
          type: 'category',
          label: 'Core Aspects',
          items: ['architecture/core_aspects/account',
            'architecture/core_aspects/block',
            'architecture/core_aspects/gas',
            'architecture/core_aspects/proof-of-stake',
            'architecture/core_aspects/proof-of-work',
            'architecture/core_aspects/transaction',
            'architecture/core_aspects/web3']
        }
      ]
    },
    {
      type: 'category', label: 'FAQ', items: [
        'faq/what-is-neon',
        'faq/how-does-neon-work',
        'faq/how-use-neon',
        'faq/why-choose-neon',
        'faq/how-run-neon-evm',
        'faq/couldnt-find-answer'
      ]
    }
  ]
};

module.exports = sidebars;
