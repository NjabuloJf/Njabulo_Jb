

const { fana } = require("../njabulo/fana");
const config = require("../set");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({ 
  nomCom: "fana", 
  alias: ["speed", "pong"], 
  categorie: "General", 
  reaction: "📌", 
  use: ".ping", 
}, async (dest, zk, commandeOptions) => {
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
    await zk.sendMessage(dest, { react: { text: textEmoji, key: ms.key } });
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;
    const imageUrl = "https://files.catbox.moe/u6v5ir.jpg"; // Use a valid image URL
    const uptime = process.uptime();
    const days = Math.floor(uptime / (60 * 60 * 24));
    const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const cards = [
      {
        header: {
          title: `⏳ *PING* : *${responseTime.toFixed(2)}s`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: imageUrl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `⏳ *PING* : *${responseTime.toFixed(2)}s ${reactionEmoji}* `,
        },
        footer: {
          text: "🔹 Play song",
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
      },
      {
        header: {
          title: 'Uptime',
        },
        body: {
          text: `⏰ Uptime: ${uptimeString}`,
        },
      },
    ];

    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: {
              body: { text: `🔍 System Status` },
              footer: { text: `📂 Found ${cards.length} results` },
              carouselMessage: { cards },
            },
          },
        },
      },
      { quoted: ms }
    );

    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    console.error("Error in fana command:", e);
    repondre(`An error occurred: ${e.message}`);
  }
});

            
