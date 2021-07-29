
// Intialise GitHub API
const github = require("octonode");
let githubToken= null;
const client = github.client(githubToken);
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
const ghissue = client.issue("MLH-Fellowship/pod-3.1.3-team-4", 4);
const ghpr = client.pr("pksunkara/hub", 37);
// Get PRs
async function getPullRequests() {
  const result = await ghrepo.prsAsync({ per_page: 100 });
  return result[0];
}

// TODO: Add post comment on PR method - https://github.com/pksunkara/octonode#add-a-comment-on-a-pull-request-post-repospksunkarahubpulls37comments

// Post Issue Comment
async function postIssueComment() {
  const result = await ghissue.createCommentAsync({
    body: "A test command posted through the Gitcord Bot!",
  }).catch(error => console.log(error));
  
}

const retrieveResults = async () => {
  await getPullRequests();
  await postIssueComment();
};


//Function to post the comment and send a message in the server
const func = {
  botMessage: function (message,args) {
    if (message === "github") {
      //retrieveResults();
      return this.channel.send("Enter your personal Github token with -github-info");
    }
    else if (message === "github-post")
    {
      retrieveResults();
      return this.channel.send("Comment posted");
    }
    else if (message=== 'github-info') {
      if (!args.length) {
        return this.channel.send(`You didn't provide any arguments, ${this.author}!`);
      }
          githubToken=args;
      this.channel.send(`Command name: ${message}\nArguments: ${githubToken}`);
    }
  },
};
module.exports = func;
