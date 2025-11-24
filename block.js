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
            renderLargerThumbnail: true,
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

// ── Block command ─────────────────────────────────────────────
fana(
  {
    nomCom: "block",
    categorie: "Mods",
  },
  async (chatId, zk, commandeOptions) => {
    const {
      arg,
      ms,
      repondre,
      verifGroupe,
      msgRepondu,
      verifAdmin,
      superUser,
      auteurMessage,
      auteurMsgRepondu,
    } = commandeOptions;

    if (!superUser) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*Commᥲnd rᥱsᥱrvᥱd for thᥱ bot oᥕnᥱr*",
        ms
      );
    }

    if (!msgRepondu) {
      if (verifGroupe) {
        return sendFormattedMessage(
          zk,
          chatId,
          "*Bᥱ sᥙrᥱ to mᥱntιon thᥱ ρᥱrson to bᥣoᥴk*",
          ms
        );
      }
      const jid = chatId;
      await zk.updateBlockStatus(jid, "block");
      sendFormattedMessage(zk, chatId, "Success", ms);
    } else {
      const jid = auteurMsgRepondu;
      await zk.updateBlockStatus(jid, "block");
      sendFormattedMessage(zk, chatId, "Success", ms);
    }
  }
);

// ── Unblock command ─────────────────────────────────────────────
fana(
  {
    nomCom: "unblock",
    categorie: "Mods",
  },
  async (chatId, zk, commandeOptions) => {
    const {
      arg,
      ms,
      repondre,
      verifGroupe,
      msgRepondu,
      verifAdmin,
      superUser,
      auteurMessage,
      auteurMsgRepondu,
    } = commandeOptions;

    if (!superUser) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*Commᥲnd rᥱsᥱrvᥱd for thᥱ bot oᥕnᥱr*",
        ms
      );
    }

    if (!msgRepondu) {
      if (verifGroupe) {
        return sendFormattedMessage(
          zk,
          chatId,
          "*Pᥣᥱᥲsᥱ mᥱntιon thᥱ ρᥱrson to bᥱ ᥙnᥣoᥴkᥱd*",
          ms
        );
      }
      const jid = chatId;
      await zk.updateBlockStatus(jid, "unblock");
      sendFormattedMessage(zk, chatId, "*Sᥙᥴᥴᥱss*", ms);
    } else {
      const jid = auteurMsgRepondu;
      await zk.updateBlockStatus(jid, "unblock");
      sendFormattedMessage(zk, chatId, "*Sᥙᥴᥴᥱss*", ms);
    }
  }
);