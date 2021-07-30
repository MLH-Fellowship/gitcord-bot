
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


//Function to post the comment and send a message in the server
const func = {
  botMessage: async function (message, args) {
    console.log("The command posted is " + message);

    // -github: Enter personal token
    if (message === "github") {
      return this.channel.send("Enter your personal Github token with -github-info");

    // -github-info: Get contents of personal token
    } else if (message === 'github-info') {
      if (!args.length) {
        return this.channel.send(`You didn't provide a GitHub Personal Token, ${this.author}!`);
      }
      githubToken = args[0];
      client = github.client(githubToken);

    // -github-comment-issue: Post comment
   } else if (message === "github-comment-issue") {
      return this.channel.send("Enter the number of the issue you'd like to comment on with -github-issue-number");

    // -github-issue-number: Get issue/PR number from user
    } else if (message === "github-issue-number") {
      issue = parseInt(args[0]);

      if (isNaN(issue)) {
        return this.channel.send("Sorry, that isn't a valid issue number.").catch(error => console.log(error));
      } else {
        return this.channel.send("To post a comment on issue " + issue + " , use -github-post-comment followed by your message.").catch(error => console.log(error));
      }
    // -github-post-comment: Posts desired comment on previously specified issue/PR
    } else if (message === "github-post-comment") {
      // TODO: Add some fallback if token hasn't been set
      const result = await client.issue(repo, issue).createCommentAsync({
        body: args[0],
      }).then(result => {
        return this.channel.send("Your comment: " + result[0].body + " has been posted.").catch(error => console.log(error));
      });
    }
  },
};
module.exports = func;