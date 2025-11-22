const { fana } = require("../njabulo/fana");
const speed = require("performance-now");
const moment = require("moment-timezone");

// ---------- helpers ----------
function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getName(dest, opts) {
  return opts.pushName || opts.name || (dest.sender ? dest.sender.split("@")[0] : "Unknown");
}

// ---------- random image ----------
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ---------- config ----------
const botname = "Njabulo Jb";
const prefix  = ".";               // whatever prefix you use
const pict    = Buffer.from("");   // put a thumbnail buffer here if you want one

// ---------- main command ----------
fana(
  { nomCom: "ping5", desc: "Check bot response time", Categorie: "General", reaction: "⚡", fromMe: true },
  async (dest, zk, opts) => {
    const name = getName(dest, opts);
    moment.tz.setDefault("Africa/Botswana");
    const ping = Math.floor(Math.random() * 10000 + 1000); // single ping value
    const formatted = `${ping}ms`;

    // message text shown in the body
    const menuText = `🏓 *sᴛᴀᴛᴜs▰▰▰▰▰▱ᴘᴏɴɢ: ${formatted}*`;

    // button payload (limited‑time offer + bottom sheet)
    const buttonPayload = {
      limited_time_offer: {
        text: "Toxic-MD",
        url: "https://github.com/xhclintohn/Toxic-MD",
        copy_code: "TOXIC",
        expiration_time: Date.now() + 60 * 1000, // 1‑minute window
      },
      bottom_sheet: {
        in_thread_buttons_limit: 2,
        divider_indices: [1, 2],
        list_title: "Select Command",
        button_title: "Toxic-MD",
      },
    };

    // Build the interactive message
    const msg = generateWAMessageFromContent(
      dest,
      {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/...", // keep original URL or replace
              mimetype: "image/png",
              fileSha256: "+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=",
              fileLength: "1435",
              pageCount: 0,
              mediaKey: "MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=",
              fileName: "Toxic-MD",
              fileEncSha256: "ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=",
              directPath: "/v/t62.7119-24/...", // keep original path or replace
              mediaKeyTimestamp: "1756370084",
              jpegThumbnail: randomNjabulourl, // random thumbnail
            },
            hasMediaAttachment: true,
          },
          body: { text: menuText },
          footer: { text: `Pσɯҽɾҽԃ Ⴆყ ${botname}` },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "GitHub Repo",
                  url: "https://github.com/xhclintohn/Toxic-MD",
                  merchant_url: "https://github.com/xhclintohn/Toxic-MD",
                }),
              },
              {
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                  title: "𝐕𝐈𝐄𝐖☇ 𝐎𝐏𝐓𝐈𝐎𝐍𝐒 ☑",
                  sections: [
                    {
                      title: "⌜ 𝘾𝙤𝙧𝙚 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 ⌟",
                      highlight_label: "© 丨几匚",
                      rows: [
                        { title: "𝐅𝐮𝐥𝐥𝐌𝐞𝐧𝐮", description: "Display all commands", id: `fullmenu` },
                        { title: "𝐃𝐞𝐯", description: "send developer contact", id: `dev` },
                      ],
                    },
                    {
                      title: "ℹ 𝙄𝙣𝙛𝙤 𝘽𝙤𝙩",
                      highlight_label: "© 丨几匚",
                      rows: [
                        { title: "𝐏𝐢𝐧𝐠", description: "", id: `ping` },
                        { title: "𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬", description: "show bot settings", id: `settings` },
                      ],
                    },
                  ],
                }),
              },
            ],
            messageParamsJson: JSON.stringify(buttonPayload),
          },
          contextInfo: {
            externalAdReply: {
              title: botname,
              body: `Yo, ${name}! Ready to fuck shit up?`,
              mediaType: 1,
              thumbnail: randomNjabulourl, // random thumbnail here too
              mediaUrl: "",
              sourceUrl: "https://github.com/xhclintohn/Toxic-MD",
              showAdAttribution: false,
              renderLargerThumbnail: true,
            },
          },
        },
      },
      { quoted: dest }
    );

    await zk.relayMessage(dest, msg.message, { messageId: msg.key.id });
    console.log(`Ping (${formatted}) sent with full interactive payload`);
  }
);
