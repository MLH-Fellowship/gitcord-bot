# Pre Fellowship Template

## General Info

This is a template to help you get started with your projects. Find out more information inside of the Fellow Handbook.

This template has a `main` and `staging` branch already setup.

-   Code will only be merged into `main` once your Pod Leader has reviewed your code. At the end of each week, there will be a code freeze. Your Pod Leader will review it before it's merged.

-   During the week, you'll merge code into `staging`.

## Useful commands

Switch branches:

```bash
git checkout <branch-name>
```

Make new branch and switch to it:

```bash
git checkout -b <branch-name>
```

## Spike 1: Discord Bot

For the first spike, we are developing a **Discord bot** that is responsive and operates in our test discord server.

### Install Instructions

1. Install node.js and npm.

2. Run `npm install` to from the `pod-3.1.3-team-4` directory to install required node modules from `package.json`.

3. Run `npm start`to activate the bot. Go to the Discord Server to run the bot commands.

Texting commands like `-pong` and `-works` returns values `pong!` and `kinda`. The current command handling is simple, but it's not a good practice for Discord bots to keep all commands within one file like `main.js`.

### Further development

-   Create command-specific files and import them with `.get().execute()`. _Nandini is currently working on this in another branch_

-   Integrate the GitHub API with the Discord bot. _In github-api branch_
