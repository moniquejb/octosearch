![Banner](https://github.com/user-attachments/assets/9c845a20-224d-4b84-b44e-315b1e47bb63)

# OctoSearch

https://octosearch.netlify.app

Search GitHub repositiories and view individual repository details (basic) and issues -  while Octocat cheers you on!

## Technologies
* Vue.js (composition API, script setup)
* TypeScript
* Tailwind
* CSS
* HTML

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss). Node version 18 or higher may be required.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### GitHub API Authentication
To make authenticated API calls to the GitHub api while running the project locally, locate the [.env.development](https://github.com/moniquejb/octosearch/blob/main/.env.development) file in the project root and replace "YOUR TOKEN HERE" with your [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
