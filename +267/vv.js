const { fana } = require("../njabulo/fana");
const { getContentType } = require("@whiskeysockets/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const config = require("../set");

const buttons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "[⏤͟͟͞͞★𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹✘]",
      id: "backup channel",
      url: config.GURL
    }),
  },
  ];

fana({
  nomCom: "vv",
  aliases: ["send", "keep"],
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  try {
    const { repondre, msgRepondu, superUser, ms } = commandeOptions;

    if (!msgRepondu) {
      await zk.sendMessage(dest, {
        interactiveMessage: {
        header: '*Mention the message that you want to save*',
        buttons,
        headerType: 1
      }
      }, { quoted: ms });
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
        image: { url: media },
        header: msgRepondu.imageMessage.caption,
        headerType: 1,
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "[⏤͟͟͞͞★𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹✘]",
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
        video: { url: media },
        header: msgRepondu.videoMessage.caption,
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "[⏤͟͟͞͞★𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹✘]",
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
        pack: 'Njabulo',
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
    await zk.sendMessage(dest, { 
      interactiveMessage: {
      header: 'Error sending message',
      buttons,
        headerType: 1
    }
    }, { quoted: ms });
  }
});

 
