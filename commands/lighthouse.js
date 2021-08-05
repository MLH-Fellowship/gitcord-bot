const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
async function getStats(url) {
  /*const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
  const runnerResult = await lighthouse(url, options);
  // // `.report` is the HTML report as a string
  // const reportHtml = runnerResult.report;
  // fs.writeFileSync('lhreport.html', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();*/
  return chromeLauncher.launch({chromeFlags: ['--headless']}).then((chrome) => {
    const opts = {
      logLevel: 'info', output: 'html',
      onlyCategories: ["performance", 
      "accessibility", "best-practices", "seo"],
      port: chrome.port,
    };
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
      return message.reply(
        "Please provide the site url to get its lighthouse stats."
      );
    } else {
      let url = args[0];
      getStats(url)
        .then((results) => {
          const perfscore=results.lhr.categories.performance.score || "NA";
          const accessibiltyScore=results.lhr.categories.accessibility.score?results.lhr.categories.accessibility.score * 100:"NA";
          const bestPracticeScore=results.lhr.categories["best-practices"].score * 100 || "NA";
          const seoScore=results.lhr
          .categories.seo.score * 100 || "NA";
          //results.lhr.categories.performance.score * 100
          return message.reply(
            "The website, " +
                url +
                " has been analysed and the lighthouse stats are: " +
                "\r\n" +
                " • Performance Score: " +perfscore +
                "\r\n" +
                " • Accessibility Score: " +accessibiltyScore +
                "\r\n" +
                " • Best Practices Score: " +bestPracticeScore +
                "\r\n" +
                " • SEO Score: " +seoScore 
        
        );
       
        })
        .catch((error) => {
          console.log(error);
          return message.reply(
            "Fetching your lighthouse stats was unsuccessful. Please try again."
          );
        });
    }
  },
};
