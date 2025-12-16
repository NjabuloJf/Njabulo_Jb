

const { fana } = require("../njabulo/fana");
const speed = require("performance-now");
const moment = require("moment-timezone");

const njabulox = [
  "", // keep the empty entry if you want a chance of no image
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

fana(
  {
    nomCom: "pi",
    alias: ["speed", "pong"],
    categorie: "General",
    reaction: "📌",
    use: ".ping",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, auteurMessage, ms } = commandeOptions;

    try {
      const start = new Date().getTime();

      // emoji handling
      const reactionEmojis = ["❄️"];
      const textEmojis = ["🚀"];
      const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
      let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
      while (textEmoji === reactionEmoji) {
        textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
      }

      await zk.sendMessage(dest, {
        react: { text: textEmoji, key: ms.key },
      });

      const end = new Date().getTime();
      const responseTime = (end - start) / 1000;

      const header = {
        title: `╭━━〔 💥 𝗣𝗜𝗡𝗚 𝗧𝗘𝗦𝗧 〕━━╮\n┃ 🤖 *BOT* : *DML-XMD*\n┃ ⏳ *PING* : ${reactionEmoji}*\n╰━━━━━━━━━━━━━━━━━━╯`,
        subtitle: "> *POWERED BY YOU*",
      };

      const button = {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: "View website",
          sections: [
            { label: "Visit Channel", cta_url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u" },
            { label: "GitHub", cta_url: "https://github.com/your-repo" },
          ],
        }),
      };

      await zk.sendMessage(dest, {
        interactiveMessage: {
          image: { url: randomNjabulourl },
          header,
          buttons: [button],
          headerType: 1, // 1 = image
        },
      });
    } catch (e) {
      console.error("Error in ping command:", e);
      repondre(`An error occurred: ${e.message}`);
    }
  }
);
