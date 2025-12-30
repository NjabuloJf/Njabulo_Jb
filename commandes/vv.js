
const { fana } = require("../njabulo/fana");
const { getContentType } = require("@whiskeysockets/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

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
      message = { image: { url: media }, caption: msgRepondu.imageMessage.caption };
    } else if (type === 'videoMessage') {
      const media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
      message = { video: { url: media }, caption: msgRepondu.videoMessage.caption };
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

    await zk.sendMessage(dest,
                         {
    interactiveMessage: {
     message, 
   buttons,
   headerType: 1
  }
   { quoted: ms });
  } catch (error) {
    console.error("Error sending message:", error);
    await zk.sendMessage(dest, { text: 'Error sending message' }, { quoted: ms });
  }
});




fana({
  nomCom: "view",
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

    console.log(`Message type: ${type}`);

    if (type === 'conversation') {
      message = { text: msgRepondu.conversation };
    } else if (type === 'imageMessage') {
      const media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
      message = { image: { url: media }, caption: msgRepondu.imageMessage.caption };
    } else if (type === 'videoMessage') {
      const media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
      message = { video: { url: media }, caption: msgRepondu.videoMessage.caption };
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

    console.log('Sending message:', message);
    await zk.sendMessage(dest, { message }, { quoted: ms });
    console.log('Message sent successfully!');
  } catch (error) {
    console.error("Error sending message:", error);
    await zk.sendMessage(dest, { text: 'Error sending message' }, { quoted: ms });
  }
});

