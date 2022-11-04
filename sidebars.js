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
  tutorialSidebar: [
    { type: 'html', value: '<h4 class="sidebar-menu-title">Get started</h4>' },
    {
      type: 'doc',
      label: '🏓 Quick start',
      id: 'quick_start'
    },
    {
      type: 'doc',
      label: '🧬 Neon EVM Overview',
      id: 'architecture/neon_evm_arch'
    },
    {
      type: 'doc',
      label: '🔑 Set up Wallet',
      id: 'wallet/metamask_setup'
    },
    {
      type: 'category',
      label: '🛰 Token Transferring',
      items: [
        'token_transferring/neonpass_overview',
        'token_transferring/neonpass_usage',
        'token_transferring/sol_to_evm'
      ]
    },
    {
      type: 'category',
      label: 'Tokens',
      items: [
        'tokens/neon_token',
        'developing/deploy_facilities/adding_new_tokens',
        'tokens/gas_fees',
      ]
    },
    {
      type: 'category',
      label: '💬 FAQ',
      items: [
        'faq/what-is-neon',
        'faq/how-does-neon-work',
        'faq/how-use-neon',
        'faq/why-choose-neon',
        'faq/how-run-neon-evm',
        'faq/couldnt-find-answer'
      ]
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h4 class="sidebar-menu-title">Tools</h4>' },
    { type: 'link', label: 'NeonScan', href: 'https://neonscan.org/' },
    { type: 'link', label: 'Indexing Dashboard', href: 'https://neon.aleph.cloud/' },
    { type: 'link', label: 'NeonFaucet', href: 'https://neonfaucet.org/' },
    { type: 'link', label: 'NeonPass', href: 'https://neonpass.live/' },
    {
      type: 'category',
      label: 'Using Neon Tools',
      items: [
        'developing/utilities/neonpass',
        'developing/utilities/faucet'
      ]
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h4 class="sidebar-menu-title">Developers</h4>' },
    {
      type: 'doc',
      label: 'Connect to Neon RPC',
      id: 'developing/connect_rpc'
    },
    {
      type: 'category',
      label: 'Setting up Neon EVM Locally',
      items: [
        'developing/dev_environment/setting_up_the_dev_environment',
        'developing/dev_environment/op2_local_proxy_local_solana',
        'developing/dev_environment/op3_local_proxy_remote_solana',
        //'developing/dev_environment/faucet_and_test_suite_services',
        'clusters/solana_cluster',
      ]
    },
    {
      type: 'category',
      label: 'Configuring Dev Tools',
      items: [
        'developing/deploy_facilities/configure_truffle',
        'developing/deploy_facilities/configure_hardhat',
      ]
    },
    {
      type: 'category',
      label: 'Using Tokens',
      items: [
        'developing/deploy_facilities/interacting_with_spl_tokens',
        'developing/integrate/neon_transfer_sdk',
        'developing/deploy_facilities/adding_new_tokens',
      ]
    },
    {
      type: 'category',
      label: 'Integration',
      items: [
        'developing/integrate/wallets/integrating_metamask_into_your_dapp',
        'developing/integrate/oracles/integrating_pyth',
        'developing/integrate/oracles/integrating_chainlink',
      ]
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'developing/deploy_facilities/using_remix',
        'developing/deploy_facilities/using_truffle',
        'developing/deploy_facilities/using_hardhat',
      ]
    },
    {
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
      'developing/precompiles'
    ]
    },
    {
      type: 'category', label: 'FAQ', items: [
        'faq/what-is-neon',
        'faq/how-does-neon-work',
        'faq/how-use-neon',
        'faq/why-choose-neon',
        'faq/how-run-neon-evm',
        'faq/couldnt-find-answer',
      ]
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h4 class="sidebar-menu-title">Operators</h4>' },
    {
      type: 'doc',
      label: 'Operator Requirements',
      id: 'operating/operator_requirements'
    },
    {
      type: 'doc',
      label: 'Running a Proxy server',
      id: 'operating/operator_guide'
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h4 class="sidebar-menu-title">Governance</h4>' },
    {
      type: 'doc',
      label: 'Overview',
      id: 'governance/overview/overview'
    },
    {
      type: 'doc',
      label: 'Neon DAO Organization',
      id: 'governance/neon_daos/neon_daos'
    },
    {
      type: 'doc',
      label: 'Voting Process',
      id: 'governance/proposals/proposals'
    },
    {
      type: 'doc',
      label: 'Principles and Objectives',
      id: 'governance/principles/principles'
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' }
  ]
};

module.exports = sidebars;
