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
      items: [ 'intro',
               'glossary' ]
    }, {
      type: 'category',
      label: 'Wallets',
      items: [
          "wallet/metamask_setup"
      ]
    }, {
      type: 'category',
      label: 'Token transferring',
      items: [ 'token_transferring/neonpass_overview' ]
    }, {
      type: 'category',
      label: 'Developing',
      items: [
        'developing/getting_started',
        {
          type: 'category',
          label: 'Setting up environment',
          items: [ 'developing/dev_environment/connect_to_solana_via_proxy',
                   'wallet/metamask_setup',
                   'developing/dev_environment/choosing_proxy',
                   'developing/dev_environment/solana_cluster/cluster_installation' ]
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
                   'developing/deploy_facilities/migrating_dapps' ]
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
      link: { type: 'doc', id: 'explorers' },
      items: [ { type: 'link', label: 'NeonScan', href: "https://beta.neonscan.org/" },
               { type: 'link', label: 'Indexing dashboard', href: "http://neonqltest.aleph.cloud:8004/" } ]
    }, {
      type: 'category',
      label: "Operating",
      items: [ { type: 'doc', label: "Proxy configuring", id: 'operating/operator_guide' } ]
    }, {
      type: 'category',
      label: 'Architecture',
      items: [ { type: 'doc', label: 'Core Aspects', id: 'architecture/web3' },
               { type: 'doc', label: 'Neon EVM principles', id: 'architecture/eth_sol_solution' } ]
    }, {
      type: 'category',
      label: 'Contributing',
      items: [ { type: 'doc', label: 'Debugging BPF', id: 'contributing/bpf_trace' },
               { type: 'doc', label: 'Maintain docs', id: 'contributing/maintain_docs' } ]
    }, {
      type: 'category',
      label: 'Design Proposals',
      items: [ { type: 'doc', label: 'Implemented', id: 'design_proposals/implemented_proposals' },
               { type: 'doc', label: 'Accepted', id: 'design_proposals/accepted_proposals' } ]
    },
    { type: 'doc', label: 'FAQ', id: 'faq/neon-faq' }
  ]
};

// TODO: To be redistributed
// software_manuals/how_to_guides/deploy_contract,
// software_manuals/how_to_guides/connect_metamask_to_solana
// software_manuals/foundational_topics/account,
// software_manuals/foundational_topics/transaction,
// software_manuals/foundational_topics/block,
// software_manuals/foundational_topics/gas,
// software_manuals/foundational_topics/proof-of-work,
// software_manuals/foundational_topics/proof-of-stake,
// software_manuals/foundational_topics/solana-cluster,
// supported_standards/standards_overview,
// neonswap/neonswap_overview
// proxy/operator_guide,
// architecture/neon_evm_arch,
// architecture/value_token,