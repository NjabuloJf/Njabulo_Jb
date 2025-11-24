const { fana } = require("../njabulo/fana");
const { attribuerUnevaleur } = require("../bdd/welcome");

// ── Button definition ─────────────────────────────────────────────
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

// ── Command builder for toggle‑type features ─────────────────────────────────
async function events(nomCom) {
  fana(
    {
      nomCom: nomCom,
      categorie: "Group",
    },
    async (dest, zk, commandeOptions) => {
      const { ms, arg, superUser, verifAdmin } = commandeOptions;

      if (verifAdmin || superUser) {
        if (!arg[0] || arg.join(" ") === " ") {
          await sendFormattedMessage(
            zk,
            dest,
            `${nomCom} on → activate | ${nomCom} off → deactivate`,
            ms
          );
        } else {
          if (arg[0] === "on" || arg[0] === "off") {
            await attribuerUnevaleur(dest, nomCom, arg[0]);
            await sendFormattedMessage(
              zk,
              dest,
              `${nomCom} is now set to ${arg[0]}`,
              ms
            );
          } else {
            await sendFormattedMessage(
              zk,
              dest,
              "Use *on* to enable or *off* to disable",
              ms
            );
          }
        }
      } else {
        await sendFormattedMessage(
          zk,
          dest,
          "You can’t use this command",
          ms
        );
      }
    }
  );
}

// Register the toggle commands
events("welcome");
events("goodbye");
events("antipromote");
events("antidemote");