![GitCord Readme Header](https://socialify.git.ci/MLH-Fellowship/pod-3.1.3-team-4/image?description=1&descriptionEditable=GitCord%20Bot%20-%20The%20ultimate%20Discord%20Bot%20that%20helps%20you%20manage%20your%20GitHub%20repos%20from%20Discord&issues=1&logo=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F869311504774758420%2F873020508877225985%2FWhite.png&owner=1&pulls=1&stargazers=1&theme=Dark)

<div align="center">
<img src="https://forthebadge.com/images/badges/built-by-developers.svg">
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg">
</div>

# 📚 Table of Contents

*Update TOC and Readme with links to and from new sections*

- [👁 Overview](#-overview)
- [⚡ Installation](#-installation)
  - Discord Server
  - Development
- [⚙ Usage](#-usage)
  - Help Docs
- [👀 Demo](#-demo)
  - Interactive GIF
  - Screenshots
- [💡 Why We Built GitCord Bot](#-why-we-built-gitcord-bot)
- [🎯 GitCord Bot Features](#-gitcord-bot-features)
- [👥 The Team](#-the-team)
- [💻 Technologies](#-technologies)
  - Bot Technologies
  - Sponsor Technologies
- [⚖ License](#-license)
- [🙋 Contributing](#-contributing)
- [🔗 Further Links](#-further-links)

# 👁 Overview

Looking for a bot which will make your development process from Discord easier? GitCord is the ultimate Discord Bot that provides you with a number of developer tools and helps you manage your Github repos from Discord. GitCord lets you posts comments on your issues or pull requests and create a Github Project from Discord itself, making it easier to collaborate. It even lets you check out the lighthouse stats or tech stacks used by any of your favorite website 🚀

# ⚡ Installation

## Discord Server

Love our bot and want to install it in your Discord server? 😍

- Head over to our [site](https://gitcordbot.tech/) and click on `Download Now`.

 ![image](https://user-images.githubusercontent.com/66139520/129349717-e30d0cee-646f-44c1-a051-2d65750ee382.png)

- Select the server you want to download GitCord in, and you are good to go 💯

To discover what commands you can can use, read the [usage instructions](#usage-instrucutions)

## Development

Looking to locally host GitCord Bot yourself or installing it to contribute to our codebase? Here's a step by step guide on how to install and run our bot in a localhost environment. See our Contributing section for details of how to contribute to our project.

1. Clone the repository using `git clone https://github.com/MLH-Fellowship/gitcord-bot` or use your forked repo URL if you've forked our project
2. Install needed NPM packages with `npm install`
3. Install development NPM packages with `npm install --dev`
4. Create an `.env` file with information for the following variables:
   1. DISCORD_TOKEN
   2. COCKROACH_DB_PASSWORD
   3. COCKROACH_DB_HOST
   4. COCKROACH_DB_DATABASE
5. Run the bot with ``npm start``

```bash
git clone https://github.com/MLH-Fellowship/gitcord-bot
cd gitcord
npm install
npm install --dev
nano .env
```

```bash
DISCORD_TOKEN=<Discord Token>
COCKROACH_DB_PASSWORD=<CockroachDB Password>
COCKROACH_DB_HOST=<CockroachDB Host>
COCKROACH_DB_DATABASE=<CockroachDB Database>
```

Encounter any issues? Feel free to open an issue with a detailed description of any error messages that occur and describe the specific problem and we'd be happy to help.

# ⚙ Usage

Here's how to use our awesome Discord Bot. Insert commands, command format and functionality

## Help Docs

For a more detailed in-depth guide, visit our website where our full help documentation resides.

# 👀 Demo

## Interactive GIF

Record some animated GIFs to showcase Bot functionality + possibly website

## Screenshots

Add some screenshots with alt text and headings

# 💡 Why We Built GitCord Bot

Add our inspiration - see Discord channel - behind our original Bot idea, why we wanted to make a Discord Bot and use the GitHub API as well as the reasoning behind functionality that we've been inspired to create

# 🎯 GitCord Bot Features

*Could combine with screenshot section and just have animated demo GIFs?*

- **Simple Installation** - Take advantage our easy installation process to install GitCord Bot to your Discord Server using our [website](https://gitcordbot.tech)

- **Lighthouse Integration** - Scan a website and receive scores from a Lighthouse audit via our bot. No need to open Chrome Dev Tools or go to a website anymore. Run Lighthouse through Discord to easily share results with your entire dev team.

- **Tech Stack Scanner** - Curious about what tech stack your favourite sites are using? Wonder no more. Discover the technologies a website is using using our tech stack scanner thanks to our Wappalyzer integration.

- **Post Comments on GitHub Issues/PRs** - Using Discord to collaborate with your dev team? Why post in two places to keep your team up to date yet document your progress? Use GitCord bot to post on issues and PRs for you, notifying your team of the latest changes and keeping your repo up to date.

- **Post & Update Comments on GitHub Discussions** - Using GitHub Discussions for daily standups? Our bot will make the process much smoother so you can concentrate on developing your awesome project. Make all your comments in one platform and leave GitHub for your code. Comment early on and in a last minute rush to update pre-standup? Use our update command to refresh your standup notes

- **GitHub Projects Integration** - Using GitHub Projects for project management but find it a pain to setup, micro-manage and keep your team up to date if they don't check it? Our bot empowers you to create your GitHub Project through Discord and show its contents to your team with project & column creation and listing columns and cards.

# 👥 The Team

*The developers behind GitCord Bot. Mention MLH Pre-Fellowship and create a list of developers + images, why we were inspired, what we enjoyed about the project/what we did and socials. Also, how we worked as a team, how we used GitHub, branches, Projects etc.*

<div align="center">
<table>
  <tr>
    <td align="center"><a href="https://github.com/louisefindlay23"><img src="https://avatars.githubusercontent.com/u/26024131?v=4" width="100px;" alt="" style="border-radius:50%"/><br /><sub><b>Louise Findlay
</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/inoxia25"><img src="https://avatars.githubusercontent.com/u/66139520?v=4" width="100px;" alt="" style="border-radius:50%"/><br /><sub><b>Nandini Jain</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/dtemir"><img src="https://avatars.githubusercontent.com/u/62047062?v=4" width="100px;" alt="" style="border-radius:50%"/><br /><sub><b>Damir Tamir</b></sub></a><br /></td>
  </tr>
</table>
</div>

## Louise Findlay - [@louisefindlay23](https://github.com/louisefindlay23)

*Insert Bio Image*

what I contributed/enjoyed about the project*

I was inspired to create Discord Bot by my experiences in the first week of the MLH Pre-Fellowship collaborating with a team of 13 fellow pod members. Having a GitHub feed in one of our Discord channels was great for keeping up to date with GitHub activity but some members it was overwhelming.

Communicating in Discord was great for immediate quick communication with team members with direct mentions but then I'd have to crosspost information to the relevant GitHub issues and PRs to keep them up to date to store our project history.

This was time-consuming so I wondered if there was a reverse integration where we could post messages on Discord mentioning a specific issue or PR and store the repo we wanted to use and then it would comment on GitHub for us while being able to use Discord mentions to notify teammates.

From my research, there wasn't so I decided that it would be a great idea to create one. I'd never create a Discord Bot or used the GitHub API before so it seems an exciting and new project to tackle. Thus GitCord Bot was born.

## Nandini Jain - @Inoxia25

*Insert as above*

## Damir Temir - @dtemir

I wanted to build something for two major DevOps platforms like Discord and GitHub. I also wanted to work in a new programming language for me, using the technologies I wouldn't have otherwise used.

I certainly enjoyed building this project because we collaborated closely as a team to learn and develop together. We properly managed our time and resources, distributing work based on everyone's availability and time zones.

My contributions include setting up a **CockroachDB** instance with Sequelize ORM. I have also helped setting up the Discord Bot and refactoring code for efficiency and cohesiveness.

# 💻 Technologies

## Sponsor Technologies

- CockroachDB (Distributed Database with Standard SQL)
- .tech domain (Build the Future on .tech)
- Linode (Cloud Computing & Linux Servers)

## Other Technologies

- GitHub API
- Discord API
- Netlify

# ⚖ License

*See License.md*

# 🙋 Contributing

We welcome contributors to our GitCord Bot project. Feel free to take on any open issues marked v2 by forking our repo, creating a new branch off of main and then submitting a PR. Please adhere to our codebase conventions, git workflow and PR template as outlined below to ensure the greatest chance of your PR being approved and merged.

## Contribution Guide

1. Open a new issue for working on any new features

- Our GitHub action will automatically add it to our GitHub Project but please add the v2 milestone and appropriate label: documentation, enhancement, question, bug or help wanted.

2. Create a new branch from main with the name of the feature you will be working on - i.e. token validation

- Please create a branch per issue as it makes it easier to review PRs. One exception is documentation updates where you can use the docs branch.

3. Ensure your code meets the standards of our linters and desired formatting

- We use ESLint and StyleLint for JS and CSS linting as well as prettier for autoformatting to our desired configuration through config files stored in our repo

- For easiest compliance, install the appropriate extensions (ESLint, StyleLint and Prettier) in your code editor or alternatively, use the command line.

4. Save any new node modules to the `package.json` using `npm install` or `npm install --save-dev` for developer-only node modules

5. Create a PR from your fork to the base branch: staging

- Follow the template to ensure your PR is descriptive enough to allow us to easily review it. As with issues, add an appropriate label and the v2 milestone. Finally, add one of the team as a reviewer so we can review your PR and hopefully approve it.

## Codebase Overview

Below is an overview of the files you may want to edit to contribute new code. Please do not edit any of the other configuration files unless your PR is directly related to them and we have approved your issue.

- `main.js` - The main.js file handles initialisation of Discord.js and Octokit.js to run our bot and access the GitHub API. The relevant Discord objects `command, message, args` and GitHub object `octokit` are then passed to our command files in the `commands` folder when a specified command is run.

- `database.js` - The database.js file handles the connection to CockroachDB and fetching, inserting, updating and deleting the user's GitHub Personal Access Token for use with the GitHub API

- `commands/` - The commands folder contains all the `.js` files for every bot command.

To create a new bot command, just copy an existing file and rename it to the command name you wish to use. Next, edit the name,  description, usage and example parameters in `module.exports` and finally, update the command name in the `if` statement and then remove and rewrite the bot command code below as needed.

- `site/` - The site folder contains the HTML, CSS and assets for the [GitCord Website](https://gitcord.tech), hosted on Netlify. The website is a static site that uses the Bootstrap CSS framework. Autoprefixer is used to automatically add necessary vendor prefixes to the CSS when `npm start` is run.

# 🔗 Further Links

1. [Building a Node.js App with CockroachDB and Sequelize](https://www.cockroachlabs.com/docs/stable/build-a-nodejs-app-with-cockroachdb-sequelize.html)
2. [Sequelize Documentation](https://sequelize.org/master/)

*Adding any further links not already mentioned - API info, MLH Pre-Fellowship Link, Website etc.*
