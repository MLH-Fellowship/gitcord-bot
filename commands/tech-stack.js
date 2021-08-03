var express = require("express");
var router = express.Router();
var request = require("request");
const Wappalyzer = require("wappalyzer");
const options = {
    recursive: false,
};
const wappalyzer = new Wappalyzer(options);
async function getStacks(url, headers) {
    try {
        await wappalyzer.init();

        // Optionally set additional request headers
        const headers = {};

        const site = await wappalyzer.open(url, headers);

        // Optionally capture and output errors
        site.on("error", console.error);

        await site.analyze().then((result) => {
            let stackList = [];
            //let results = JSON.stringify(result, null, 2);
            // console.log(result.technologies);
            result.technologies.forEach((tech) => {
                stackList.push(tech.name);
            });
            return stackList;
        });
        await wappalyzer.destroy();
    } catch (err) {
        console.error(err);
    }
}
module.exports = {
    name: "tech-stack",
    description: "Command to return tech stack used by a website.",
    async execute(command, message, args) {
        wapAPI = "MDv8PvksT0aJkwARi1iah5ZvLroTzjEJ5q2I1zpU";

        if (!args.length) {
            return message.reply("Please provide the site url to identify its tech-stack.");
        } else {
            let url = args[0];
            const headers = {};
            let stacks = await getStacks(url, headers);
            console.log(stacks);
            return message.reply("Got the tech-stacks!");
            /*var options = {
                url:
                  "https://api.wappalyzer.com/live/v2/?urls=" +
                  siteurl +
                  "&recursive=false",
                headers: { "x-api-key ":  wapAPI},
                json: true,
              };*/
            /*request.get(options, function (error, response, body) {
                  console.log(response);
                  return message.reply(
                    "Got the tech-stacks!"
                );
              });*/

            // githubToken = args[0];
            // writeToken(githubToken);
        }
    },
};
