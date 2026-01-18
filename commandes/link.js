const { fana } = require("../njabulo/fana");
//const { getGroupe } = require("../bdd/groupe")
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const {
  ajouterOuMettreAJourJid,
  mettreAJourAction,
  verifierEtatJid,
} = require("../bdd/antilien");
const {
  atbajouterOuMettreAJourJid,
  atbverifierEtatJid,
} = require("../bdd/antibot");
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const config = require("../set");
const { default: axios } = require("axios");
//const { uploadImageToImgur } = require('../njabulo/imgur');

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // keep the empty entry if you want a chance of no image
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Standard button set (used by all modules) ────────────────────────
const baseButtons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹",
      id: "backup channel",
      url: config.GURL
    }),
  },
];

// ── Helper that sends an *interactive* message with image + buttons ─────
async function sendFormattedMessage(zk, chatId, text, ms) {
  // clone the button array so we can set the copy_code for this message
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy",
    id: "copy",
    copy_code: text, // copy the exact text that was sent
  });

  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: randomNjabulourl },
        header: text,
        buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "🖇️ Group link",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
        },
      },
    },
    {
      quoted: {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
        },
        message: {
          contactMessage: {
            displayName: "njᥲbᥙᥣo",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`,
          },
        },
      },
    }
  );
}

// ── “link” command ─────────────────────────────────────────────
fana(
  {
    nomCom: "link",
    categorie: "Group",
    reaction: "🖇️",
  },
  async (dest, zk, commandeOptions) => {
    const {
      repondre,
      nomGroupe,
      nomAuteurMessage,
      verifGroupe,
      ms,
    } = commandeOptions;

    if (!verifGroupe) {
      return sendFormattedMessage(
        zk,
        dest,
        "wait bro , you want the link to my dm?",
        ms
      );
    }

    const link = await zk.groupInviteCode(dest);
    const lien = `https://chat.whatsapp.com/${link}`;

    const mess = `hello ${nomAuteurMessage}, here is the group link for ${nomGroupe} \n\nGroup link: ${lien} \n\n> ɳᴊᴀʙᴜʟᴏ ᴊʙ σғғɪᴄᴇ`;

    sendFormattedMessage(zk, dest, mess, ms);
  }
); 
