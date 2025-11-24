

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

// ---------- Buttons ----------
const buttons = [
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
      display_text: "Messaging online",
      id: "copy",
      copy_code: "greeting",
    }),
  },
];

// ---------- Random image ----------
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ---------- Helper to send the formatted message ----------
async function sendFormattedMessage(zk, chatId, text, ms) {
  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: randomNjabulourl },
        header: text,
        buttons: buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "📝messages menu cmd",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            sourceUrl: "https://www.instagram.com/njabulojb871",
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
            displayName: "🟢online njᥲbᥙᥣo🍥",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`,
          },
        },
      },
    }
  );
}

// ---------- Delete command ----------
fana(
  { nomCom: "del", categorie: "Group", reaction: "🗑️" },
  async (dest, zk, commandeOptions) => {
    const {
      ms,
      repondre,
      verifGroupe,
      auteurMsgRepondu,
      idBot,
      msgRepondu,
      verifAdmin,
      superUser,
    } = commandeOptions;

    if (!msgRepondu) {
      return await sendFormattedMessage(
        zk,
        dest,
        "*Please mention the message to delete.*",
        ms
      );
    }

    // Super user deleting a bot message
    if (superUser && auteurMsgRepondu === idBot) {
      const key = {
        remoteJid: dest,
        fromMe: true,
        id: ms.message.extendedTextMessage.contextInfo.stanzaId,
      };
      await zk.sendMessage(dest, { delete: key });
      await sendFormattedMessage(
        zk,
        dest,
        "*Message deleted successfully.*",
        ms
      );
    }

    // Group delete (admin or super user)
    if (verifGroupe) {
      if (verifAdmin || superUser) {
        try {
          const key = {
            remoteJid: dest,
            id: ms.message.extendedTextMessage.contextInfo.stanzaId,
            fromMe: false,
            participant: ms.message.extendedTextMessage.contextInfo.participant,
          };
          await zk.sendMessage(dest, { delete: key });
          await sendFormattedMessage(
            zk,
            dest,
            "*Message deleted successfully.*",
            ms
          );
        } catch (e) {
          await sendFormattedMessage(
            zk,
            dest,
            "*I need admin rights.*",
            ms
          );
        }
      } else {
        await sendFormattedMessage(
          zk,
          dest,
          "*Sorry, you are not an administrator of the group.*",
          ms
        );
      }
    }
  }
);
