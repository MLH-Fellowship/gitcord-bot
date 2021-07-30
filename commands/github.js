module.exports = {
	name: "github",
	description: 'GitHub bot commands',
	execute(message, args) {
		// Intialise GitHub API
    const github = require("octonode");
    let githubToken= null;
    let client = github.client(githubToken);
    const scopes = {
      scopes: ["user", "repo"],
      note: "admin script",
    };

    // GitHub API Methods
    const ghme = client.me();
    const ghsearch = client.search();

    // TODO: Refactor var content to variables - array? class? or just use content instead of client
    const repo = "MLH-Fellowship/pod-3.1.3-team-4";
    let issue = null;
    const ghuser = client.user("Inoxia25");
    const ghrepo = client.repo("MLH-Fellowship/pod-3.1.3-team-4");


    // Post the comment and send a message in the server
    console.log("The user sent " + message.content);

    // -github: Enter personal token
    if (message.content === "-github") {
      return message.reply("use -github-info with your personal Github token to continue.");

    // -github-info: Get contents of personal token
    } else if (message === 'github-info') {
      if (!args.length) {
        return message.reply("you didn't provide a GitHub Personal Token.");
      }
      githubToken = args[0];
      client = github.client(githubToken);

    // -github-comment-issue: Post comment
   } else if (message === "github-comment-issue") {
      return message.reply("enter the number of the issue you'd like to comment on with -github-issue-number");

    // -github-issue-number: Get issue/PR number from user
    } else if (message === "github-issue-number") {
      issue = parseInt(args[0]);

      if (isNaN(issue)) {
        return message.reply("sorry, that isn't a valid issue number.").catch(error => console.log(error));
      } else {
        return message.reply("to post a comment on issue " + issue + " , use -github-post-comment followed by your message.").catch(error => console.log(error));
      }
    // -github-post-comment: Posts desired comment on previously specified issue/PR
    }
  },
};