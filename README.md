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

## Vale

Vale is a linting tool for spelling, grammar, and style.

If you want to move fast there is a [decent intro](https://passo.uno/posts/first-steps-with-the-vale-prose-linter/) to the tooling. And, [vale's own docs](https://vale.sh/docs/vale-cli/installation/).

### Vale control file

The control file, vale.ini allows customization.

This file is set to lint Markdown files, as per `[*.md]`. 

### Linting

Linting with Vale may either be local (with Vale installed via the CLI) or on a webhook action in GitHub or the like. 

### Local lint

Local installation and CLI linting is recommended for documentarians:

You can either lint **all** Markdown files with `vale .`, or you can name a specific file to lint, e.g. `vale readme.md` or `vale {path-to-doc.docname.md`.


### Tabs boilerplate

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

