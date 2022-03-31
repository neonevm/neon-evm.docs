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
      items: [ 'about/introduction', 'about/terminology']
	}, {
      type: 'category',
      label: 'Wallets',
      items: ['wallet/metamask_setup']
    }, {
      type: 'category',
      label: 'Explorers',
      items: [ { type: 'link', label: 'NeonScan', href: "https://neonscan.org/" },
               { type: 'link', label: 'Indexing Dashboard', href: "https://neon.aleph.cloud/" } ]
    }, {
      type: 'category',
      label: 'Tokens Transferring',
      items: [ 'token_transferring/neonpass_overview',
               'token_transferring/neonpass_usage' ]
    }, {
      type: 'category',
      label: 'Developing',
      items: [
        'developing/getting_started',
        {
          type: 'category',
          label: 'Setting up environment',
          items: [ 'developing/dev_environment/choosing_proxy',
                   'developing/dev_environment/connect_to_solana_via_proxy',
                   'developing/dev_environment/solana_cluster/cluster_installation' ]
        }, {
          type: 'category',
          label: 'Deploying dApps',
          items: [ 'developing/deploy_facilities/using_remix',
                   'developing/deploy_facilities/using_truffle',
                   'developing/deploy_facilities/using_hardhat',
                   'developing/deploy_facilities/migrating_dapps',
                   'developing/deploy_facilities/using_erc20_tokens',
                   'developing/deploy_facilities/adding_new_tokens' ]
        }, {
          type: 'category',
          label: 'Using utilities',
          items: [ { type: 'link', label: 'NeonScan', href: "https://neonscan.'org/" },
                   'developing/utilities/neonpass',
                   'developing/utilities/neonswap' ]
        } ]
    },	{
      type: 'category',
      label: "Operating",
      items: [ 'operating/operator_requirements',
               'operating/operator_guide' ]
    }, {
      type: 'category',
      label: 'Governance',
      items: [ 'governance/governance_overview',
               'governance/governance_ui' ]
    }, {
      type: 'category',
      label: 'Environment',
      items: [ 'clusters/solana_cluster',
               'clusters/neon_proxy_rpc_endpoints' ]
    }, {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/neon_evm_arch',
        'architecture/eth_sol_solution',
        {
            type: 'doc',
            label: 'EVM compatibility',
            id: 'architecture/evm_compatibility'
        }, {
          type: 'category',
          label: 'Core Aspects',
          items: [ 'architecture/core_aspects/account',
                   'architecture/core_aspects/block',
                   'architecture/core_aspects/gas',
                   'architecture/core_aspects/proof-of-stake',
                   'architecture/core_aspects/proof-of-work',
                   'architecture/core_aspects/transaction',
                   'architecture/core_aspects/web3' ]
        }, {
              type: 'category',
              label: 'Architectural Limitations',
              items: [ 'design_proposals/accepted/restriction_on_iterative_trx',
    				   'design_proposals/accepted/erc721_tokens',
    				   'design_proposals/accepted/precompiled_contracts',
    				   'design_proposals/accepted/gas_calculator',
    				   'design_proposals/accepted/unsupported_functions',
    				   'design_proposals/accepted/storage_size_for_account' ]
        } ]
    }, {
      type: 'category',
      label: 'FAQ',
      items: [ 'faq/what-is-neon',
               'faq/how-does-neon-work',
               'faq/how-use-neon',
               'faq/why-choose-neon',
               'faq/how-run-neon-evm',
               'faq/couldnt-find-answer' ]
    }
  ]
};

// TODO: To be redistributed
// software_manuals/how_to_guides/deploy_contract,
// software_manuals/how_to_guides/connect_metamask_to_solana
// neonswap/neonswap_overview
// proxy/operator_guide,
// architecture/value_token
