
const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)

fana({ nomCom: "meee", categorie: "General" }, async (dest, zk, commandeOptions) => {
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
┊╰────────────────⊷
╰──────────────────⊷`;

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

  try {
    await zk.sendMessage(dest, {
      interactiveMessage: {
        header: {
          documentMessage: {
            url: randomNjabulourl,
            mimetype: 'image/jpeg',
            fileSha256: '',
            fileLength: '',
            pageCount: 0,
            mediaKey: '',
            fileName: 'FEE-XMD MENU',
            fileEncSha256: '',
            directPath: '',
            mediaKeyTimestamp: '',
            jpegThumbnail: '',
          },
          hasMediaAttachment: true,
        },
        body: { text: infoMsg },
        footer: { text: `Pσɯҽɾҽԃ Ⴆყ njabulo` },
        nativeFlowMessage: {
          buttons: [
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: '📢 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡 𝘾𝙝𝙖𝙣𝙣𝙚𝙡',
                url: 'https://whatsapp.com/channel/0029Vb6mzVF7tkj42VNPrZ3V',
                merchant_url: 'https://whatsapp.com/channel/0029Vb6mzVF7tkj42VNPrZ3V',
              }),
            },
            {
              name: 'single_select',
              buttonParamsJson: {
                title: '𝐕𝐈𝐄𝐖☇ 𝐎𝐏𝐓𝐈𝐎𝐍𝐒 ☑',
                sections: [
                  {
                    title: '⌜ 𝘾𝙤𝙧𝙚 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 ⌟',
                    highlight_label: '© 丨几匚',
                    rows: [
                      { title: '𝐏𝐢𝐧𝐠', description: 'Check bot response time', id: `ping` },
                      { title: '𝐑𝐞𝐩𝐨', description: 'Get bot repository link', id: `repo` },
                    ],
                  },
                  {
                    title: 'ℹ 𝙄𝙣𝙛𝙤 𝘽𝙤𝙩',
                    highlight_label: '© 丨几匚',
                    rows: [
                      { title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬', description: 'Show bot settings', id: `settings` },
                      { title: '𝐒𝐮𝐩𝐩𝐨𝐫𝐭', description: 'Get support information', id: `support` },
                    ],
                  },
                  {
                    title: '📜 𝘾𝙖𝙩𝙚𝙜𝙤𝙧𝙮 𝙈𝙚𝙣𝙪𝙨',
                    highlight_label: '© 丨几匚',
                    rows: [
                      { title: '𝐆𝐞𝐧𝐞𝐫𝐚𝐥𝐌𝐞𝐧𝐮', description: 'General commands', id: `generalmenu` },
                      { title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬𝐌𝐞𝐧𝐮', description: 'Bot settings commands', id: `settingsmenu` },
                      { title: '𝐁𝐮𝐬𝐢𝐧𝐞𝐬𝐬𝐌𝐞𝐧𝐮', description: 'Bot Currency exchange commands', id: `businessmenu` },
                    ],
                  },
                ],
              },
            },
          ],
          messageParamsJson: {
            limited_time_offer: {
              text: 'FEE-XMD',
              url: 'https://github.com/Fred1e/Fee-Xmd',
              copy_code: 'FREDI',
              expiration_time: moment().add(1, 'hour').valueOf(),
            },
            bottom_sheet: {
              in_thread_buttons_limit: 2,
              divider_indices: [1, 2],
              list_title: 'Select Command',
              button_title: 'FEE-XMD MENU',
            },
          },
        },
      },
      contextInfo: {
        externalAdReply: {
          title: `⏰ message menu`,
          mediaType: 1,
          previewType: 0,
          thumbnailUrl: randomNjabulourl,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: ms });
  } catch (error) {
    console.error("Menu error: ", error);
    repondre("🥵🥵 Menu error: " + error);
  }
});







fana({ nomCom: "maaa", categorie: "General" }, async (dest, zk, commandeOptions) => {
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
┊╰────────────────⊷
╰──────────────────⊷`;

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

  try {
    await zk.sendMessage(dest, {
      interactiveMessage: {
        header: {
          documentMessage: {
            url: randomNjabulourl,
            mimetype: 'image/jpeg',
            fileSha256: '',
            fileLength: '',
            pageCount: 0,
            mediaKey: '',
            fileName: 'FEE-XMD MENU',
            fileEncSha256: '',
            directPath: '',
            mediaKeyTimestamp: '',
            jpegThumbnail: '',
          },
          hasMediaAttachment: true,
        },
        text: infoMsg,
        footer: `Pσɯҽɾҽԃ Ⴆყ njabulo`,
        nativeFlowMessage: {
          buttons: [
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: '📢 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡 𝘾𝙝𝙖𝙣𝙣𝙚𝙡',
                url: 'https://whatsapp.com/channel/0029Vb6mzVF7tkj42VNPrZ3V',
                merchant_url: 'https://whatsapp.com/channel/0029Vb6mzVF7tkj42VNPrZ3V',
              }),
            },
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
                    ],
                  },
                  {
                    title: 'ℹ 𝙄𝙣𝙛𝙤 𝘽𝙤𝙩',
                    highlight_label: '© 丨几匚',
                    rows: [
                      { title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬', description: 'Show bot settings', id: `settings` },
                      { title: '𝐒𝐮𝐩𝐩𝐨𝐫𝐭', description: 'Get support information', id: `support` },
                    ],
                  },
                  {
                    title: '📜 𝘾𝙖𝙩𝙚𝙜𝙤𝙧𝙮 𝙈𝙚𝙣𝙪𝙨',
                    highlight_label: '© 丨几匚',
                    rows: [
                      { title: '𝐆𝐞𝐧𝐞𝐫𝐚𝐥𝐌𝐞𝐧𝐮', description: 'General commands', id: `generalmenu` },
                      { title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬𝐌𝐞𝐧𝐮', description: 'Bot settings commands', id: `settingsmenu` },
                      { title: '𝐬𝐢𝐧𝐞𝐬𝐬𝐌𝐞𝐧𝐮', description: 'Bot Currency exchange commands', id: `businessmenu` },
                    ],
                  },
                ],
              }),
            },
          ],
          messageParamsJson: JSON.stringify({
            limited_time_offer: {
              text: 'FEE-XMD',
              url: 'https://github.com/Fred1e/Fee-Xmd',
              copy_code: 'FREDI',
              expiration_time: moment().add(1, 'hour').valueOf(),
            },
            bottom_sheet: {
              in_thread_buttons_limit: 2,
              divider_indices: [1, 2],
              list_title: 'Select Command',
              button_title: 'FEE-XMD MENU',
            },
          }),
        },
      },
      contextInfo: {
        externalAdReply: {
          title: `⏰ message menu`,
          mediaType: 1,
          previewType: 0,
          thumbnailUrl: randomNjabulourl,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: ms });
  } catch (error) {
    console.error("Menu error: ", error);
    repondre("🥵🥵 Menu error: " + error);
  }
});
