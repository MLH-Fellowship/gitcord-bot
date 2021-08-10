const Wappalyzer = require("wappalyzer");
const options = {
  recursive: false,
};

const wappalyzer = new Wappalyzer(options);
async function getStacks(url, headers) {
  try {
    await wappalyzer.init();

    // Optionally set additional request headers
    const site = await wappalyzer.open(url, headers);

    // Optionally capture and output errors
    site.on("error", console.error);

    const analysis = await site.analyze().then((result) => {
      let stackList = [];
      const maxSize = Math.min(result.technologies.length, 7);
      for (let i = 0; i < maxSize; i++) {
        const techName = result.technologies[i].name;
        stackList.push(techName);
      }
      return stackList;
    });
    await wappalyzer.destroy();
    return analysis;
  } catch (err) {
    console.error(err);
  }
}
module.exports = {
  name: "tech-stack",
  description: "Command to return tech stack used by a website.",
  async execute(command, message, args) {
    if (!args.length) {
      return message.reply(
        "Please provide the site url to identify its tech-stack."
      );
    } else {
      let url = args[0];
      const headers = {};
      let stacks = await getStacks(url, headers);
      stacks = stacks.join("\r\n • ");
      // Return stacks to message
      return message.reply(
        `The website, ${url} has been analysed and the technologies it uses are: \n • ${stacks}`
      );
    }
  },
};
