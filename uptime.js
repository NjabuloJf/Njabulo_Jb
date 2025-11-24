const { fana } = require("../njabulo/fana");
const moment = require("moment-timezone");
const { getBuffer } = require("../njabulo/dl/Function");
const { default: axios } = require('axios');

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
            title: "⏰ᥕᥱᥣᥴomᥱ fᥲmιᥣყ",
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

// ── Uptime helper ─────────────────────────────────────────────
const runtime = function (seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

// ── Uptime command ─────────────────────────────────────────────
fana(
  {
    nomCom: "uptime",
    desc: "To check runtime",
    Categorie: "General",
    reaction: "🕜",
    fromMe: "true",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;

    try {
      const now = moment().tz("Africa/Garissa"); // Botswana is UTC+2
      const uptimeText = `
📅 Date : ${now.format("YYYY‑MM‑DD")}
📆 Day  : ${now.format("dddd")}
⏰ Time : ${now.format("HH:mm:ss")}
🟢 Alive : Yes
🌍 Country : Botswana
⏳ Uptime : ${runtime(process.uptime())}
`;

      sendFormattedMessage(zk, dest, uptimeText, ms);
    } catch (e) {
      console.log("❌ uptime Command Error: " + e);
      repondre("❌ Error: " + e);
    }
  }
);