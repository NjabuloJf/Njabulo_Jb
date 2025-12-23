

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

fana({
  nomCom: "laya",
  categorie: "Menu"
}, async (dest, zk, commandeOptions) => {
  let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
  let { cm } = require(__dirname + "/../njabulo/fana");
  let coms = {};
  let mode = "public";
  if ((s.MODE).toLowerCase() !== "yes") {
    mode = "private";
  }
  cm.map((com) => {
    if (!coms[com.categorie]) {
      coms[com.categorie] = [];
    }
    coms[com.categorie].push(com.nomCom);
  });
  moment.tz.setDefault('Etc/GMT');
  const temps = moment().format('HH:mm:ss');
  const date = moment().format('DD/MM/YYYY');
  let infoMsg = `╭━━✧𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃✧━━❖\n`;
  infoMsg += `┃✇│◎ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME}\n`;
  infoMsg += `┃✇│◎ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ]\n`;
  infoMsg += `┃✇│◎ 𝙼𝚘𝚍𝚎 : ${mode}\n`;
  infoMsg += `┃✇│◎ 𝚁𝚊𝚖 : 8/132 GB\n`;
  infoMsg += `┃✇│◎ 𝙳𝚊𝚝𝚎 : ${date}\n`;
  infoMsg += `┃✇│◎ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}\n`;
  infoMsg += `┃✇│◎ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : 𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃\n`;
  infoMsg += `┃✇│◎ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length}\n`;
  infoMsg += `┃✇│ 𝚃𝚑𝚎𝚖𝚎 : matele\n`;
  infoMsg += `╰━━━••✧𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃✧••━━━◆\n`;
  const cards = await Promise.all(Object.keys(coms).map(async (cat, i) => {
    let catMsg = ``;
    coms[cat].forEach((cmd) => {
      catMsg += `*${s.PREFIXE} ${cmd}\n`;
    });
    return {
      header: {
        title: `📸 ${cat}`,
        hasMediaAttachment: false,
      },
      body: {
        text: catMsg,
      },
      footer: {
        text: "𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃",
      },
    };
  }));
  try {
    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: {
              header: { text: infoMsg },
              footer: { text: `📂 Found ${cm.length} commands` },
              carouselMessage: { cards },
            },
          },
        },
      },
      { quoted: ms }
    );
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (error) {
    console.error("Error sending menu:", error);
    repondre("Error sending menu: " + error);
  }
});
