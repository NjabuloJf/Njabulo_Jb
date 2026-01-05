const { fana } = require("../njabulo/fana");
const config = require("../set");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');



fana({
  nomCom: "po",
  alias: ["speed", "pong"],
  categorie: "General",
  reaction: "📌",
  use: ".ping",
}, async (dest, zk, commandeOptions) => {
  console.log('Command triggered!');
  const { repondre, ms } = commandeOptions;
  try {
    const njabulox = [
      "https://files.catbox.moe/mh36c7.jpg",
      "https://files.catbox.moe/bnb3vx.jpg"
    ];

    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
    if (!randomNjabulourl) {
      console.error("Error: No image URL found.");
      repondre("An error occurred: No image URL found.");
      return;
    }

    
    
    const start = new Date().getTime();
    await zk.sendPresenceUpdate('composing', dest);
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const cards = [
      {     
        header: {
          title: `📊 Ping`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `⏳ *ping*`,
        },
        footer: {
          text: "",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹",
                url: config.GURL
              }),           
           },
          ],
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
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: {
              header: { text: `🔍 System Info` },
              body: { text: `*📂 sʏsᴛᴇᴍs ʟᴏᴀᴅɪɴɢ*` },
              headerType: 1,
              carouselMessage: { cards },
            },
          },
        },
            }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "ɳʝαႦυʅσ ʝႦ",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    console.error("Error in menu command:", e);
    repondre(`An error occurred: ${e.message}`);
  }
});
