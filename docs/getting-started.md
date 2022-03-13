# Getting Started

This app was bootstrapped with [`remix-run` fullstack web framework](https://remix.run/docs). If you have ever used a tool like `create-react-app` then the setup & philosophy of this codebase might be familiar to you.

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.

## Debugging

If you are using VS Code as your text editor, you can use the builtin break point debugger during development.
To get the application running in debugger mode follow the steps below:

- ensure you are not running a local server already, if so kill/quit the process
- click the bug icon in your side bar
- click the "Run npm run dev" option in the select dropdown list. This will start start your server in debug mode. Try reloading the homepage and putting a break point inside your `loader` function for example.

If you are unable to get VS Code debugger working follow this video: https://gist.github.com/kiliman/a9d7c874af03369a1d105a92560d89e9
