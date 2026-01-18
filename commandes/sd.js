
const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg" // New image added
];

fana({ nomCom: "me", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
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
  let infoMsg = ` ╭━━✧𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃✧━━❖ 
 ┊✺┌────••••────⊷ 
 ┃✇│◎ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME} 
 ┃✇│◎ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ] 
 ┃✇│◎ 𝙼𝚘𝚍𝚎 : ${mode} 
 ┃✇│◎ 𝚁𝚊𝚖 : 8/132 GB 
 ┃✇│◎ 𝙳𝚊𝚝𝚎 : ${date} 
 ┃✇│◎ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()} 
 ┃✇│◎ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : 𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃 
 ┃✇│◎ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length} 
 ┃✇│ 𝚃𝚑𝚎𝚖𝚎 : matele 
 ┊ └────••••────⊷ 
 ╰━━━••✧𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃✧••━━━◆ 
\n`;
  let menuMsg = `𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃`;
  for (const cat in coms) {
    menuMsg += ` ╭━━━❂ *${cat}* ❂⁠⁠⁠⁠━━─•• 
 ║╭━━══••══━━••⊷ `;
    for (const cmd of coms[cat]) {
      menuMsg += ` 
 ║┊◆ ${s.PREFIXE} *${cmd}*`;
    }
    menuMsg += ` 
 ║╰━━══••══━━••⊷ 
 ╰════────════◆◆◆`;
  }
  menuMsg += ` > 𝚳𝚫𝚻𝚵𝐋𝚵𝚵-𝚻𝚳𝐃\n`;
  const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
  try {
    await zk.sendMessage(dest, {
      image: { url: randomNjabulourl },
      caption: infoMsg + menuMsg,
      contextInfo: {
        mentionedJid: [ms?.sender?.jid || ""],
        externalAdReply: {
          title: "🖋️message front text",
          mediaType: 1,
          previewType: 0,
          thumbnailUrl: randomNjabulourl,
          renderLargerThumbnail: false,
        },
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363399999197102@newsletter",
          newsletterName: "╭••➤®Njabulo Jb",
          serverMessageId: 143,
        },
        forwardingScore: 999,
      },
    }, { quoted: ms });
  } catch (error) {
    console.error("Menu error: ", error);
    repondre("🥵🥵 Menu error: " + error);
  }
});

