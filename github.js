// Intialise GitHub API
const github = require("octonode");
const client = github.client();

// Test GitHub API
//client.get("/users/pksunkara", {}, function (err, status, body, headers) {
//    console.log(body);
//});

github.auth
    .config({
        username: process.env.GITHUB_USERNAME,
        password: process.env.GITHUB_PASSWORD,
        otp: process.env.GITHUB_OTP,
    })
    .login(scopes, function (err, id, token, headers) {
        if (id === null) {
            console.log(err);
        } else {
            console.log(id, token);
        }
    });

// Test GitHub API Auth
var scopes = {
    scopes: ["user", "repo", "gist"],
    note: "admin script",
};
