# @dreamonkey/cli-ghostwriter

Execute a CLI command providing a preset of question-answer pairs, the package will take over and fill in the answers for you

## Installation

```bash
$ npm install @dreamonkey/cli-ghostwriter
# or
$ yarn add @dreamonkey/cli-ghostwriter
# or
$ pnpm install @dreamonkey/cli-ghostwriter
```

## Usage

```js
import {
  ACCEPT_DEFAULT,
  cliGhostwriter,
  DOWN_KEY,
  WHITESPACE_KEY,
} from "@dreamonkey/cli-ghostwriter";

const answersMap: Record<string, string | undefined> = {
  "What would you like to build?": ACCEPT_DEFAULT, // App
  "Project folder": "my-project-folder",
  "Remove existing files and continue?": "y",
  "Pick Quasar version": ACCEPT_DEFAULT, // Qv2
  "Pick script type": DOWN_KEY, // TypeScript
  "Pick Quasar App CLI variant": ACCEPT_DEFAULT, // Webpack
  "Package name": "my-project",
  "Project product name": "My Project",
  "Project description": "",
  Author: ACCEPT_DEFAULT,
  "Pick a Vue component style": DOWN_KEY, // composition-setup
  "Pick your CSS preprocessor": ACCEPT_DEFAULT, // SCSS
  "Check the features needed for your project": `${DOWN_KEY}${WHITESPACE_KEY}${DOWN_KEY}${DOWN_KEY}${WHITESPACE_KEY}`, // checks: ESLint (default), Pinia, Axios
  "Pick an ESLint preset": ACCEPT_DEFAULT, // prettier
  "Install project dependencies?": DOWN_KEY, // No
};

await cliGhostwriter({
  command: "pnpm create quasar",
  answersMap,
  endingMarker: "Enjoy! - Quasar Team",
  // enableLogs: true
});
```
