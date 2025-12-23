

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
  nomCom: "ax",
  categorie: "Menu"
}, async (dest, zk, commandeOptions) => {
  try {
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

    let sections = [];
    for (const cat in coms) {
      let cmds = coms[cat].map(cmd => `*${s.PREFIXE} ${cmd}`).join('\n');
      sections.push({
        title: cat,
        rows: [
          {
            title: cat,
            description: cmds,
            rowId: "rowId",
          },
        ],
      });
    }

    const listMessage = {
      text: infoMsg,
      footer: "𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃",
      title: "Menu",
      buttonText: "Click Here",
      sections,
    };

    await zk.sendMessage(dest, listMessage, { quoted: ms });
  } catch (error) {
    console.error("Error sending menu:", error);
    repondre("Error sending menu: " + error);
  }
});


