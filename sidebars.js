// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    { type: 'html', value: '<h4 class="sidebar-menu-title"Introduction</h4>' },
    {
      type: 'doc',
      label: 'Quick Start',
      id: 'quick_start'
    },
    {
      type: 'category',
      label: 'Demos',
      items: ['about/Memecoin_Launchpad_Raydium_Integration', 'about/POC_Aave_V3_flash_loan_with_composability_requests_to_Solana']
    },
    {
      type: 'category',
      label: 'Token',
      items: ['tokens/neon_token', 'tokens/gas_fees', 'tokens/token_list', 'token_transferring/neonpass_usage', 'token_transferring/neon_transfer']
    }
  ]
};

module.exports = sidebars;
