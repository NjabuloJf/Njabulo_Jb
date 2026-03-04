const { fana } = require("../njabulo/fana");
const config = require("../set");

// ── Button definition (used for both help‑msg and the new pic‑msg) ─────
const buttons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "View Channel",
      id: "backup channel",
      url: config.GURL
    }),
  },
];

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Helper that sends an interactive message (image + buttons) ─────
async function sendFormattedMessage(zk, chatId, text, ms) {
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

// ── Command: .getpp ─────────────────────────────────────────────
fana(
  {
    nomCom: "getpp",
    categorie: "General",
    reaction: "📷",
  },
  async (chatId, zk, commandeOptions) => {
    const {
      ms,
      repondre,
      msgRepondu,
      auteurMsgRepondu,
      mybotpic,
      nomAuteurMessage,
    } = commandeOptions;

    if (!msgRepondu) {
      return sendFormattedMessage(
        zk,
        chatId,
        `Yo ${nomAuteurMessage}, reply to someone’s message to snag their profile pic! 😡 Don’t make Njabulo Jb do extra work! 🤔`,
        ms
      );
    }

    try {
      await sendFormattedMessage(
        zk,
        chatId,
        `Yo ${nomAuteurMessage}, Njabulo Jb’s hunting for @${auteurMsgRepondu.split("@")[0]}’s profile pic! 📸 Hold tight! 🔍`,
        ms
      );

      let ppuser;
      try {
        ppuser = await zk.profilePictureUrl(auteurMsgRepondu, "image");
      } catch {
        ppuser = mybotpic();
        await sendFormattedMessage(
          zk,
          chatId,
          `Yo ${nomAuteurMessage}, @${auteurMsgRepondu.split("@")[0]}’s profile pic is locked tight! 😣 Njabulo Jb’s got you my pic instead! 😎`,
          ms
        );
      }

      // ── Send the picture WITH a button ─────────────────────────────────
      await zk.sendMessage(
        chatId,
        {
          interactiveMessage: {
            image: { url: ppuser },
            header: `BOOM, ${nomAuteurMessage}! Snagged @${auteurMsgRepondu.split("@")[0]}’s profile pic! 🔥`,
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
    
    } catch (error) {
      console.error("Error in .getpp command:", error);
      await sendFormattedMessage(
        zk,
        chatId,
        `TOTAL BUST, ${nomAuteurMessage}! Njabulo Jb crashed while grabbing the pic: ${error.message} 😡 Try again or flop! 😣`,
        ms
      );
    }
  }
);


fana(
  {
    nomCom: "profile",
    categorie: "General",
    reaction: "📷",
  },
  async (chatId, zk, commandeOptions) => {
    const {
      ms,
      repondre,
      msgRepondu,
      auteurMsgRepondu,
      mybotpic,
      nomAuteurMessage,
    } = commandeOptions;

    if (!msgRepondu) {
      return sendFormattedMessage(
        zk,
        chatId,
        `Yo ${nomAuteurMessage}, reply to someone’s message to snag their profile pic! 😡 Don’t make Njabulo Jb do extra work! 🤔`,
        ms
      );
    }

    try {
      await sendFormattedMessage(
        zk,
        chatId,
        `Yo ${nomAuteurMessage}, Njabulo Jb’s hunting for @${auteurMsgRepondu.split("@")[0]}’s profile pic! 📸 Hold tight! 🔍`,
        ms
      );

      let ppuser;
      try {
        ppuser = await zk.profilePictureUrl(auteurMsgRepondu, "image");
      } catch {
        ppuser = mybotpic();
        await sendFormattedMessage(
          zk,
          chatId,
          `Yo ${nomAuteurMessage}, @${auteurMsgRepondu.split("@")[0]}’s profile pic is locked tight! 😣 Njabulo Jb’s got you my pic instead! 😎`,
          ms
        );
      }

      // ── Send the picture WITH a button ─────────────────────────────────
      await zk.sendMessage(
        chatId,
        {
          interactiveMessage: {
            image: { url: ppuser },
            header: `BOOM, ${nomAuteurMessage}! Snagged @${auteurMsgRepondu.split("@")[0]}’s profile pic! 🔥`,
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
    
    } catch (error) {
      console.error("Error in .getpp command:", error);
      await sendFormattedMessage(
        zk,
        chatId,
        `TOTAL BUST, ${nomAuteurMessage}! Njabulo Jb crashed while grabbing the pic: ${error.message} 😡 Try again or flop! 😣`,
        ms
      );
    }
  }
);





