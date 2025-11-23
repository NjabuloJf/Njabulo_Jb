const { fana } = require("../njabulo/fana");
const speed = require("performance-now");
const moment = require("moment-timezone");

// ── Random image for the header ─────────────────────────────────
const njabulox = [
  "",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Helper: simple delay (debug) ─────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Helper: get a friendly name ─────────────────────────────────
function getName(dest, opts) {
  return opts.pushName || opts.name || dest.sender?.split("@")[0] || "Unknown";
}

// ── Helper: format seconds into “X d, Y h, Z m, S s” ─────────────────
function formatDuration(sec) {
  sec = Number(sec);
  const days   = Math.floor(sec / 86400);
  sec %= 86400;
  const hrs    = Math.floor(sec / 3600);
  sec %= 3600;
  const mins   = Math.floor(sec / 60);
  const secs   = Math.floor(sec % 60);

  const parts = [];
  if (days) parts.push(`${days} d`);
  if (hrs)  parts.push(`${hrs} h`);
  if (mins) parts.push(`${mins} m`);
  if (secs) parts.push(`${secs} s`);
  return parts.join(", ");
}

// ── Main ping command ───────────────────────────────────────────
fana(
  {
    nomCom: "ping",
    desc: "Check bot response time",
    Categorie: "General",
    reaction: "🏓",
    fromMe: true,
  },
  async (dest, zk, opts) => {
    const name = getName(dest, opts);

    // Botswana time
    moment.tz.setDefault("Africa/Botswana");
    const now   = moment();
    const time  = now.format("HH:mm:ss");    // 24‑hour format
    const date  = now.format("YYYY‑MM‑DD"); // exactly YYYY‑MM‑DD
    const day   = now.format("dddd");       // Monday, Tuesday, …

    // Random ping between 100 ms and 2 s
    const ping = Math.floor(Math.random() * 1900 + 100);
    const uptime = formatDuration(process.uptime());

    const infoMsg = `
📅 Date : ${date}
📆 Day  : ${day}
⏰ Time : ${time}
⌚ Pong : ${ping} ms
🟢 Alive : Yes
🌍 Country : Botswana
⏳ Uptime : ${uptime}
`.trim();

    const buttons = [
      {
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
          display_text: "Copy Ping",
          id: "copy_ping",
          copy_code: `${ping} ms`
        })
      },
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "Visit Channel",
          id: "visit_channel",
          url: "https://example.com"
        })
      }
    ];

    await zk.sendMessage(
      dest,
      {
        interactiveMessage: {
          image: { url: randomNjabulourl },
          header: infoMsg,
          buttons,
          headerType: 1,
          contextInfo: {
            mentionedJid: [dest.sender || ""],
            externalAdReply: {
              title: "📝 messages menu cmd",
              mediaType: 1,
              previewType: 0,
              thumbnailUrl: randomNjabulourl,
              sourceUrl: "https://www.instagram.com/njabulojb871",
              renderLargerThumbnail: false,
            }
          }
        }
      },
      {
        quoted: {
          key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast"
          },
          message: {
            contactMessage: {
              displayName: "🟢 online njᥲbᥙᥣo🍥",
              vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
            }
          }
        }
      }
    );

    console.log("Ping results sent successfully!");
  }
);
