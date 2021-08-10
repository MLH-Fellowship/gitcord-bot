const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

async function getStats(url) {
    return chromeLauncher.launch({ chromeFlags: ["--headless"] }).then((chrome) => {
        const opts = {
            logLevel: "info",
            output: "html",
            onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
            audits: ["first-meaningful-paint", "first-cpu-idle", "byte-efficiency/uses-optimized-images"],
            port: chrome.port,
        };
        opts.strategy = "desktop";
        return lighthouse(url, opts).then((results) => {
            return chrome
                .kill()
                .then(() => results)
                .catch((error) => {
                    console.log(error);
                });
        });
    });
}
module.exports = {
    name: "lighthouse",
    description: "Command used to get lighthouse stats for a site",
    execute(command, message, args) {
        if (!args.length) {
            return message.reply("Please provide the site url to get its lighthouse stats.");
        } else {
            let url = args[0];
            getStats(url)
                .then((results) => {
                    const perfscore = results.lhr.categories.performance.score * 100 || "NA";
                    const accessibiltyScore = results.lhr.categories.accessibility.score * 100 || "NA";
                    const bestPracticeScore = results.lhr.categories["best-practices"].score * 100 || "NA";
                    const seoScore = results.lhr.categories.seo.score * 100 || "NA";
                    return message.reply(
                        `The website, ${url} has been analysed and the Lighthouse stats for the desktop view are:
                      • Performance Score: ${perfscore}
                      • Accessibility Score: ${accessibiltyScore}
                      • Best Practices Score: ${bestPracticeScore}
                      • SEO Score: ${seoScore}`
                    );
                })
                .catch((error) => {
                    console.log(error);
                    return message.reply("Fetching your lighthouse stats was unsuccessful. Please try again.");
                });
        }
    },
};
