
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
      // TODO: Get the number from user input
      return this.channel.send("Enter the number of the issue you'd like to comment on with -github-issue-number");
    }

    // -github-issue-number: Get issue or PR number from user to post comment on
    if (!args.length) {
      return this.channel.send(`You didn't provide any arguments, ${this.author}!`);
    }
     if (!args.length) {
        return this.channel.send(`You didn't provide any arguments, ${this.author}!`);
      } else {
        issue = args[0];
      const result = await client.issue(repo, issue).createCommentAsync({
        body: "A test comment posted through the Gitcord Bot!",
      }).then(result => {
        return this.channel.send("Your comment: " + result[0].body + " has been posted.").catch(error => console.log(error));
      });
      }
  },
};
module.exports = func;