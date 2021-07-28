// Intialise GitHub API
const github = require("octonode");
const client = github.client();

// Test GitHub API
client.get("/users/pksunkara", {}, function (err, status, body, headers) {
    console.log(body); //json object
});

// Test js file call
console.log("This works");
