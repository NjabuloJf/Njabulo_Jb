
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
    console.log('Using image:', randomNjabulourl);

    if (!randomNjabulourl) {
      console.error("Error: No image URL found.");
      repondre("An error occurred: No image URL found.");
      return;
    }

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

    const start = new Date().getTime();
    await zk.sendPresenceUpdate('composing', dest);
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const cards = [
      {
        header: {
          title: `📊 Uptime`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `⏳ *uptime* : *${runtime(process.uptime())} ${reactionEmoji}* `,
        },
        footer: { text: "" },
        nativeFlowMessage: {
          buttons: [
            { buttonId: ".alive", buttonText: { displayText: "Avaliable"}, type: 1 },
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
      {
        header: {
          title: `📊 Ping`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `⏳ *ping* : *${responseTime.toFixed(2)}s ${reactionEmoji}* `,
        },
        footer: { text: "" },
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
      },
      { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: "status@broadcast" }, message: { contactMessage: { displayName: "ɳʝαႦυʅσ ʝႦ", vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD` } } } }
    );

    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    console.error("Error in menu command:", e);
    repondre(`Error: ${e.message}. Check URLs or config.`);
  }
});

