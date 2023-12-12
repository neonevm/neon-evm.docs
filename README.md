# Documentation

[Docs](https://docs.neonfoundation.io/) are built using [Docusaurus 2](https://docusaurus.io/).

### Installation

```console
yarn install
```

### Local Development

```console
yarn start
```

This command starts a local development server and opens up a browser window for localhost. Most changes are reflected live without having to restart the server.

### Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

> Note that the build gives more verbose warnings than the localhost server (with base commands). So, `yarn clear` followed by `yarn build` should warn on all internal bust links.


## Use single source content

> Both files must be .mdx (the single source item AND the file that imports the item)
> See docs/tokens/gas_fees.mdx for a working example

See [the docs](https://docusaurus.io/docs/next/markdown-features/react#markdown-and-jsx-interoperability)

```console
yarn add raw-loader
```

## Control image sizes

Docusaurus provides certain [controls for static assets](https://docusaurus.io/docs/static-assets). Either the default location must be used for image location (static/img), or this must be configured and the configured location applied. Ad hoc placement of images is not supported.

Using the default location:
1. Import the required asset, e.g. 
`import myimage from '@site/static/img/doc-images/developing/integrate/protocols/walletconnect/connected.png';`
2. Reference the image and the size required, e.g.
`<img src={myimage} width="450" />`

## QA layer


## External and internal links

The repo provides a QA action run to build and validate the docs. This step includes verifying internal and external links.

> To use links to internal pages such as Notion, that public users do not have access to (e.g. in the metadata), it is necessary to comment out the URL.

> To use links to external pages that have access control, it is necessary to add them to the allow list in linkcheck.config.json at the root level of this repo.

## Vale

Neon EVM follows the Google Developer's Style Guide with some tweaks. We use US English and maintain a list of preferred variants (e.g. dApp) and legal guiderails.  

Vale is a linting tool that enforces grammar, and style.

If you want to move fast there is a [decent intro](https://passo.uno/posts/first-steps-with-the-vale-prose-linter/) to the tooling. And, [vale's own docs](https://vale.sh/docs/vale-cli/installation/).

### Vale control file

The control file, vale.ini allows customization.

This file is set to lint Markdown files, as per `[*.md]`. 

### Linting

Linting with Vale may either be local (with Vale installed via the CLI) or on a webhook action in GitHub or the like. 

### Local lint

Local installation and CLI linting is recommended for documentarians:

You can either lint **all** Markdown files with `vale .`, or you can name a specific file to lint, e.g. `vale readme.md` or `vale {path-to-doc.docname}.md`, e.g. `vale docs/faq/fees.md`.


### Tabs boilerplate

> Warning Heading links do not work *within* tabs >> Only once the correct tab is selected would a link function making them useless for cross-page linking (there is probably a workaround/plugin todo).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
	<TabItem value="Opt1" label="First option" default>

************

</TabItem>
<TabItem value="Opt2" label="Second option" default>

	*********
</TabItem>
</Tabs>

### Code boilerplates

[codesandbox](https://codesandbox.io/dashboard/recent?workspace=6715f772-9c64-4139-8c8d-a18fe3f51a91) setup for grammarly@neonlabs.org

with authentication via [GitHub](https://github.com/anonNeon)

## Walkthrough boilerplate

When creating user walkthroughs, it is important to think about what structure and heirachy supports end users. The style applied in this dev portal is:

[H2] TL;DR
Tell the user in 3 bullet points or less what they need to know to either
- avoid using the tutorial entirely
- decide whether they will use it
{todo: in the future, we want to add a time required for the walkthrough here}

[H2] Introduction
The assumption is that less than 30% of users need an intro >> this item supports the bottom tail

[H2] Prerequisites
What does the user need to have or know to achieve success? NB stay sane else the list could become long!

[H2]How to do this thing
The first heading gathers the entire tutorial into one structure

[H3] Step 1: Do this first thing
Break the tutorial down into logical chunks, e.g. 1. go clone and install a repo 2. configure a file 3. Run the configured program
The H3 is the final item that will be shown in the TOC (table of contents) on the RHS of the page, this allows the user to scan the TOC to gain an impression of what they are getting themselves into and to skip ahead according to their setup/knowledge level

## Information pages boilerplate
[H2] TL;DR
Tell the user in 3 bullet points or less what they need to know to either
- avoid reading the page entirely
- decide whether they want to read it

[H2] Introduction
Tell the users what this page is about

[H2]/[H3] Content -- nest the content into H2s and H3s for TOC presence -- H4 and H5 can be applied, but remember these are nested within the page and do not appear in the TOC. The user should be able to get an idea of what the page is about *without* reading the full intro -- just by using the TL;DR and/or TOC.

Example page: docs/evm_compatibility/overview

## Troubleshooting

You pull main and can no longer build. Don't fret, someone probably changed a dependency do:
`npm install`
and then build or serve and see if that fixes it

## End user support

The current search is provided by algolia.com
We wish to expand this functionality by implementing Mava AI (ticket with FE team)

