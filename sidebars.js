// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    { type: 'html', value: '<h4 class="sidebar-menu-title">Get started</h4>' },
    {
      type: 'doc',
      label: '🏓 Quick Start',
      id: 'quick_start'
    },
     {
      type: 'category',
      label: '🧬 Neon EVM Overview',
      items:
        [
          'about/why_neon',
          'about/neon_ecosystem',
          'about/how_it_works',
        ]
    },
    {
      type: 'doc',
      label: '🔑 Connect Wallet',
      id: 'wallet/metamask_setup'
    },
    {
      type: 'doc',
      label: '🛰 Transfer Tokens',
      id: 'token_transferring/neonpass_usage',
    },
    {
      type: 'category',
      label: '💰 Tokens',
      items: [
        'tokens/neon_token',
        'tokens/gas_fees',
        'tokens/token_list'
      ]
    },
    {
      type: 'doc',
      label: '💬 FAQ',
      id: 'faq/neon-brief-faq',
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h4 class="sidebar-menu-title">Tools</h4>' },
    { type: 'link', label: 'NeonScan', href: 'https://neonscan.org/' },
    { type: 'link', label: 'NeonPass', href: 'https://neonpass.live/' },
    { type: 'link', label: 'NeonFaucet', href: 'https://neonfaucet.org/' },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h4 class="sidebar-menu-title">Develop</h4>' },
    {
      type: 'doc',
      label: 'Get Started',
      id: 'developing/get-started'
    },
    {
      type: 'doc',
      label: 'Connect to Neon RPC',
      id: 'developing/connect_rpc'
    },
    {
      type: 'doc',
      label: 'Request Test Tokens',
      id: 'developing/utilities/faucet'
    },
    {
      type: 'doc',
      label: 'Gasless transactions',
      id: 'developing/gasless'
    },
    {
      type: 'category',
      label: 'Configure Dev Tools',
      items: [
        'developing/deploy_facilities/configure_hardhat',
        'developing/deploy_facilities/configure_truffle',
        'developing/deploy_facilities/configure_brownie'
      ]
    },
    {
      type: 'category',
      label: 'Use Tokens',
      items: [
        'developing/deploy_facilities/interacting_with_spl_tokens',
        'tokens/token_list',
        'developing/integrate/neon_transfer'
        ]
    },
    {
      type: 'category',
      label: 'Integrate',
      items: [
        'developing/integrate/wallets/integrating_metamask_into_your_dapp',
        'developing/integrate/wallets/integrating_walletconnect',
        'developing/integrate/oracles/integrating_chainlink',
        'developing/integrate/oracles/integrating_pyth',
        'developing/integrate/middleware/the-graph'
      ]
    },
    {
      type: 'category',
      label: 'Deploy Contracts',
      items: [
        'developing/deploy_facilities/using_hardhat',
        'developing/deploy_facilities/using_truffle',
        'developing/deploy_facilities/using_remix',
        'developing/deploy_facilities/using_brownie'
      ]
    },
    {
      type: 'doc',
      label: 'Set up Local Neon EVM',
      id: 'developing/dev_environment/local_proxy_remote_solana'
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h4 class="sidebar-menu-title">Learn</h4>' },
      {
      type: 'category',
      label: 'EVM Compatibility',
      items: [
        'evm_compatibility/overview',
        'evm_compatibility/json_rpc_api_methods',
        'evm_compatibility/opcodes',
        'evm_compatibility/precompiles'
      ]
    },
     {
      type: 'category',
      label: 'Neon EVM Architecture',
      items: [
        'architecture/neon_evm_arch',
        'architecture/eth_sol_solution',
        'architecture/solana-accounts'
      ]
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h4 class="sidebar-menu-title">Operate</h4>' },
    {
      type: 'doc',
      label: 'Operate a Neon Proxy',
      id: 'operating/operator-introduction'
    },
    {
      type: 'category',
      label: 'Run Neon Proxy',
      items: [
        'operating/basic',
        'operating/enhanced',
        'operating/installation/setup_kubernetes'
      ]
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'operating/transaction-gas',
        'operating/accounts',
        'operating/configuration'
      ]
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' },
    { type: 'html', value: '<h4 class="sidebar-menu-title">Govern</h4>' },
    {
      type: 'doc',
      label: 'Overview',
      id: 'governance/overview'
    },
    {
      type: 'doc',
      label: 'Neon DAO Organization',
      id: 'governance/neon_daos'
    },
    {
      type: 'doc',
      label: 'Voting Process',
      id: 'governance/proposals'
    },
    {
      type: 'doc',
      label: 'Sign Votes',
      id: 'governance/technical_implementation/vote'
    },
    {
      type: 'doc',
      label: 'Principles and Objectives',
      id: 'governance/principles'
    },
    {
      type: 'doc',
      label: 'Command Line Utilities',
      id: 'governance/command_line'
    },
    { type: 'html', value: '<div class="sidebar-menu-divider"/>' }
  ]
};

module.exports = sidebars;
