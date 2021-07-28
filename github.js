// Intialise GitHub API
const github = require("octonode");
const client = github.client(process.env.GITHUB_TOKEN);
const scopes = {
    scopes: ["user", "repo"],
    note: "admin script",
};

// GitHub API Methods
// TODO: Remove those we don't use
const ghme = client.me();
const ghuser = client.user("pksunkara");
const ghrepo = client.repo("pksunkara/hub");
const ghorg = client.org("flatiron");
const ghissue = client.issue("pksunkara/hub", 37);
const ghmilestone = client.milestone("pksunkara/hub", 37);
const ghlabel = client.label("pksunkara/hub", "todo");
const ghpr = client.pr("pksunkara/hub", 37);
const ghrelease = client.release("pksunkara/hub", 37);
const ghgist = client.gist();
const ghteam = client.team(37);
const ghproject = client.project(37);
const ghnotification = client.notification(37);

const ghsearch = client.search();

// Test GitHub API auth
async function getPullRequests() {
    const repo = client.repo("MLH-Fellowship/pod-3.1.3-portfolio");

    const result = await repo.prsAsync({ per_page: 100 });
    console.log(result);
    return result[0];
}

const retrieveResults = async () => {
    await getPullRequests();
};

retrieveResults();
