
// Intialise GitHub API
const github = require("octonode");
const client = github.client(process.env.GITHUB_TOKEN);
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
const ghrepo = client.repo(repo);

//Function to post the comment and send a message in the server
const func = {
  botMessage: async function (message) {
    // 
    if (message === "github-comment-issue" || message === "github-comment-pr") {
      const result = await client.issue(repo, 7).createCommentAsync({
        body: "A test comment posted through the Gitcord Bot!",
      }).then(result => {
        return this.channel.send("Your comment: " + result[0].body + " has been posted.");
      });
    }
  },
};
module.exports = func;
