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
const { default: axios } = require("axios");

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
            title: `ᥕᥱᥣᥴomᥱ fᥲmιᥣყ `,
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: false,
            thumbnailUrl: randomNjabulourl,
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

// ── Anti‑link command ─────────────────────────────────────────────
fana(
  {
    nomCom: "antilink",
    categorie: "Group",
    reaction: "🔗",
  },
  async (chatId, zk, commandeOptions) => {
    const {
      repondre,
      arg,
      verifGroupe,
      superUser,
      verifAdmin,
      ms,
    } = commandeOptions;

    if (!verifGroupe) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*for groups only*",
        ms
      );
    }

    if (!(superUser || verifAdmin)) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*You are not entitled to this order*",
        ms
      );
    }

    const etatOui = await verifierEtatJid(chatId);

    if (!arg[0]) {
      const helpText =
        "antilink on to activate the anti-link feature*\n*antilink off o deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.*";
      return sendFormattedMessage(zk, chatId, helpText, ms);
    }

    try {
      if (arg[0] === "on") {
        if (etatOui) {
          sendFormattedMessage(
            zk,
            chatId,
            "*the antilink is already activated for this group*",
            ms
          );
        } else {
          await ajouterOuMettreAJourJid(chatId, "oui");
          sendFormattedMessage(
            zk,
            chatId,
            "*the antilink is activated successfully*",
            ms
          );
        }
      } else if (arg[0] === "off") {
        if (etatOui) {
          await ajouterOuMettreAJourJid(chatId, "non");
          sendFormattedMessage(
            zk,
            chatId,
            "*The antilink has been successfully deactivated*",
            ms
          );
        } else {
          sendFormattedMessage(
            zk,
            chatId,
            "*antilink is not activated for this group*",
            ms
          );
        }
      } else if (arg.join("").split("/")[0] === "action") {
        let action = arg.join("").split("/")[1].toLowerCase();

        if (action === "remove" || action === "warn" || action === "delete") {
          await mettreAJourAction(chatId, action);
          sendFormattedMessage(
            zk,
            chatId,
            `*The anti-link action has been updated to ${action}*`,
            ms
          );
        } else {
          sendFormattedMessage(
            zk,
            chatId,
            "The only actions available are warn, remove, and delete*",
            ms
          );
        }
      } else {
        const helpText =
          "*antilink on to activate the anti-link feature*\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.";
        sendFormattedMessage(zk, chatId, helpText, ms);
      }
    } catch (error) {
      console.error(error);
      sendFormattedMessage(zk, chatId, error.message, ms);
    }
  }
);