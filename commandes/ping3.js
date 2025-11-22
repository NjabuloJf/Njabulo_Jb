// ---------- imports ----------
const { fana } = require("../njabulo/fana");
const moment = require("moment-timezone");
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");

// ---------- image pool ----------
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];

// pick a random URL each time the function is called
function randomNjabulourl() {
  return njabulox[Math.floor(Math.random() * njabulox.length)];
}

// ---------- ping command ----------
fana(
  {
    nomCom: 'ping3',
    desc: 'Check bot response time',
    Categorie: 'General',
    reaction: '⚡',
    fromMe: true,
  },
  async (dest, zk) => {
    // basic info
    const name = dest.sender ? dest.sender.split('@')[0] : "User";
    moment.tz.setDefault("Africa/Botswana");
    const ping = Math.floor(Math.random() * 10000 + 1000);
    const menuText = `🏓 *sᴛᴀᴛᴜs▰▰▰▰▰▱ᴘᴏɴɢ: ${ping}ms*`;

    // build interactive message
    const msg = generateWAMessageFromContent(
      dest,
      {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: randomNjabulourl(),          // random full‑size image
              mimetype: 'image/png',
              fileSha256: '+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=',
              fileLength: '1435',
              pageCount: 0,
              mediaKey: 'MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=',
              fileName: 'Toxic-MD',
              fileEncSha256: 'ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=',
              directPath: '/v/t62.7119-24/...',
              mediaKeyTimestamp: '1756370084',
              jpegThumbnail: randomNjabulourl(), // random thumbnail too
            },
            hasMediaAttachment: true,
          },
          body: { text: menuText },
          footer: { text: 'Powered by Bot' },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: 'GitHub Repo',
                  url: 'https://github.com/xhclintohn/Toxic-MD',
                }),
              },
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: '𝐕𝐈𝐄𝐖☇ 𝐎𝐏𝐓𝐈𝐎𝐍𝐒 ☑',
                  sections: [
                    {
                      title: '⌜ 𝘾𝙤𝙧𝙚 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 ⌟',
                      rows: [
                        { title: 'FullMenu', id: '.fullmenu' },
                        { title: 'Dev', id: '.dev' },
                      ],
                    },
                    {
                      title: 'ℹ 𝙄𝙣𝙛𝙤 𝘽𝙤𝙩',
                      rows: [
                        { title: 'Ping', id: '.ping' },
                        { title: 'Settings', id: '.settings' },
                      ],
                    },
                  ],
                }),
              },
            ],
            messageParamsJson: JSON.stringify({
              limited_time_offer: {
                text: 'Toxic-MD',
                url: 'https://github.com/xhclintohn/Toxic-MD',
                copy_code: 'TOXIC',
                expiration_time: Date.now() * 1000,
              },
              bottom_sheet: { in_thread_buttons_limit: 2, divider_indices: [1, 2] },
            }),
          },
          contextInfo: {
            externalAdReply: {
              title: 'Bot',
              body: `Yo, ${name}! Ready to go?`,
              mediaType: 1,
              thumbnail: '', // optional separate thumbnail if you want one
              sourceUrl: 'https://github.com/xhclintohn/Toxic-MD',
            },
          },
        },
      },
      { quoted: dest }
    );

    // send it
    await zk.sendMessage(dest, msg, { quoted: dest });
    console.log('Ping interactive message sent');
  }
);
