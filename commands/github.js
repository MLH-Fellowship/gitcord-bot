module.exports = {
	name: "github",
	description: 'GitHub bot commands',
	execute(command, message, args) {
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

    // -github: Enter personal token
    if (command === "github") {
      return message.reply("use -github-info with your personal Github token to continue.");
    } 
    
    // -github-info: Get contents of personal token
    if (command === "github-info") {
      if (!args.length) {
        return message.reply("you didn't provide a GitHub Personal Token.");
      } else {
      githubToken = args[0];
      client = github.client(githubToken);
      return this.channel.send("Now enter your issue number by mentioning it after -github-comment-issue");
    // -github-comment-issue: Post comment
   } else if (message === "github-comment-issue") {
      return this.channel.send("Enter the number of the issue you'd like to comment on with -github-issue-number");

    // -github-issue-number: Get issue/PR number from user
    if (command === "github-issue-number") {
      issue = parseInt(args[0]);

      if (isNaN(issue)) {
        return message.reply("sorry, that isn't a valid issue number.").catch(error => console.log(error));
      } else {
        return message.reply("to post a comment on issue " + issue + " , use -github-post-comment followed by your message.");
      }
    } 
    
    // -github-post-comment: Posts desired comment on previously specified issue/PR
    } else if (message === "github-post-comment") {
      // TODO: Add some fallback if token hasn't been set
      let commentBody="";
      args.forEach(arg=>{
        commentBody+=" "+ arg;
      })
      const result = await client.issue(repo, issue).createCommentAsync({
        body: commentBody,
      }).then(result => {
        return this.channel.send("Your comment: " + result[0].body + " has been posted.").catch(error => console.log(error));
      });
    }
  }
};

// Post Comment function
async function postComment(issue, comment) { 
    await client.issue(repo, issue).createCommentAsync({
    body: comment,
    }).then(result => {
      return message.reply("Your comment: " + result[0].body + " has been posted.");
    }).catch(error => console.log(error));
}