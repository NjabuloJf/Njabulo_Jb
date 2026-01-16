
const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)

fana({ nomCom: "menuu", categorie: "General" }, async (dest, zk, commandeOptions) => {
  let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
  let { cm } = require(__dirname + "/../njabulo//fana");
  var coms = {};
  var mode = "ρᥙbᥣιᥴ";
  if ((s.MODE).toLocaleLowerCase() != "yes") {
    mode = "ρrιvᥲtᥱ";
  }
  cm.map(async (com, index) => {
    if (!coms[com.categorie]) coms[com.categorie] = [];
    coms[com.categorie].push(com.nomCom);
  });

  moment.tz.setDefault("Africa/Botswana");
  const temps = moment().format('HH:mm:ss');
  const date = moment().format('DD/MM/YYYY');

  // Generate greeting based on time of day
  const hour = moment().hour();
  let greeting = "Good Mornιng";
  if (hour >= 12 && hour < 18) {
    greeting = "Good ᥲftᥱrnnon!";
  } else if (hour >= 18) {
    greeting = "Good Evᥱrnιng!";
  } else if (hour >= 22 || hour < 5) {
    greeting = "Good Nιght";
  }

  let infoMsg = `╭───────────⊷
┊▢nᥲmᥱ : *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx : *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊___________________________
┊ ①◦➛ᥣιst mᥱnᥙ
┊ ②◦➛ᥲι mᥱnᥙ
┊ ③◦➛gᥱnᥱrᥲᥣ mᥱnᥙ
┊ ④◦➛doᥕnᥣoᥲd mᥱnᥙ
┊ ⑤◦➛ᥙsᥱ mᥱnᥙ
┊ ⑥◦➛mod mᥱnᥙ
┊ ⑦◦➛fᥙn mᥱnᥙ
┊ ⑧◦➛books mᥱnᥙ
┊ ⑨◦➛sᥱᥲᥴh mᥱnᥙ
┊ ⑩◦➛groᥙρ mᥱnᥙ
┊ ⑪◦➛ᥴontroᥣ mᥱnᥙ
┊___________________________
┊ʀᴇᴘʟʏ ʜɪ ᴡɪᴛʜ *ɴᴀᴍᴇ* ʟɪᴋᴇ *ᴀɪ-ᴍᴇɴᴜ*
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;





const baseButtons = [
  {
    name: 'single_select',
    buttonParamsJson: JSON.stringify({
      title: '𝐕𝐈𝐄𝐖☇ 𝐎𝐏𝐓𝐈𝐎𝐍𝐒 ☑',
      sections: [
        {
          title: '⌜ 𝘾𝙤𝙧𝙚 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 ⌟',
          highlight_label: '© 丨几匚',
          rows: [
            { title: '𝐏𝐢𝐧𝐠', description: 'Check bot response time', id: `ping` },
            { title: '𝐑𝐞𝐩𝐨', description: 'Get bot repository link', id: `repo` },
            { title: '𝐅𝐮𝐥𝐥𝐌𝐞𝐧𝐮', description: 'Display all commands', id: `fullmenu` },
            { title: '𝐃𝐞𝐯', description: "Send developer contact", id: `dev` },
          ],
        },
        {
          title: 'ℹ 𝙄𝙣𝙛𝙤 𝘽𝙤𝙩',
          highlight_label: '© 丨几匚',
          rows: [
            { title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬', description: 'Show bot settings', id: `.settings` },
            { title: '𝐒𝐮𝐩𝐩𝐨𝐫𝐭', description: 'Get support information', id: `.support` },
          ],
        },
        {
          title: '🌐 𝙎𝙤𝙘𝙞𝙖𝙡 𝙈𝙚𝙙𝙞𝙖',
          highlight_label: '© 丨几匚',
          rows: [
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: '📢 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡 𝘾𝙝𝙖𝙣𝙣𝙚𝙥',
                url: 'https://whatsapp.com/channel/0029Vb6mzVF7tkj42VNPrZ3V',
                merchant_url: 'https://whatsapp.com/channel/0029Vb6mzVF7tkj42VNPrZ3V',
              }),
            },
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: '📘 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 Support',
                url: 'https://facebook.com/FrediEzra',
                merchant_url: 'https://facebook.com/FrediEzra',
              }),
            },
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: '📷 𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢 Support',
                url: 'https://instagram.com/frediezra',
                merchant_url: 'https://instagram.com/frediezra',
              }),
            },
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: '🎵 𝙏𝙞𝙠𝙏𝙤𝙠 Support',
                url: 'https://tiktok.com/frediezra1',
                merchant_url: 'https://tiktok.com/frediezra1',
              }),
            },
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: '🐙 𝙂𝙞𝙩𝙃𝙪𝙗 𝙍𝙚𝙥𝙤',
                url: 'https://github.com/Fred1e/Fee-Xmd',
                merchant_url: 'https://github.com/Fred1e/Fee-Xmd',
              }),
            },
          ],
        },
      ]
    }),
  },
];

// List of image URLs
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];

// Select a random image file
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
const extraImages1 = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
  "https://files.catbox.moe/xjeyjh.jpg"
];
const extraImages2 = [
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/mh36c7.jpg"
];

// Randomly select which menu to show
const isOriginalMenu = Math.random() > 0.5; // 50% chance for either menu
let mediaUrl, thumbnail, renderType;
if (isOriginalMenu) {
  mediaUrl = mybotpic(); // Use bot’s original picture
  thumbnail = extraImages1[Math.floor(Math.random() * extraImages1.length)];
  renderType = "renderLargerThumbnail";
} else {
  mediaUrl = extraImages2[Math.floor(Math.random() * extraImages2.length)];
  thumbnail = mediaUrl; // Use the same image as media
  renderType = "renderSmallThumbnail";
}

try {
  const senderName = nomAuteurMessage || message.from; // Use correct variable for sender name
  await zk.sendMessage(dest, {
    interactiveMessage: {
      image: { url: randomNjabulourl },
      header: infoMsg,
      buttons: baseButtons,
      headerType: 1,
      footer: `Pσɯҽɾҽԃ Ⴆყ njᥲbᥙᥣo`,
      mentionedJid: [dest.sender || ""],
      contextInfo: {
        externalAdReply: {
          title: "njᥲbᥙᥣo jb",
          mediaType: 1,
          previewType: 0,
          thumbnailUrl: randomNjabulourl,
          renderLargerThumbnail: true,
        },
      },
    },
  }, { quoted: ms });
} catch (error) {
  console.error("Menu error: ", error);
  repondre("🥵🥵 Menu error: " + error);
}

// List of audio URLs
const audioUrls = [
  "https://files.catbox.moe/6x0rb7.mp3",
  "https://files.catbox.moe/uz4apw.mp3",
  "https://files.catbox.moe/cup6rc.mp3"
];

// Select a random audio file
const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];
try {
  await zk.sendMessage(dest, {
    audio: { url: randomAudioUrl },
    mimetype: 'audio/mpeg',
    ptt: true, // Send as a voice note
    contextInfo: {
      externalAdReply: {
        title: "njᥲbᥙᥣo jb",
        body: "🍁",
        mediaType: 1,
        thumbnailUrl: thumbnail,
        sourceUrl: "https://www.instagram.com/njabulojb871",
        showAdAttribution: false,
        [renderType]: true, // Apply correct thumbnail size
      }
    }
  }, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: "status@broadcast" }, message: { contactMessage: { displayName: "njᥲbᥙᥣo", vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD` } } } });
} catch (e) {
  console.log("🥵🥵 Error sending audio: " + e);
  repondre("🥵🥵 Error sending audio: " + e);
}
});
