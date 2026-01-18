const { fana } = require("../njabulo/fana")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../bdd/antilien")
const {atbajouterOuMettreAJourJid,atbverifierEtatJid} = require("../bdd/antibot")
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const config = require("../set");
const { default: axios } = require('axios');

const baseButtons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "[⏤͟͟͞͞★𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹✘]",
      id: "backup channel",
      url: config.GURL,
    }),
  },
];




    // List of image URLs
    const njabulox = [
        "https://files.catbox.moe/iii5jv.jpg",
        "https://files.catbox.moe/xjeyjh.jpg",
        "https://files.catbox.moe/mh36c7.jpg",
        "https://files.catbox.moe/u6v5ir.jpg",
        "https://files.catbox.moe/bnb3vx.jpg" // New image added
    ];

    // Select a random image file
    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
    

async function sendFormattedMessage(zk, chatId, text, ms) {
await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        header: text,
        buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "ɳʝαႦυʅσ ʝႦ",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363399999197102@newsletter",
            newsletterName: "╭••➤Njabulo Jb",
            serverMessageId: 143,
          },
          forwardingScore: 999,
        },
      },
    }, { quoted: ms });
}

fana({ nomCom: "del", categorie: 'Group',reaction:"ð?§¹" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe,auteurMsgRepondu,idBot, msgRepondu, verifAdmin, superUser} = commandeOptions;
  
  if (!msgRepondu) return await sendFormattedMessage(zk, dest, "*Please mention the message to delete.*", ms);

  if(superUser && auteurMsgRepondu==idBot) {
    const key = {
      remoteJid: dest,
      fromMe: true,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
    }
    await zk.sendMessage(dest, { delete: key });
    await sendFormattedMessage(zk, dest, "*Message deleted successfully.*", ms);
    return;
  }

  if (verifGroupe) {
    if (verifAdmin || superUser) {
      try {
        const key = {
          remoteJid: dest,
          id: ms.message.extendedTextMessage.contextInfo.stanzaId,
          fromMe: false,
          participant: ms.message.extendedTextMessage.contextInfo.participant
        }
        await zk.sendMessage(dest, { delete: key });
        await sendFormattedMessage(zk, dest, "*Message deleted successfully.*", ms);
      } catch (e) {
        await sendFormattedMessage(zk, dest, "*I need admin rights.*", ms);
      }
    } else {
      await sendFormattedMessage(zk, dest, "*Sorry, you are not an administrator of the group.*", ms);
    }
  }
});
