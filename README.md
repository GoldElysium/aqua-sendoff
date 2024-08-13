# Aqua send off website
Website for AkukinHQ's send off project

## Preparing

Make sure to have the following:

- Node 20
- git
- pnpm (replaces npm as a node package manager)

We recommed you use [Volta](https://volta.sh/) to manage Node and pnpm!

And then install the project dependencies:

```bash
pnpm i
```

It is recommended to use VS Code with the following extensions:

- Svelte for VS Code (`svelte.svelte-vscode`)
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier - Code formatter (`esbenp.prettier-vscode`)

Additionally, enabling **Format on save** (`editor.formatOnSave`) will avoid having to run Prettier manually (`pnpm format`).

It is _highly_ recommended to run the following commands to configure git for this repository:

```sh
git config merge.conflictstyle diff3
git config pull.rebase true
```

This makes merging much easier for git-based projects.

## Developing

To run a development server:

```sh
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev --open
```

## Building

To create a production version of the app:

```sh
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## License

[MIT](https://github.com/GoldElysium/aqua-sendoff/blob/main/LICENSE.md)
