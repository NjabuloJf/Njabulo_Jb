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
            title: "🤥message group hidetag",
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

// ── Hidetag command ─────────────────────────────────────────────
fana(
  {
    nomCom: "hidetag",
    categorie: "Group",
    reaction: "🎤",
  },
  async (dest, zk, commandeOptions) => {
    const {
      repondre,
      msgRepondu,
      verifGroupe,
      arg,
      verifAdmin,
      superUser,
      ms,
    } = commandeOptions;

    if (!verifGroupe) {
      return sendFormattedMessage(
        zk,
        dest,
        "This command is only allowed in groups.",
        ms
      );
    }

    if (!(verifAdmin || superUser)) {
      return sendFormattedMessage(
        zk,
        dest,
        "Command reserved for administrators.",
        ms
      );
    }

    const metadata = await zk.groupMetadata(dest);
    const tag = metadata.participants.map((i) => i.id);

    if (msgRepondu) {
      let msg;

      if (msgRepondu.imageMessage) {
        const media = await zk.downloadAndSaveMediaMessage(
          msgRepondu.imageMessage
        );
        msg = {
          image: { url: media },
          caption: msgRepondu.imageMessage.caption,
          mentions: tag,
        };
      } else if (msgRepondu.videoMessage) {
        const media = await zk.downloadAndSaveMediaMessage(
          msgRepondu.videoMessage
        );
        msg = {
          video: { url: media },
          caption: msgRepondu.videoMessage.caption,
          mentions: tag,
        };
      } else if (msgRepondu.audioMessage) {
        const media = await zk.downloadAndSaveMediaMessage(
          msgRepondu.audioMessage
        );
        msg = {
          audio: { url: media },
          mimetype: "audio/mp4",
          mentions: tag,
        };
      } else if (msgRepondu.stickerMessage) {
        const media = await zk.downloadAndSaveMediaMessage(
          msgRepondu.stickerMessage
        );
        const stickerMess = new Sticker(media, {
          pack: "Bmw-mdtag",
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
        msg = { sticker: stickerBuffer2, mentions: tag };
      } else {
        msg = { text: msgRepondu.conversation, mentions: tag };
      }

      await zk.sendMessage(dest, msg);
    } else {
      if (!arg[0]) {
        return sendFormattedMessage(
          zk,
          dest,
          "Enter the text to announce or mention the message to announce",
          ms
        );
      }
      await zk.sendMessage(dest, {
        text: arg.join(" "),
        mentions: tag,
      });
      sendFormattedMessage(zk, dest, arg.join(" "), ms);
    }
  }
);