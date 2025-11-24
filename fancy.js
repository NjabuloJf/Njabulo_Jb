const { fana } = require("../njabulo/fana");
const fancy = require("../njabulo/style");

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // (empty string kept as in original)
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Helper that builds the button list for a given copy‑text ─────
function buildButtons(copyText) {
  return [
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
        copy_code: copyText,          // <-- the text to copy
      }),
    },
  ];
}

// ── Helper that sends an interactive message with image + buttons ─────
async function sendFormattedMessage(zk, chatId, text, ms) {
  const buttons = buildButtons(text);   // create buttons that copy the same text

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
            title: "🖋️message front text",
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

// ── Command: .fancy ─────────────────────────────────────────────
fana(
  {
    nomCom: "fancy",
    categorie: "Fun",
    reaction: "✍️",
  },
  async (dest, zk, commandeOptions) => {
    const { arg, repondre, prefixe, ms } = commandeOptions;
    const id = arg[0]?.match(/\d+/)?.join("");
    const text = arg.slice(1).join(" ");

    try {
      if (!id || !text) {
        const helpText =
          `\nExemple : ${prefixe}fancy 10 Njabulo Jb\n` +
          String.fromCharCode(8206).repeat(4001) +
          fancy.list("Njabulo Jb 2025", fancy);
        return await sendFormattedMessage(zk, dest, helpText, ms);
      }

      const selectedStyle = fancy[parseInt(id) - 1];
      if (selectedStyle) {
        const styled = fancy.apply(selectedStyle, text);
        return await sendFormattedMessage(zk, dest, styled, ms);
      } else {
        return await sendFormattedMessage(
          zk,
          dest,
          "_Style introuvable :(_",
          ms
        );
      }
    } catch (error) {
      console.error(error);
      return await sendFormattedMessage(
        zk,
        dest,
        "_Une erreur s'est produite :(_",
        ms
      );
    }
  }
);