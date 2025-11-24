const { exec } = require("child_process");
const { fana } = require("../njabulo/fana");
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
const conf = require("../set");
const axios = require("axios");
const {
  getBinaryNodeChild,
  getBinaryNodeChildren,
} = require("@whiskeysockets/baileys");

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // (empty string kept as in original)
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Base button definition (same as in other modules) ─────
const baseButtons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Website",
      id: "backup channel",
      url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
    }),
  },
  {
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: "Copy",
      id: "copy",
      copy_code: "", // will be filled dynamically
    }),
  },
];

// ── Helper that sends an interactive message with image + buttons ─────
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
            title: "njᥲbᥙᥣo jb",
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

// ── Approve command ─────────────────────────────────────────────
fana(
  {
    nomCom: "approve",
    aliases: ["approve-all", "accept"],
    categorie: "Group",
    reaction: "🔎",
  },
  async (chatId, zk, context) => {
    const { repondre, verifGroupe, verifAdmin, ms } = context;

    if (!verifGroupe) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*Thιs ᥴommᥲnd ᥕorks ιn groᥙρs onᥣყ*",
        ms
      );
    }

    if (!verifAdmin) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*Yoᥙ ᥲrᥱ not ᥲn ᥲdmιn hᥱrᥱ!*",
        ms
      );
    }

    const pendingRequests = await zk.groupRequestParticipantsList(chatId);
    if (pendingRequests.length === 0) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*Thᥱrᥱ ᥲrᥱ no ρᥱndιng joιn rᥱqᥙᥱsts*",
        ms
      );
    }

    for (const request of pendingRequests) {
      await zk.groupRequestParticipantsUpdate(chatId, [request.jid], "approve");
    }

    sendFormattedMessage(
      zk,
      chatId,
      "*Aᥣᥣ ρᥱndιng ρᥲrtιᥴιρᥲnts hᥲvᥱ bᥱᥱn ᥲρρrovᥱd to joιn bყ Njᥲbᥙᥣo Jb*",
      ms
    );
  }
);