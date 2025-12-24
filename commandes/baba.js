
  
const { fana } = require("../njabulo/fana");
const config = require("../set");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({ 
  nomCom: "baba", 
  alias: ["speed", "pong"], 
  categorie: "General", 
  reaction: "📌", 
  use: ".ping", 
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  try {
    const start = new Date().getTime();
    await zk.sendMessage(dest, { react: { text: '🚀', key: ms.key } });
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const uptime = process.uptime();
    const days = Math.floor(uptime / (60 * 60 * 24));
    const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const imageUrl = "https://files.catbox.moe/u6v5ir.jpg";
    const results = [
      {
        title: `⏳ PING: ${responseTime.toFixed(2)}s`,
        text: `⏳ PING: ${responseTime.toFixed(2)}s`,
        image: imageUrl,
      },
      {
        title: 'Uptime',
        text: `⏰ Uptime: ${uptimeString}`,
      },
    ];

    const cards = await Promise.all(results.map(async (result, i) => {
      if (i === 0) {
        return {
          header: {
            title: result.title,
            hasMediaAttachment: true,
            imageMessage: (await generateWAMessageContent({ image: { url: result.image } }, { upload: zk.waUploadToServer })).imageMessage,
          },
          body: {
            text: result.text,
          },
          footer: {
            text: "🔹 System Info",
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "🌐 Visit Website",
                  url: "https://example.com",
                }),
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "📋 Copy Text",
                  copy_code: "Hello, World!",
                }),
              },
            ],
          },
        };
      } else {
        return {
          header: {
            title: result.title,
          },
          body: {
            text: result.text,
          },
        };
      }
    }));

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
              footer: { text: `📂 Found ${results.length} results` },
              carouselMessage: { cards },
            },
          },
        },
      },
      { quoted: ms }
    );

    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    console.error("Error in pinni command:", e);
    repondre(`An error occurred: ${e.message}`);
  }
});

