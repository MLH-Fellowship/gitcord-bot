const db = require("../database");
const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const MyOctokit = Octokit.plugin(restEndpointMethods);

module.exports = {
  name: "github-info",
  description: "Get GitHub Personal Access Token",
  usage: "-github-info <your-github-personal-access-token>",
  execute(command, message, args) {
    if (!args.length) {
      db.fetchGit(message.author.id)
        .then((result) => {
          return message.reply(`Your GitHub token is on file: ${result}`);
        })
        .catch((err) => {
          console.error(err);
          return message.reply(
            "Your GitHub token isn't on file. Try again, specifying your GitHub token (once you do it, we'll store it securely)"
          );
        });
    } else {
      let githubToken = args[0];
      console.log(githubToken);
      let octokit = new MyOctokit({ auth: githubToken });
      octokit.rest.users
        .getAuthenticated({})
        .then((result) => {
          db.insertGitHubToken(message.author.id, githubToken)
            .then((result) => {
              return message.reply("GitHub auth was successful. Use -help to see what actions you can now take.");
            })
            .catch((err) => {
              db.updateGitHubToken(message.author.id, githubToken).then((result) => {
                return message.reply("Your GitHub token has been updated");
              });
            });
        })
        .catch((err) => {
          console.error(err);
          return message.reply(
            "Your GitHub token is incorrect. Make sure you've entered a valid GitHub token and try again."
          );
        });
    }
  },
};