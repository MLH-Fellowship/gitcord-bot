![gitcord-bot](https://socialify.git.ci/MLH-Fellowship/gitcord-bot/image?description=1&descriptionEditable=The%20ultimate%20Discord%20Bot%20that%20provides%20you%20with%20a%20number%20of%20developer%20tools%20and%20helps%20you%20manage%20your%20GitHub%20activity%20from%20Discord&font=Inter&issues=1&logo=https%3A%2F%2Fgitcordbot.tech%2Fassets%2FGitCordDarkLogo.png&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Dark)

<div align="center">
<img src="https://forthebadge.com/images/badges/built-by-developers.svg">
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg">
</div>

# 📚 Table of Contents

- [👁 Overview](#-overview)
- [🎯 GitCord Bot Features](#-gitcord-bot-features)
- [⚡ Installation](#-installation)
  - [Discord Server](#-discord-server)
  - [Development](#-development)
- [⚙ Usage](#-usage)
  - [Bot Commands](#bot-commands)
  - [GitHub Commands](#github-commands)
  - [Website Commands](#website-commands)
- [👀 Demo](#-demo)
- [💡 Why We Built GitCord Bot](#-why-we-built-gitcord-bot)
- [👥 The Team](#-the-team)
- [💻 Technologies](#-technologies)
  - [Sponsor Technologies](#sponsor-technologies)
  - [Functional Technologies](#functional-technologies)
  - [Server Technologies](#server-technologies)
  - [Developer Technologies](#developer-technologies)
- [⚖ License](#-license)
- [🙋 Contributing](#-contributing)
  - [Contribution Guide](#contribution-guide)
  - [Codebase Overview](#codebase-overview)
- [🔗 Further Links](#-further-links)

# 👁 Overview

Looking for a bot which will make your development process from Discord easier? GitCord is the ultimate Discord Bot that provides you with a number of developer tools and helps you manage your Github repos from Discord.

GitCord lets you posts comments on your issues or pull requests and create a Github Project from Discord itself, making it easier to collaborate. It even lets you check out the Lighthouse stats or tech stacks used by any of your favorite websites. 🚀

# 🎯 GitCord Bot Features

- **Simple Installation** - Take advantage our easy installation process to install GitCord Bot to your Discord Server using our [website](https://mlh-fellowship.github.io/gitcord-bot)

- **Lighthouse Integration** - Scan a website and receive scores from a Lighthouse audit via our bot. No need to open Chrome Dev Tools or go to a website anymore. Run Lighthouse through Discord to easily share results with your entire dev team.

- **Tech Stack Scanner** - Curious about what tech stack your favourite sites are using? Wonder no more. Discover the technologies a website is using using our tech stack scanner thanks to our Wappalyzer integration.

- **Post Comments on GitHub Issues/PRs** - Using Discord to collaborate with your dev team? Why post in two places to keep your team up to date yet document your progress? Use GitCord bot to post on issues and PRs for you, notifying your team of the latest changes and keeping your repo up to date.

- **Post & Update Comments on GitHub Discussions** - Using GitHub Discussions for daily standups? Our bot will make the process much smoother so you can concentrate on developing your awesome project. Make all your comments in one platform and leave GitHub for your code. Comment early on and in a last minute rush to update pre-standup? Use our update command to refresh your standup notes

- **GitHub Projects Integration** - Using GitHub Projects for project management but find it a pain to setup, micro-manage and keep your team up to date if they don't check it? Our bot empowers you to create your GitHub Project through Discord and show its contents to your team with project & column creation and listing columns and cards.

# ⚡ Installation

## Discord Server

Love our bot and want to install it in your Discord server? 😍

- Head over to our [site](https://mlh-fellowship.github.io/gitcord-bot) and click on `Download Now`.

![Website Homepage](https://user-images.githubusercontent.com/66139520/129349717-e30d0cee-646f-44c1-a051-2d65750ee382.png)

- Select the server you want to download GitCord in, and you are good to go 💯

![Server Installation Page](https://user-images.githubusercontent.com/26024131/129351156-3ae42304-5a60-49f4-858e-13a40e118e1e.png)

To discover what commands you can can use, read the [usage instructions](#-usage)

## Development

Looking to locally host GitCord Bot yourself or installing it to contribute to our codebase? Here's a step by step guide on how to install and run our bot in a localhost environment. See our [Contributing](#-contributing) section for details of how to contribute to our project.

1. Clone the repository using `git clone https://github.com/MLH-Fellowship/gitcord-bot` or use your forked repo URL if you've forked our project
2. Install needed NPM packages with `npm install`
3. Install development NPM packages with `npm install --dev`
4. Create an `.env` file with information for the following four variables:
   1. ``DISCORD_TOKEN``
   2. ``COCKROACH_DB_PASSWORD``
   3. ``COCKROACH_DB_HOST``
   4. ``COCKROACH_DB_DATABASE``
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

Encounter any issues? Feel free to open an [issue](https://github.com/MLH-Fellowship/gitcord-bot/issues/new) with a detailed description of any error messages that occur and describe the specific problem and we'd be happy to help.

# ⚙ Usage

See the instructions below on how to use our awesome Discord Bot. Think of a great command that could be added? Create an [issue](https://github.com/MLH-Fellowship/gitcord-bot/issues/new) and we can review your idea.

## Bot Commands

- `-github`
    Instructs users how to continue with the GitHub API authorisation process.
    <br/>
    **Example:** `-github`

    ![GitHub Screenshot](https://user-images.githubusercontent.com/26024131/129393972-ab58ebab-f037-433e-b829-5b6b44c2fb45.png)

- `-help`
    Gives description and usage for each of the commands.
    <br/>
    **Example:** `-help` will give you a list of all commands, and `-help <command-name>` will give you details about a specific command.
  
  ![Help Screenshot](https://user-images.githubusercontent.com/66139520/129380643-e35562b6-5bda-4584-b088-e65a171e3365.png)

## GitHub Commands

- `-github-info`
    Checks if your GitHub token is on file, approves your GitHub token, stores it in our database.
    <br/>
    **Example:** `-github-info <your  github token>`

    ![github-info command example](https://user-images.githubusercontent.com/62047062/129387326-7423ee70-b57c-4506-a681-53aa1078383a.png)

- `-github-delete-token`
    Permanently deletes your GitHub token from our database.
    <br/>
    **Example:** `-github-delete-token`

    ![github-delete-token command example](https://user-images.githubusercontent.com/62047062/129388495-6e726717-68e3-40ac-b4f8-bc7f2a010f19.png)

- `-github-post-comment`
    Puts your comment in a GitHub Issue or Pull Request.
    <br/>
    **Example:** `-github-post-comment <organization name> <repo name> <issue or PR id> <your comment>`

    ![github-post-comment command example](https://user-images.githubusercontent.com/62047062/129387691-fb8a292b-b7fe-432b-afd0-736f870e9916.png)

- `-github-post-standup`
    Makes a Standup Notes submission for you.
    <br/>
    **Example:** `-github-post-standup <organization name> <team name> <discussion id> <your notes>`

    ![github-post-standup command example](https://user-images.githubusercontent.com/62047062/129388102-f8f84707-5867-471b-bd17-e55e91ac7933.png)

- `-github-update-standup`
    Updates your Standup Notes for you.
    <br/>
    **Example:** `-github-update-standup <organization name> <team name> <discussion id> <comment id> <your updated comment>`

    ![github-update-standup command example](https://user-images.githubusercontent.com/62047062/129388271-c0863bc6-499a-4abe-acab-0f9f3fecefe3.png)

- `-github-projects create-project`
    Creates a new GitHub project in a repo.
    <br/>
    **Example:** `-github-projects create-project <repo-owner> <repo-name> <project-title>`
  
  ![Create Project Screenshot](https://user-images.githubusercontent.com/26024131/129387336-de063a2d-913d-4e50-a83a-c248018fad84.png)
  
- `-github-projects select-project`
    Selects a GitHub project in a repo.
    <br/>
    **Example:** `-github-projects select-project <project-id>`
  
  ![Select Project Screenshot](https://user-images.githubusercontent.com/26024131/129388914-1e296205-1958-49c9-8c79-804207c31863.png)
  
- `-github-projects create-column`
    Creates a new column in a GitHub Project.
    <br/>
    **Example:** `-github-projects create-column <project-id> <column-title>`
  
  ![Create Column Screenshot](https://user-images.githubusercontent.com/26024131/129389416-bdd56cac-4510-4459-bbf7-d9a49910c4ab.png)
  
- `-github-projects select-column`
    Retrieves cards from a column in a GitHub Project. **Note:** Only retrieves cards and not PR/Issues
    <br/>
    **Example:** `-github-projects select-column <column-id>`
  
  ![Select Column Screenshot](https://user-images.githubusercontent.com/26024131/129389735-fa70603b-01aa-45db-a8ed-8027a9086b04.png)

## Website Commands

- `-lighthouse`
   Provides Lighthouse stats for a site.
   <br/>
   **Example:** `-lighthouse <url of the site to get its lighthouse stats>`
  
  ![Lighthouse Screenshot](https://user-images.githubusercontent.com/66139520/129378103-1e40f495-3ddb-434e-981f-e18c91804a5b.png)

- `-tech-stack`
   Returns technologies used by a website.
   <br/>
   **Example:** `-tech-stack <url of the site to get the technologies used by it>`
  
   ![Tech Stack Screenshot](https://user-images.githubusercontent.com/66139520/129379334-f359cc47-e9c8-43ad-bf06-c25eaf6c32c5.png)

# 👀 Demo

[YouTube Demo Video](https://youtu.be/gbcnEMU2g6E)

# 💡 Why We Built GitCord Bot

We were inspired to create Discord Bot based on our experiences in the first week of the MLH Pre-Fellowship collaborating with a team of 13 fellow pod members. Having a GitHub feed in one of our Discord channels was great for keeping up to date with GitHub activity but for some members it was overwhelming.

Communicating in Discord was great for immediate quick communication with team members with direct mentions but then we'd have to crosspost information to the relevant GitHub issues and PRs to keep them up to date to store our project history.

This was time-consuming so we wondered if there was a reverse integration where we could post messages on Discord mentioning a specific issue or PR and store the repo we wanted to use and then it would comment on GitHub for us while being able to use Discord mentions to notify teammates.

From our research, there wasn't so we decided that it would be a great idea to create one. Thus GitCord Bot was born.

Often times, the performance and accessibility of a page is not paid much attention to, so we have integrated the Lighthouse feature, which lets you scan a website and receive scores using Lighthouse, through Discord itself! There is no need to open Chrome Dev Tools or install the Lighthouse extension, and you can easily access the scores using Gitcord.

We wanted to create an easy way to be able to analyse our favourite sites and access the technologies used by it, without using another site or extension. That's how we thought of implementing the tech scanner feature from Discord itself.

# 👥 The Team

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

<br>
<div align="center">
<img width="200px" src="https://avatars.githubusercontent.com/u/26024131?v=4" alt="Louise Findlay">
</div>
<br>

I wanted to work on the project because I've hadn't created a Discord Bot or used the GitHub API before so it seemed like an exciting new project to tackle and the features we were developing would solve real pain points us and fellow developers had so the project would bring great benefits to the developer community.

I really enjoyed working on the project because since the dev team was small, we worked closely as a tight-knit team, helping each other out with pair programming sessions when we faced any issues or blockers despite the distributed nature of our team. We all learned about new technologies and aspects of coding languages that we can use in the future.

We used GitHub to great effect with main, staging and feature branches and I set up GitHub Projects for project management and assigned issues and PRs to team members, added labels and created and managed milestones which helped us to manage the project. Added a GitHub action to automatically adding new issues and PRs to our GitHub Project helped automate this workflow.

The main features I implemented were surrounding the GitHub API. I integrated the GitHub API with our bot and created all the GitHub bot commands. I also helped refactor the code based on feedback from our code reviews, setup linting, formatting and autoprefixer and host our bot on Linode (with PM2 to manage and daemonize our Node app) and website on Netlify.

## Nandini Jain - [@Inoxia25](https://github.com/Inoxia25)

<div align="center" style="margin: 2.5% 0">
<img width="200px" style="border-radius: 50%" src="https://avatars.githubusercontent.com/u/66139520?v=4" alt="Nandini Jain">
</div>

While participating in hackathons and also for various events like the MLH Pre-Fellowship, I have used Discord effectively and always felt it would have been better to have a Discord Bot as a developer tool, helping developers while they collaborate on Discord. This inspired me to work on creating a Discord Bot, which I know would be useful for many developers, including myself.

Throughout this project, I got to play around with various new technologies like Discord.js, Lighthouse and Wappalyzer. As we were a small team, we worked closely to brainstorm features, thinking what might be useful for developers. Our extensive use of Github to collaborate and work effectively strengthened my Git skills to a great extent.

The constant reviewing of our code by our teammates and mentor helped us learn the best practices when it came to clean, efficient and reusable code. Despite our timezones and other commitments, our team managed to dedicatedly work on this project, helping each other out with any issues and learning new technologies on the way.

The main features that I worked on consist of implementing the Lighthouse analysis for the bot, and showing the tech stacks used by a site from Discord itself (using the Wappalyzer API). I worked on adding the dynamic help command and refactored the code to make it more modular. I also worked on developing and styling the website for our bot, which is integrated with Discord to be able to download the bot into a server.

## Damir Temir - [@dtemir](https://github.com/dtemir)

<br>
<div align="center">
<img width="200px" src="https://avatars.githubusercontent.com/u/62047062?v=4" alt="Damir Temir">
</div>
<br>

I wanted to build something for two major DevOps platforms like Discord and GitHub. I also wanted to work in a new programming language for me, using the technologies I wouldn't have otherwise used.

I certainly enjoyed building this project because we collaborated closely as a team to learn and develop together. We properly managed our time and resources, distributing work based on everyone's availability and time zones.

My contributions include setting up a **CockroachDB** instance with Sequelize ORM. I have also helped setting up the Discord Bot and refactoring code for efficiency and cohesiveness.

# 💻 Technologies

We used a range of technologies in order to create GitCord Bot. Some were from our sponsors who sponsored the MLH Pre-Fellowship which we built our bot during (which we've highlighted below), some were vital to developing functionality (such as the GitHub API and Discord API) and others provided nice additions to our developer environment such as the linters and formatters we used.

## Sponsor Technologies

- **CockroachDB** - [Distributed Database with Standard SQL](https://www.cockroachlabs.com/product)
- **Linode** - [Cloud Computing & Linux Servers](https://www.linode.com)
- **.tech Domain** - [via Domain.com](https://www.domain.com)

## Functional Technologies

- **Discord API** - [Discord.js](https://discord.js.org)
- **GitHub API** - [Octokit.js](https://github.com/octokit/octokit.js)
- **Database** - [CockroachDB](https://www.cockroachlabs.com/product/)
- **ORM** - [Sequelize](https://sequelize.org)
- **Lighthouse** - [Chrome Launcher](https://github.com/GoogleChrome/chrome-launcher)
- **Tech Stack API** - [Wappalyzer](https://www.wappalyzer.com)

## Server Technologies

**Server Dashboard Overview**

![PM2 Dashboard](https://user-images.githubusercontent.com/26024131/129396586-72be2874-1129-42ec-8224-ca2c8459cb35.png)

- **Server Hosting** - [Linode](https://www.linode.com)
- **Website Hosting** - [Netlify](https://www.netlify.com)
- **Server Management** - [PM2](https://pm2.keymetrics.io)

## Developer Technologies

- **JavaScript Linter** - [ESLint](https://eslint.org)
- **CSS Linter** - [StyleLint](https://stylelint.io)
- **Code Formatter** - [Prettier](https://prettier.io)
- **CSS Tranformer** - [PostCSS](https://github.com/postcss/postcss)
- **Vendor Prefixer** - [Autoprefixer](https://github.com/postcss/autoprefixer)
- **Secrets** - [Dotenv](https://github.com/motdotla/dotenv)

# ⚖ License

We are using the MIT License for this project which allows commercial use, modification, distributation and private use. See our [License](https://github.com/MLH-Fellowship/gitcord-bot/blob/main/LICENSE.md) for more information about the specific terms.

# 🙋 Contributing

We welcome contributors to our GitCord Bot project. Feel free to take on any open issues marked v2 by forking our repo, creating a new branch off of main and then submitting a PR. Please adhere to our codebase conventions, git workflow and PR template as outlined below to ensure the greatest chance of your PR being approved and merged.

## Contribution Guide

1. Open a new [issue](https://github.com/MLH-Fellowship/gitcord-bot/issues/new) for working on any new features

- Our GitHub action will automatically add it to our GitHub Project but please add the v2 milestone and appropriate label: documentation, enhancement, question, bug or help wanted.

2. Create a new branch from main with the name of the feature you will be working on - i.e. token validation

- Please create a branch per issue as it makes it easier to review PRs. One exception is documentation updates where you can use the docs branch.

3. Ensure your code meets the standards of our linters and desired formatting

- We use ESLint and StyleLint for JS and CSS linting as well as prettier for autoformatting to our desired configuration through config files stored in our repo

- For easiest compliance, install the appropriate extensions (ESLint, StyleLint and Prettier) in your code editor or alternatively, use the command line.

4. Save any new node modules to the `package.json` using `npm install` or `npm install --save-dev` for developer-only node modules

5. Create a [PR](https://github.com/MLH-Fellowship/gitcord-bot/compare) from your fork to the base branch: staging

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
3. [Creating Github Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
4. [Server Dashboard](https://app.pm2.io/bucket/61156f4ba8456f045317b129/backend/overview/servers) - **Authorised Access Only**
