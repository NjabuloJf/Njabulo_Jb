const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const { fana } = require("../njabulo/fana");
const traduire = require("../njabulo/traduction");
const { downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys");
const fs = require("fs-extra");
const config = require("../set");
const axios = require("axios");
const FormData = require("form-data");
const { exec } = require("child_process");

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // (empty string kept as in original)
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Button definition (same as in other modules) ─────
const baseButtons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "[⏤͟͟͞͞★𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹✘]",
      id: "backup channel",
      url: config.GURL
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
}

// ── Translate command ─────────────────────────────────────────────
fana(
  {
    nomCom: "trt",
    categorie: "Use",
    reaction: "💗",
  },
  async (chatId, zk, commandeOptions) => {
    const { msgRepondu, repondre, arg, ms } = commandeOptions;

    if (!msgRepondu) {
      sendFormattedMessage(zk, chatId, "*Mention a text message*", ms);
      return;
    }

    if (!arg || !arg[0]) {
      sendFormattedMessage(zk, chatId, "(eg : trt en)", ms);
      return;
    }

    try {
      const sourceText = msgRepondu.conversation;
      const targetLang = arg[0];
      const translated = await traduire(sourceText, { to: targetLang });
      sendFormattedMessage(zk, chatId, translated, ms);
    } catch (error) {
      console.error("Translation error:", error);
      sendFormattedMessage(zk, chatId, "*Translation failed*", ms);
    }
  }
);
