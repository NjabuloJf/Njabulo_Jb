const { fana } = require("../njabulo/fana");
const {getContentType}=require("@whiskeysockets/baileys")

fana({
  nomCom: "vv",
  aliases: [],
  categorie: "User",
  reaction: "📸",
  description: "Reveals view-once images, videos or audios."
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  try {
    const quotedMessage = ms.quoted ? ms.quoted : null;
    if (!quotedMessage) return repondre("Reply to a view-once message.");

    const viewOnceMedia = quotedMessage.imageMessage?.viewOnce || quotedMessage.videoMessage?.viewOnce || quotedMessage.audioMessage?.viewOnce;
    if (!viewOnceMedia) return repondre("The replied message is not a view-once media.");

    let sendMsg;
    if (quotedMessage.imageMessage) {
      const buffer = await zk.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
      sendMsg = {
        image: { url: buffer },
        caption: quotedMessage.imageMessage.caption || '*REVEALED*'
      };
    } else if (quotedMessage.videoMessage) {
      const buffer = await zk.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
      sendMsg = {
        video: { url: buffer },
        caption: quotedMessage.videoMessage.caption || '*REVEALED*'
      };
    } else if (quotedMessage.audioMessage) {
      const buffer = await zk.downloadAndSaveMediaMessage(quotedMessage.audioMessage);
      sendMsg = {
        audio: { url: buffer },
        mimetype: 'audio/mp4'
      };
    }

    if (sendMsg) {
      await zk.sendMessage(dest, sendMsg, { quoted: ms });
    }
  } catch (err) {
    console.error('vv command error:', err);
    repondre("An error occurred while revealing the media.");
  }
});
