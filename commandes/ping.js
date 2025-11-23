const { fana } = require("../njabulo/fana");
const speed = require("performance-now");
const moment = require("moment-timezone");

// ── Image list ───────────────────────────────────────────────
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Helper ───────────────────────────────────────────────────
function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getName(dest, commandeOptions) {
  return (
    commandeOptions.pushName ||
    commandeOptions.name ||
    (dest.sender ? dest.sender.split('@')[0] : "Unknown User")
  );
}

// ── Command definition ───────────────────────────────────────
fana(
  {
    nomCom: 'ping',
    desc: 'To check bot response time',
    Categorie: 'General',
    reaction: '⚡',
    fromMe: true,
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);

    // Set Botswana time
    moment.tz.setDefault("Africa/Botswana");
    const temps = moment().format('hh:mm:ss A');
    const date = moment().format('DD/MM/YYYY');

    // Random ping (1–10 s)
    const ping = Math.floor(Math.random() * 10000 + 1000);
    const uptime = process.uptime();
    const uptimeFmt = `${(uptime / 60).toFixed(1)} min`;

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
    
const infoMsg = `
📅 Date : ${now.format("YYYY‑MM‑DD")}
📆 Day  : ${now.format("dddd")}
⏰ Time : ${now.format("HH:mm:ss")}
⌚ Status Pong : ${ping}ms
🟢 Alive : Yes
🌍 Country : Botswana 
⏳ Uptime : ${runtime(process.uptime())}
`;

    const buttons = [
      {
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
          display_text: "Copy Ping",
          id: `copy`,
          copy_code: `${ping}ms`
        })
      },
      {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "Visit Channel",
          id: `visit_website`,
          url: "https://example.com"
        })
      }
    ];

    await zk.sendMessage(dest, {
      interactiveMessage: {
        image: { url: randomNjabulourl },
        header: infoMsg,
        buttons: buttons,
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
    }, {
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
    });

    console.log("Ping results sent successfully!");
  }
); 
