# How to maintain docs

In this section, you will learn about making changes to the Neon documentation.

## Before you begin
  * Understand the following:
    * What is [Docusaurus](https://docusaurus.io/docs).
    * What is [Markdown](https://www.markdownguide.org/basic-syntax/).
  * Make sure [node.js](https://nodejs.org/en/download/) is installed on the device you are using (desktop or remote server). Version 12.13.0 or higher is recommended (which can be checked by running `node -v`).


## Steps

#### Step 1
Create a workspace on your device by downloading the docs repository:  

```sh
$ git clone https://github.com/neonlabsorg/neon-evm.docs/ <path-to-your-repo>

```  

It is strongly recommended to use a local branch for work. Let it be `<my-website>` branch.  

```sh
$ cd <path-to-your-repo>
$ git branch <my-website>
$ git checkout <my-website>
```

#### Step 2

Make the necessary changes in the docs content. The sections with the source files are located in `<my-website>/docs`.  

> If you make changes to the structure of the documentation (adding, deleteting, moving a file or section), you also have to fix the file `<my-website>/sidebars.js`.  

#### Step 3

It is strongly recommended to test your build locally before pushing changes to the main repository and deploying to production.  

Generate contents with your changes (you can use `npm`, `npx`, `yarn`).
```sh
$ npm run build
```
The html-files will be generated within the `<my-website>/build` directory. Control contents will be deployed locally at http://localhost:3000/. You can serve your built website locally.

```sh
$ npm run serve
```

#### Step 4

After making all the necessary changes to the contents, you can push them to your remote repository.

```sh
$ git status
$ git commit -m "any comment"
$ git push origin <my-remote-website>
```

Before making changes to the [main](https://github.com/neonlabsorg/neon-evm.docs/) remote repository, you need to create "pull request" and get approvals from third parties by following the standard procedure.

> The contents of the `/build` directory are not pushed to the remote repository.

#### Step 5

To simplify the deploying to production, we should use a script that will automatically run after making changes to the master branch.  
This script should perform the following operations:
  * Automatic building html-files after making changes to https://github.com/neonlabsorg/neon-evm.docs/
  * Pushing the built html-files to the html-repository https://github.com/neonlabsorg/neonlabsorg.github.io
  * Deploying the built html-files to the website https://doc.neonlabs.org/

Unfortunately, at the moment this script is under development, and therefore you need to perform further actions in manual mode.

To do this, you need to:
  * Clone the [html-repository](https://github.com/neonlabsorg/neonlabsorg.github.io) to your device and create `<my-html-repo>`
  * Write the html-files taken from `<my-website>/build` into `<my-html-repo>`
  * Push the `<my-html-repo>` changes to the [html-repository](https://github.com/neonlabsorg/neonlabsorg.github.io) by following the standard procedure.

If all the actions are performed correctly, the changes you have made in docs will be displayed at https://doc.neonlabs.org/ .




