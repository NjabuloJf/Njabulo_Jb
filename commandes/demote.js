const { fana } = require("../njabulo/fana")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../bdd/antilien")
const {atbajouterOuMettreAJourJid,atbverifierEtatJid} = require("../bdd/antibot")
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // keep the empty entry if you want a chance of no image
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Standard button set (used by all modules) ────────────────────────
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
            title: "👥message group demote & promote",
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

// ── Promote command ─────────────────────────────────────────────
fana(
  {
    nomCom: "promote",
    categorie: "Group",
    reaction: "🫂",
  },
  async (dest, zk, commandeOptions) => {
    let {
      repondre,
      msgRepondu,
      infosGroupe,
      auteurMsgRepondu,
      verifGroupe,
      auteurMessage,
      superUser,
      idBot,
      ms,
    } = commandeOptions;

    if (!verifGroupe) {
      return sendFormattedMessage(zk, dest, "fσr grσups σnlч", ms);
    }

    const membresGroupe = verifGroupe ? await infosGroupe.participants : [];
    const verifMember = (user) => membresGroupe.some((m) => m.id === user);
    const memberAdmin = (membresGroupe) =>
      membresGroupe.filter((m) => m.admin !== null).map((m) => m.id);
    const admins = verifGroupe ? memberAdmin(membresGroupe) : [];
    const autAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
    const zkad = verifGroupe ? admins.includes(idBot) : false;

    try {
      if (!(autAdmin || superUser)) {
        return sendFormattedMessage(
          zk,
          dest,
          "Sorry I cannot perform this action because you are not an administrator of the group.",
          ms
        );
      }

      if (!msgRepondu) {
        return sendFormattedMessage(
          zk,
          dest,
          "please tag the member to be nominated",
          ms
        );
      }

      if (!zkad) {
        return sendFormattedMessage(
          zk,
          dest,
          "Sorry, I cannot perform this action because I am not an administrator of the group.",
          ms
        );
      }

      if (!verifMember(auteurMsgRepondu)) {
        return sendFormattedMessage(
          zk,
          dest,
          "thís usєr ís nσt pαrt σf thє grσup.",
          ms
        );
      }

      if (admins.includes(auteurMsgRepondu)) {
        return sendFormattedMessage(
          zk,
          dest,
          "This member is already an administrator of the group.",
          ms
        );
      }

      const txt = `🎊🎊🎊  @${auteurMsgRepondu.split("@")[0]} rose in rank.\nhe/she has been named group administrator.`;

      await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
      await zk.sendMessage(dest, {
        text: txt,
        mentions: [auteurMsgRepondu],
      });
    } catch (e) {
      sendFormattedMessage(zk, dest, "oups " + e, ms);
    }
  }
);

// ── Demote command ─────────────────────────────────────────────
fana(
  {
    nomCom: "demote",
    categorie: "Group",
    reaction: "😨",
  },
  async (dest, zk, commandeOptions) => {
    let {
      repondre,
      msgRepondu,
      infosGroupe,
      auteurMsgRepondu,
      verifGroupe,
      auteurMessage,
      superUser,
      idBot,
      ms,
    } = commandeOptions;

    if (!verifGroupe) {
      return sendFormattedMessage(zk, dest, "fσr grσups σnlч", ms);
    }

    const membresGroupe = verifGroupe ? await infosGroupe.participants : [];
    const verifMember = (user) => membresGroupe.some((m) => m.id === user);
    const memberAdmin = (membresGroupe) =>
      membresGroupe.filter((m) => m.admin !== null).map((m) => m.id);
    const admins = verifGroupe ? memberAdmin(membresGroupe) : [];
    const autAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
    const zkad = verifGroupe ? admins.includes(idBot) : false;

    try {
      if (!(autAdmin || superUser)) {
        return sendFormattedMessage(
          zk,
          dest,
          "Sorry I cannot perform this action because you are not an administrator of the group.",
          ms
        );
      }

      if (!msgRepondu) {
        return sendFormattedMessage(
          zk,
          dest,
          "please tag the member to be removed",
          ms
        );
      }

      if (!zkad) {
        return sendFormattedMessage(
          zk,
          dest,
          "sσrrч αm nσt αn αdmínístrαtσr σf thє grσup.",
          ms
        );
      }

      if (!verifMember(auteurMsgRepondu)) {
        return sendFormattedMessage(
          zk,
          dest,
          "thís usєr ís nσt pαrt σf thє grσup.",
          ms
        );
      }

      if (!admins.includes(auteurMsgRepondu)) {
        return sendFormattedMessage(
          zk,
          dest,
          "This member is not a group administrator.",
          ms
        );
      }

      const txt = `@${auteurMsgRepondu.split("@")[0]} was removed from his position as a group administrator\n`;

      await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "demote");
      await zk.sendMessage(dest, {
        text: txt,
        mentions: [auteurMsgRepondu],
      });
    } catch (e) {
      sendFormattedMessage(zk, dest, "oups " + e, ms);
    }
  }
);