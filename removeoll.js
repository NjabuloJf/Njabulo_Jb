const { fana } = require("../njabulo/fana");
const axios = require("axios");
let { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList,
} = require("../bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList,
} = require("../bdd/banGroup");
const {
  removeSudoNumber,
  addSudoNumber,
  issudo,
} = require("../bdd/sudo");

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
            title: "💓ᥕᥱᥣᥴomᥱ fᥲmιᥣყ ",
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

// ── Kick all command ─────────────────────────────────────────────
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

fana(
  {
    nomCom: "kickall",
    categorie: "Group",
    reaction: "📣",
  },
  async (chatId, zk, commandeOptions) => {
    const {
      auteurMessage,
      ms,
      repondre,
      arg,
      verifGroupe,
      infosGroupe,
      nomAuteurMessage,
      verifAdmin,
      superUser,
    } = commandeOptions;

    if (!verifGroupe) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*✋🏿 ✋🏿thιs ᥴommᥲnd ιs rᥱsᥱrvᥱd for groᥙρs*",
        ms
      );
    }

    const metadata = await zk.groupMetadata(chatId);

    if (!(superUser || auteurMessage === metadata.owner)) {
      return sendFormattedMessage(
        zk,
        chatId,
        "Order reserved for the group owner for security reasons",
        ms
      );
    }

    sendFormattedMessage(
      zk,
      chatId,
      "Non-admin members will be removed from the group. You have 5 seconds to reclaim your choice by restarting the bot.",
      ms
    );
    await sleep(5000);

    const membresGroupe = verifGroupe ? await infosGroupe.participants : [];
    try {
      const users = membresGroupe.filter((member) => !member.admin);

      for (const membre of users) {
        await zk.groupParticipantsUpdate(chatId, [membre.id], "remove");
        await sleep(500);
      }
    } catch (e) {
      sendFormattedMessage(zk, chatId, "I need administration rights", ms);
    }
  }
);