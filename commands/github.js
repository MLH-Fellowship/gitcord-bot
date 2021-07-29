
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
const ghuser = client.user("Inoxia25");
const ghrepo = client.repo("MLH-Fellowship/pod-3.1.3-team-4");
const ghissue = client.issue("MLH-Fellowship/pod-3.1.3-team-4", 7);
const ghpr = client.pr("pksunkara/hub", 37);
// Get PRs
async function getPullRequests() {
  const result = await ghrepo.prsAsync({ per_page: 100 });
  return result[0].body;
}

// Post Issue Comment
async function postIssueComment() {
  const result = await ghissue.createCommentAsync({
    body: "A test command posted through the Gitcord Bot!",
  });
  // console.log("Your comment: " + result[0].body + " has been posted.");
  return result[0].body;
}

const retrieveResults = async () => {
  await getPullRequests();
  await postIssueComment();
};

//Function to post the comment and send a message in the server
const func = {
  botMessage: function (message) {
    if (message === "github") {
      retrieveResults();
      return this.channel.send("Your comment has been posted!");
    }
  },
};
module.exports = func;
