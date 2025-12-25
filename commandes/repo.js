

const { fana } = require("../njabulo/fana");
const config = require("../set");
const axios = require("axios");
const moment = require("moment"); 
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({ 
  nomCom: "repo", 
  alias: ["speed", "pong"], 
  categorie: "General", 
  reaction: "📌", 
  use: ".ping", 
}, async (dest, zk, commandeOptions) => {
  console.log('Command triggered!');
  const { repondre, ms } = commandeOptions;
  try {


    const { data } = await axios.get("https://api.github.com/repos/NjabuloJ/Njabulo-Jb");

      const created = moment(data.created_at).format("DD/MM/YYYY");
      const updated = moment(data.updated_at).format("DD/MM/YYYY");
      const license = data.license?.name ?? "None";
      const language = data.language ?? "Not specified";
    
    const start = new Date().getTime();
    const reactionEmojis = ['❄️'];
    const textEmojis = ['🚀'];
    const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
    let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
    while (textEmoji === reactionEmoji) {
      textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
    }

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
        title: `sʏsᴛᴇᴍ ʀᴇᴘᴏsɪᴛᴏʀʏ`,
        hasMediaAttachment: true,
        imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
      },
      body: {
        text: `💫sᴛᴀʀ : ${data.stargazers_count}\n🍴ғᴏʀᴋs : ${data.forks_count} `,
      },
      footer: {
        text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "🌐 View on Github",
              url: `https://github.com/NjabuloJ/Njabulo-Jb`,
            }),
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📋 Copy Link",
              copy_code: data.html_url
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
              body: { text: `*📂 sʏsᴛᴇᴍ ʀᴇᴘᴏsɪᴛᴏʀʏ......*` },
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

