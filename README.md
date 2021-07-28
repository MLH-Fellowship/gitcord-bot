# Pre Fellowship Template

## General Info

This is a template to help you get started with your projects. Find out more information inside of the Fellow Handbook.

This template has a `main` and `staging` branch already setup. 

- Code will only be merged into `main` once your Pod Leader has reviewed your code. At the end of each week, there will be a code freeze. Your Pod Leader will review it before it's merged.
- During the week, you'll merge code into `staging`. 

## Spike 1: Discord Bot

For the first spike, we are developing a **discord bot** that is responsive and operates in our test discord server.

Install node.js and npm. Run `node .` from the `pod-3.1.3-team-4` directory to activate the bot. Go to the discord server to run the commands.

Texting commands like `-pong` and `-works` returns values `pong!` and `kinda`. The current command handling is simple, but it's not a good practice for discord bots to keep all commands within one file like `main.js`. Further development: create command-specific files and import them with `.get().execute()`.