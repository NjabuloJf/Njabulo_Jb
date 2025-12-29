
const { fana } = require("../njabulo/fana");
const { getContentType } = require("@whiskeysockets/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

fana({
  nomCom: "vv",
  aliases: ["send", "keep"],
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, superUser, ms } = commandeOptions;

  if (msgRepondu) {
    console.log(msgRepondu);
    let msg;
    try {
      // Check for different message types and handle accordingly
      if (msgRepondu.imageMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        msg = {
          image: { url: media },
          caption: msgRepondu.imageMessage.caption
        };
      } else if (msgRepondu.videoMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        msg = {
          video: { url: media },
          caption: msgRepondu.videoMessage.caption
        };
      } else if (msgRepondu.audioMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        msg = {
          audio: { url: media },
          mimetype: 'audio/mp4'
        };
      } else if (msgRepondu.stickerMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
        const stickerMess = new Sticker(media, {
          pack: '𝚃𝙸𝙼𝙽𝙰𝚂𝙰 𝚃𝙼𝙳',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
        msg = { sticker: stickerBuffer2 };
      } else {
        msg = { text: msgRepondu.conversation };
      }
      // Send the message
      await zk.sendMessage(dest,{ 
        msg, 
      },{ quoted: ms });
    } catch (error) {
      console.error("Error processing the message:", error);
      await zk.sendMessage(dest, { text: 'An error occurred while processing your request.' }, { quoted: ms });
    }
  } else {
    await zk.sendMessage(dest, { text: 'Mention the message that you want to save' }, { quoted: ms });
  }
});

