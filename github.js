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

const ghuser = client.user("louisefindlay23");
const ghrepo = client.repo("MLH-Fellowship/pod-3.1.3-team-4");
const ghissue = client.issue("MLH-Fellowship/pod-3.1.3-team-4", 4);
const ghpr = client.pr("pksunkara/hub", 37);

// Get PRs
async function getPullRequests() {
    const result = await ghrepo.prsAsync({ per_page: 100 });
    console.log(result);
    return result[0];
}

// Post Issue Comment
async function postIssueComment() {
    const result = await ghissue.createCommentAsync({
        body: "Command-line comment test.",
    });
    console.log(result.body);
    return result[0];
}

const retrieveResults = async () => {
    await getPullRequests();
    await postIssueComment();
};

retrieveResults();
