/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
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
    items: [{ type: 'link', label: 'NeonScan', href: "https://neonscan.org/" },
    { type: 'link', label: 'Indexing Dashboard', href: "https://neon.aleph.cloud/" }]
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
      'developing/connect_rpc',
      {
        type: 'category',
        label: 'Setting up Neon EVM Locally',
        items: [
          'developing/dev_environment/op2_local_proxy_local_solana',
          'developing/dev_environment/op3_local_proxy_remote_solana',
          //'developing/dev_environment/faucet_and_test_suite_services',
          'clusters/solana_cluster',
        ]
      }, {
        type: 'category',
        label: 'Configuring Dev Tools',
        items: [
          'developing/deploy_facilities/configure_truffle',
          'developing/deploy_facilities/configure_hardhat',
        ]
      }, {
        type: 'category',
        label: 'Using Tokens',
        items: [
          'developing/deploy_facilities/interacting_with_spl_tokens',
          'developing/integrate/neon_transfer_sdk',
          'developing/deploy_facilities/adding_new_tokens',
        ]
      }, {
        type: 'category',
        label: 'Integration',
        items: [
          'developing/integrate/wallets/integrating_metamask_into_your_dapp',
          'developing/integrate/oracles/integrating_pyth',
          'developing/integrate/oracles/integrating_chainlink',
        ]
      }, {
        type: 'category',
        label: 'Tutorials',
        items: [
          'developing/deploy_facilities/using_remix',
          'developing/deploy_facilities/using_truffle',
          'developing/deploy_facilities/using_hardhat',
        ]
      }, {
        type: 'category',
        label: 'Learn',
        items: [{
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
            },
          ]
        },
        'evm_compatibility/json_rpc_api_methods',
      // 'evm_compatibility/gas_metering',
      'developing/precompiles',
      {
        type: 'category', label: 'FAQ', items: [
          'faq/what-is-neon',
          'faq/how-does-neon-work',
          'faq/how-use-neon',
          'faq/why-choose-neon',
          'faq/how-run-neon-evm',
          'faq/couldnt-find-answer',
        ]
      }
        ]
      }
    ]
  }, {
    type: 'category',
    label: "Operating",
    items: [
      'operating/operator_requirements',
      'operating/operator_guide',
    ]
  },
  {
    type: 'category',
    label: "Tools",
    items: [
      'developing/utilities/neonpass',
      'developing/utilities/faucet',
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
      'governance/governance_overview',
      'governance/governance_ui'
    ]
  }, {
    type: 'category',
    label: 'Environment',
    items: [
      'clusters/neon_proxy_rpc_endpoints',
    ]
  }, {
    type: 'category',
    label: 'EVM Compatibility',
    items: [
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
  ]
};

// TODO: To be redistributed
// software_manuals/how_to_guides/deploy_contract,
// software_manuals/how_to_guides/connect_metamask_to_solana
// neonswap/neonswap_overview
// proxy/operator_guide,
// architecture/value_token
