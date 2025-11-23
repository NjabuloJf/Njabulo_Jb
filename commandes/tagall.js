const { fana } = require("../njabulo/fana");
// const { getGroupe } = require("../bdd/groupe")
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
  "",
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
            title: "🥲message group tagall pet",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363399999197102@newsletter",
            newsletterName: "╭••➤®Njabulo Jb",
            serverMessageId: 143,
          },
          forwardingScore: 999,
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

// ── Tag‑all command ─────────────────────────────────────────────
fana(
  { nomCom: "tagall", categorie: "Group", reaction: "🚨" },
  async (dest, zk, commandeOptions) => {
    const {
      ms,
      repondre,
      arg,
      verifGroupe,
      nomGroupe,
      infosGroupe,
      nomAuteurMessage,
      verifAdmin,
      superUser,
    } = commandeOptions;

    if (!verifGroupe) {
      return await sendFormattedMessage(
        zk,
        dest,
        "thís cσmmαnd ís rєsєrvєd fσr grσups",
        ms
      );
    }

    let mess = arg.join(" ") || "Aucun Message";
    let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
    let tag = `*Group* : *${nomGroupe}* \n*Message* : *${mess}*\n\n`;
    let emoji = ["> ᴅᴇᴀʀ😡"];
    let random = Math.floor(Math.random() * emoji.length);

    for (const membre of membresGroupe) {
      tag += `${emoji[random]} @${membre.id.split("@")[0]}\n`;
    }

    if (verifAdmin || superUser) {
      // Use the helper that includes the buttons
      await sendFormattedMessage(zk, dest, tag, ms);
    } else {
      await sendFormattedMessage(zk, dest, "command reserved for admins", ms);
    }
  }
);