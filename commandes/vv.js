
const { fana } = require("../njabulo/fana");
const { getContentType } = require("@whiskeysockets/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const config = require("../set");

fana({
  nomCom: "vv",
  aliases: ["send", "keep"],
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  try {
    const { repondre, msgRepondu, superUser, ms } = commandeOptions;

    if (!msgRepondu) {
      await zk.sendMessage(dest, { text: 'Mention the message that you want to save' }, { quoted: ms });
      return;
    }

    const type = getContentType(msgRepondu);
    let message;

    if (type === 'conversation') {
      message = { text: msgRepondu.conversation };
    } else if (type === 'imageMessage') {
      const media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
      message = {
        interactiveMessage: {
          header: { hasMedia: "image", imageMessage: { url: media }, headerType: 1 },
          body: { text: msgRepondu.imageMessage.caption },
          footer: { text: 'Pσɯҽɾԃ Ⴆყ ɳʝαႦυʅσ ʝႦ' },
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐WA channel",
                id: "backup channel",
                url: config.GURL
              }),
            },
          ],
        },
      };
    } else if (type === 'videoMessage') {
      const media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
      message = {
        interactiveMessage: {
          header: { hasMedia: "video", videoMessage: { url: media }, headerType: 1 },
          body: { text: msgRepondu.videoMessage.caption },
          footer: { text: 'Pσɯҽɾԃ Ⴆყ ɳʝαႦυʅσ ʝႦ' },
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐WA channel",
                id: "backup channel",
                url: config.GURL
              }),
            },
          ],
        },
      };
    } else if (type === 'stickerMessage') {
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
      message = { sticker: stickerBuffer2 };
    } else {
      message = { text: 'Unsupported message type' };
    }

    await zk.sendMessage(dest, message, { quoted: ms });
  } catch (error) {
    console.error("Error sending message:", error);
    await zk.sendMessage(dest, { text: 'Error sending message' }, { quoted: ms });
  }
});

   
