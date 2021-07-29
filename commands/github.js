
// Intialise GitHub API
const github = require("octonode");
const fs = require("fs");
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
    if (message === "github") {
      return this.channel.send("Enter your personal Github token with -github-info");
    } else if (message=== 'github-info') {
      if (!args.length) {
        return this.channel.send(`You didn't provide any arguments, ${this.author}!`);
      }
      githubToken = args[0];
      client = github.client(githubToken);
      fs.writeFile('githubtoken.txt', githubToken, function (err) {
        if (err) return console.log (err);
        console.log("Github Token has been stored");
      });
      this.channel.send(`Command name: ${message}\nArguments: ${githubToken}`);
   } else if (message === "github-comment-issue") {
      // TODO: Get the number from user input
      console.log("This message works");
      issue = 4;
      fs.readFile("/github-token.txt", function (text, err) {
      if (err) return console.log (err);
      client = github.client(text);
      const result = await client.issue(repo, issue).createCommentAsync({
        body: "A test comment posted through the Gitcord Bot!",
      }).catch(error => console.log(error)).then(result => {
        return this.channel.send("Your comment: " + result[0].body + " has been posted.");
    });
    });
    }
  },
};
module.exports = func;