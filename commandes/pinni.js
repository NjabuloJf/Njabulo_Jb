const { fana } = require("../njabulo/fana");
const config = require("../set");

// PING COMMAND BY DML
fana({
  nomCom: "pinni",
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
      react: { text: textEmoji, key: commandeOptions.ms.key },
    });

    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;
    const imageUrl = "https://files.catbox.moe/u6v5ir.jpg",


    const card = {
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
                url: `https://youtu.be.com`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: ""
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
              messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
              interactiveMessage: {
                body: { text: `🔍 Search Results for` },
                footer: { text: `📂 Found 1 result` },
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
