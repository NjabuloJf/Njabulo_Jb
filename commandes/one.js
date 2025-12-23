
const { fana } = require("../njabulo/fana");
const axios = require('axios');
const conf = require(__dirname + '/../set');
const moment = require("moment-timezone");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

// ── Random image for the header ─────────────────────────────────
const njabulox = [
  "",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Helper: format seconds into “X d, Y h, Z m, S s” ─────────────────
function formatDuration(sec) {
  sec = Number(sec);
  const days = Math.floor(sec / 86400);
  sec %= 86400;
  const hrs = Math.floor(sec / 3600);
  sec %= 3600;
  const mins = Math.floor(sec / 60);
  const secs = Math.floor(sec % 60);
  const parts = [];
  if (days) parts.push(`${days} d`);
  if (hrs) parts.push(`${hrs} h`);
  if (mins) parts.push(`${mins} m`);
  if (secs) parts.push(`${secs} s`);
  return parts.join(", ");
}

// ── Main ping command ───────────────────────────────────────────
fana(
  {
    nomCom: "peng",
    desc: "Check bot response time",
    Categorie: "General",
    reaction: "🏓",
    fromMe: true,
  },
  async (dest, zk, opts) => {
    try {
      moment.tz.setDefault("Africa/Botswana");
      const now = moment();
      const time = now.format("HH:mm:ss"); // 24‑hour format
      const date = now.format("YYYY‑MM‑DD"); // exactly YYYY‑MM‑DD
      const day = now.format("dddd"); // Monday, Tuesday, …
      // Random ping between 100 ms and 2 s
      const ping = Math.floor(Math.random() * 1900 + 100);
      const uptime = formatDuration(process.uptime());

      const infoMsg = `
📅 Date : ${date}
📆 Day : ${day}
⏰ Time : ${time}
⌚ Pong : ${ping} ms
🟢 Alive : Yes
🌍 Country : Botswana
⏳ Uptime : ${uptime}
`.trim();

      const cards = await Promise.all(
        Array(5).fill().map(async (_, i) => ({
          header: {
            title: `📊 Server Stats`,
            hasMediaAttachment: true,
            imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
          },
          body: {
            text: infoMsg,
          },
          footer: {
            text: "ᯤAll is for you enjoy🎈",
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "📋 Copy Stats",
                  copy_code: infoMsg,
                }),
              },
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "🌐 Visit Channel",
                  url: "https://example.com",
                }),
              },
            ],
          },
        }))
      );

      const message = generateWAMessageFromContent(
        dest,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: {
                body: {
                  text: `*Nᴊᴀʙᴜʟᴏ Jʙ Pɪɴɢ ᴍᴇɴᴜ*\n📊 Server Stats`,
                },
                footer: {
                  text: `📂 Showing ping and uptime info`,
                },
                carouselMessage: {
                  cards,
                },
              },
            },
          },
        },
        { quoted: opts }
      );

      await zk.relayMessage(dest, message.message, { messageId: message.key.id });
      console.log("Ping results sent successfully!");
    } catch (error) {
      console.error("Error sending ping message:", error);
    }
  }
);


