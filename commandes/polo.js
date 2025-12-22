const { fana } = require("../njabulo/fana");
const config = require("../set");

const displayName = "🟢online njᥲbᥙᥣo🍥 | 🤖 BOT";
const vcard = `BEGIN:VCARD
VERSION:3.0
N:Njabulo-Jb;BOT;;;
FN:Njabulo-Jb
item1.TEL;waid=26777821911:+26777821911
item1.X-ABLabel:Bot
item2.EMAIL;type=INTERNET:fanajb65@gmail.com
item2.X-ABLabel:Email
item3.URL:https://njabulojb.com
item3.X-ABLabel:Website
END:VCARD`;

// PING COMMAND BY DML
fana({
  nomCom: "pong",
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
    await zk.sendMessage(dest, {
      text,
      contextInfo: {
        mentionedJid: [auteurMessage],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363403958418756@newsletter',
          newsletterName: "DML-PING",
          serverMessageId: 143,
        },
      },
      quoted: {
        key: {
          fromMe: false,
          participant: `0@s.whatsapp.net`,
          remoteJid: "status@broadcast"
        },
        message: {
          contactMessage: {
            displayName: displayName,
            vcard: vcard
          }
        }
      }
    });
  } catch (e) {
    console.error("Error in ping command:", e);
    repondre(`An error occurred: ${e.message}`);
  }
});


