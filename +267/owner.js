const { fana } = require("../njabulo/fana");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");
const moment = require("moment-timezone");

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // keep the empty entry if you want a chance of no image
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
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
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy",
    id: "copy",
    copy_code: text,
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
            title: "❣️ Owner Info",
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

// ── Owner command ─────────────────────────────────────────────
fana(
  {
    nomCom: "owner",
    categorie: "General",
    reaction: "❣️",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    // 1️⃣ Show a loading indicator
    await zk.sendMessage(dest, { text: "⏳ loading…" });

    // 2️⃣ Build the info text (same template you provided)
    const now = moment().tz("Africa/Garissa"); // Botswana is UTC+2
    const infoText = `
📛 Name      : ${conf.BOT_NAME || "Njabulo Jb"}
🤖 Bot name  : ${conf.BOT_NAME || "Njabulo Jb"}
🛠️ Used      : 0 times (placeholder)
🗓️ Create    : 2024‑01‑01 (placeholder)
👤 Owner     : @${conf.NUMERO_OWNER}
⏰ Data time : ${now.format("YYYY‑MM‑DD HH:mm:ss")}
`;

    const thsudo = await isSudoTableNotEmpty();

    if (thsudo) {
      let msg = `*My Super-User*\n*Owner Number*\n:- 🌟 @${conf.NUMERO_OWNER}\n\n------ *other sudos* -----\n`;

      const sudos = await getAllSudoNumbers();

      for (const sudo of sudos) {
        if (sudo) {
          const sudonumero = sudo.replace(/[^0-9]/g, "");
          msg += `- 💼 @${sudonumero}\n`;
        }
      }

      const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      const mentionedJid = [...sudos, ownerjid];

      // Send the image with the caption and buttons
      await zk.sendMessage(dest, {
        interactiveMessage: {
          image: { url: mybotpic() },
          header: msg,
          buttons: baseButtons,
          headerType: 1,
          contextInfo: {
            mentionedJid,
            externalAdReply: {
              title: "❣️ Owner Info",
              mediaType: 1,
              previewType: 0,
              thumbnailUrl: randomNjabulourl,
              renderLargerThumbnail: false,
            },
          },
        },
      });
    } else {
      const vcard =
        "BEGIN:VCARD\n" +
        "VERSION:3.0\n" +
        "FN:" + conf.OWNER_NAME + "\n" +
        "ORG:undefined;\n" +
        "TEL;type=CELL;type=VOICE;waid=" + conf.NUMERO_OWNER + ":+" + conf.NUMERO_OWNER + "\n" +
        "END:VCARD";

      await zk.sendMessage(
        dest,
        {
          contacts: {
            displayName: conf.OWNER_NAME,
            contacts: [{ vcard }],
          },
        },
        { quoted: ms }
      );

      // Send the audio as a voice note
      const audioUrl = "https://files.catbox.moe/4ufunx.mp3";
      await zk.sendMessage(
        dest,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mp4",
          ptt: true,
        },
        { quoted: ms }
      );
    }

    // 3️⃣ Finally, send the info text with buttons
    sendFormattedMessage(zk, dest, infoText, ms);
  }
);