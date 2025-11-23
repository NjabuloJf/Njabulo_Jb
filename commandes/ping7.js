const { fana } = require("../njabulo/fana");
const speed = require("performance-now");
const moment = require("moment-timezone");

const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg" // New image added
];

// Pick a random image URL
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getName(dest, commandeOptions) {
  return (
    commandeOptions.pushName ||
    commandeOptions.name ||
    (dest.sender ? dest.sender.split('@')[0] : "Unknown User")
  );
}

fana(
  {
    nomCom: 'ping7',
    desc: 'To check bot response time',
    Categorie: 'General',
    reaction: '⚡',
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);
    moment.tz.setDefault("Africa/Botswana");
    const temps = moment().format('hh:mm:ss A');
    const date = moment().format('DD/MM/YYYY');

    // Generate a random ping (1–10 s)
    const pingResults = [Math.floor(Math.random() * 10000 + 1000)];
    const formattedResults = pingResults.map(p => `${p}ms`).join("\n");

    // Send image + interactive button in a single message
    await zk.sendMessage(dest, {
      image: { url: randomNjabulourl },
      caption: `🏓 *sᴛᴀᴛᴜs▰▰▰▰▰▱ᴘᴏɴɢ: ${formattedResults}*`,
      interactiveMessage: {
        header: { title: "pong" },
        body: { text: "run" },
        footer: { text: "> Pσɯҽɾԃ Ⴆყ Njᥲbᥙᥣo" },
        buttons: [
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "Copy Ping Result",
              id: `copy_${Date.now()}`,
              copy_code: formattedResults,
            }),
          },
        ],
      },
    });

    console.log("Ping results sent successfully with copy button!");
  }
);
