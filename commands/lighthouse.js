const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
async function getStats(url){
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
  return chromeLauncher.launch().then(chrome => {
    const opts = {
      port: chrome.port
    };
    return lighthouse(url, opts).then(results => {
      return chrome.kill().then(() => results.report);
    });
})
}
module.exports = {
	name: "lighthouse",
	description: 'Command used to get lighthouse stats for a site',
	execute(command, message,args) {
    if (!args.length) {
      return message.reply("Please provide the site url to get its lighthouse stats.");
  } else {
      let url = args[0];
      getStats(url).then(results => {
        console.log(results);
      });
      return message.reply("Got the lighthouse stats.");
  }
}
}

