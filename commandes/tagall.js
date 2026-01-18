const { fana } = require("../njabulo/fana")
//const { getGroupe } = require("../bdd/groupe")
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

fana({ nomCom: "tagall", categorie: 'Group', reaction: "🚨" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions

  if (!verifGroupe) return await sendFormattedMessage(zk, dest, "thís cσmmαnd ís rєsєrvєd fσr grσups", ms);

  let mess = arg.join(' ') || 'Aucun Message';
  let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
  let tag = `*Group* : *${nomGroupe}* \n*Message* : *${mess}*\n\n`;
  let emoji = ['> ᴅᴇᴀʀ😡'];
  let random = Math.floor(Math.random() * emoji.length);

  for (const membre of membresGroupe) {
    tag += `${emoji[random]} @${membre.id.split("@")[0]}\n`;
  }

  if (verifAdmin || superUser) {
    await zk.sendMessage(dest, {
        interactiveMessage: {
        header: tag,
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
    
  } else {
    await sendFormattedMessage(zk, dest, 'command reserved for admins', ms);
  }
});
