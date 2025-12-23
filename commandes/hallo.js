

const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

const menu = {
  "search menu": {
    "① .lyrics": "",
    "② .stickersearch": "",
    "③ .yts": "",
    "④ .play": "",
    "⑤ .video": "",
    "⑥ .image": "",
    "⑥ .img": "",
    "⑧ .fb": ""
  },
  "general menu": {
    "① .getpp": "",
    "② .repo": "",
    "③ .menu": "",
    "④ .mena": "",
    "⑤ .obt": "",
    "⑥ .owner": "",
    "⑥ .pi": "",
    "⑧ .ping": "",
    "⑨ .shazam": "",
    "⑩ .uptime": "",
    "⑪ .url": ""
  },
  "chat menu": {
    "① .pair": "",
    "② .njabulo": "",
    "③ .gpt": "",
    "④ .gemini": "",
    "⑤ .ilama": ""
  },
  "heroku client menu": {
    "① .pm-permit": "",
    "② .autolikestatus": "",
    "③ .alwaysonline": "",
    "④ .autorecord": "",
    "⑤ .autotyping": "",
    "⑥ .privatemode": "",
    "⑥ .publicmode": ""
  }
};

fana({
  nomCom: "hallo",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  try {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    moment.tz.setDefault('Africa/Gaborone');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    let infoMsg = ` 
╭━━✧𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃✧━━❖
┊✺┌────••••────⊷
┃✇│◎ 𝙼𝚘𝚍𝚎 : public
┃✇│◎ 𝚁𝚊𝚖 : 8/132 GB
┃✇│◎ 𝙳𝚊𝚝𝚎 : ${date}
┃✇│◎ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : 𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃
┊ └────••••────⊷
╰━━━••✧𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃✧••━━━◆ 
\n`;
    const cards = [];
    for (let cat in menu) {
      let catMsg = "";
      for (let cmd in menu[cat]) {
        catMsg += `${cmd}\n`;
      }
      cards.push({
        header: {
          title: cat,
          hasMediaAttachment: false,
        },
        body: {
          text: catMsg,
        },
        footer: {
          text: "𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "Visit Website",
                url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy",
                copy_code: "Hello, World!",
              }),
            },
          ],
        },
      });
    }
    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: {
              header: { text: infoMsg },
              footer: { text: `📂 Found ${Object.keys(menu).reduce((acc, cat) => acc + Object.keys(menu[cat]).length, 0)} commands` },
              carouselMessage: { cards },
            },
          },
        },
      },
      { quoted: ms }
    );
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (error) {
    console.error("Error:", error);
    repondre("Error: " + error);
  }
});


