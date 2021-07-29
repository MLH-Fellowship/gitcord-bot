
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

// Post Issue Comment
async function postComment(issue) {
  const result = await client.issue(repo, issue).createCommentAsync({
    body: "A test comment posted through the Gitcord Bot!",
  });
  // console.log("Your comment: " + result[0].body + " has been posted.");
  return result[0].body;
}

const retrieveResults = async (issue) => {
  await postComment(issue);
};

//Function to post the comment and send a message in the server
const func = {
  botMessage: function (message) {
    if (message === "github") {
      retrieveResults(7);
      return this.channel.send("Your comment has been posted!");
    }
  },
};
module.exports = func;
