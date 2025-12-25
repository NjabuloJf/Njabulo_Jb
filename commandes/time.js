

const { fana } = require("../njabulo/fana");
const config = require("../set");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({ 
  nomCom: "uptime", 
  alias: ["speed", "pong"], 
  categorie: "General", 
  reaction: "📌", 
  use: ".ping", 
}, async (dest, zk, commandeOptions) => {
  console.log('Command triggered!');
  const { repondre, ms } = commandeOptions;
  try {
    const start = new Date().getTime();
    const reactionEmojis = ['❄️'];
    const textEmojis = ['🚀'];
    const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
    let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
    while (textEmoji === reactionEmoji) {
      textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
    }
    
   const runtime = function (seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};


    await zk.sendMessage(dest, { react: { text: textEmoji, key: ms.key } });
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;
    const imageUrl = "https://files.catbox.moe/u6v5ir.jpg";
    const njabulox = [
  "",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

    
    const card = {
      header: {
        title: `sʏsᴛᴇᴍs ᴜᴘᴛɪᴍᴇ🏓`,
        hasMediaAttachment: true,
        imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
      },
      body: {
        text: `*ᴅᴀᴛᴇ* : ${now.format("YYYY‑MM‑DD")\n📆 *ᴅᴀʏ* : ${now.format("dddd")}\n⏰ *ᴛɪᴍᴇ* : ${now.format("HH:mm:ss")}\n⏳ *sʏsᴛᴇᴍs ᴜᴘᴛɪᴍᴇ* : *${runtime(process.uptime())}  ${reactionEmoji}* `,
      },
      footer: {
        text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "🌐 View on YouTube",
              url: `https://youtu.be/`,
            }),
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📋 Copy Link",
              copy_code: "https://youtu.be/",
            }),
          },
        ],
      },
    };
          

    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: {
              header: { text: `🔍 Search Results for` },
              body: { text: `*📂 sʏsᴛᴇᴍs ᴜᴘᴛɪᴍᴇ.....*` },
              carouselMessage: { cards: [card] },
            },
          },
        },
      },
      { quoted: ms }
    );

    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    console.error("Error in ping command:", e);
    repondre(`An error occurred: ${e.message}`);
  }
});
