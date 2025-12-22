
const { fana } = require("../njabulo/fana");
const config = require("../set");

const displayName = "🟢online njᥲbᥙᥣo🍥 | 🤖 BOT";
const vcard = `BEGIN:VCARD
VERSION:3.0
N:Njabulo-Jb;BOT;;;
FN:Njabulo-Jb
item1.TEL;waid=26777821911:+26777821911
item1.X-ABLabel:Bot
item2.EMAIL;type=INTERNET:njabulojb@example.com
item2.X-ABLabel:Email
item3.URL:https://njabulojb.com
item3.X-ABLabel:Website
item4.ORG:DML-XMD
item4.X-ABLabel:Organization
item5.TITLE:Developer
item5.X-ABLabel:Title
item6.NOTE:Powered by DML-XMD
item6.X-ABLabel:Note
END:VCARD`;

// PING COMMAND BY DML
fana({
  nomCom: "pii",
  alias: ["speed", "pong"],
  categorie: "General",
  reaction: "📌",
  use: ".ping",
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage } = commandeOptions;
  try {
    const start = new Date().getTime();
    // Reaction + text emojis
    const reactionEmojis = ['❄️'];
    const textEmojis = ['🚀'];
    const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
    let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
    while (textEmoji === reactionEmoji) {
      textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
    }
    // React
    await zk.sendMessage(dest, {
      react: {
        text: textEmoji,
        key: commandeOptions.ms.key
      },
    });
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;
    const text = `╭━━〔 💥 𝗣𝗜𝗡𝗚 𝗧𝗘𝗦𝗧 〕━━╮
┃ 🤖 *BOT* : *DML-XMD*
┃ ⏳ *PING* : *${responseTime.toFixed(2)}s ${reactionEmoji}*
╰━━━━━━━━━━━━━━━━━━╯
> *POWERED BY YOU*`;

    const q = "ping test";
    const picked = [{ directLink: "https://example.com" }]; // replace with actual data

    const cards = await Promise.all(picked.map(async (item, i) => ({
      header: {
        displayName: displayName,
        vcard: vcard,
      },
      body: {
        text: text
      },
      footer: {
        text: "🔹 Scroll to see more images"
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "🌐 View Original",
              url: item.directLink
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📋 Copy Link",
              copy_code: item.directLink
            })
          }
        ]
      }
    })));

    const message = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: {
            body: {
              text: `🔍 Ping Results`
            },
            footer: {
              text: `📂 Response Time: ${responseTime.toFixed(2)}s`
            },
            carouselMessage: {
              cards
            }
          }
        }
      }
    };

    await zk.sendMessage(dest, message);
  } catch (e) {
    console.error("Error in ping command:", e);
    repondre(`An error occurred: ${e.message}`);
  }
});


