
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { fana } = require("../njabulo/fana");
const traduire = require("../njabulo/traduction");
const { downloadMediaMessage, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const axios = require('axios');
const FormData = require('form-data');
const { exec } = require("child_process");

const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

fana({ nomCom: "tr", categorie: "Use", reaction: "💗" }, async (chatId, zk, commandeOptions) => {
  const { msgRepondu, repondre, arg, ms } = commandeOptions;
  if (msgRepondu) {
    try {
      if (!arg || !arg[0]) {
        await sendFormattedMessage(zk, chatId, "(eg : trt en)", ms);
        return;
      }
      let texttraduit = await traduire(msgRepondu.conversation, { to: arg[0] });
      await sendFormattedMessage(zk, chatId, texttraduit, ms);
    } catch (error) {
      console.error('Error:', error);
      await sendFormattedMessage(zk, chatId, "*Mᥱntιon ᥲ tᥱxt mᥱssᥲgᥱ*", ms);
    }
  } else {
    await sendFormattedMessage(zk, chatId, "*Mᥱntιon ᥲ tᥱxt mᥱssᥲgᥱ*", ms);
  }
});

async function sendFormattedMessage(zk, chatId, text, ms) {
  try {
    const sentMsg = await zk.sendMessage(chatId, {
      body: { text },
      footer: { text: `Pσɯҽɾҽԃ Ⴆყ njᥲbᥙᥣo` },
      nativeFlowMessage: {
        buttons: [
          { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: '📢 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡 𝘾𝙝𝙖𝙣𝙣𝙚𝙡', url: '', merchant_url: '', }), },
          { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: '📘 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 Support', url: 'https://facebook.com/FrediEzra', merchant_url: 'https://facebook.com/FrediEzra', }), },
          { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: '📷 𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢 Support', url: 'https://instagram.com/frediezra', merchant_url: 'https://instagram.com/frediezra', }), },
          { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: '🎵 𝙏𝙞𝙠𝙏𝙤𝙠 Support', url: 'https://tiktok.com/frediezra1', merchant_url: 'https://tiktok.com/frediezra1', }), },
          { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: '🐙 𝙂𝙞𝙩𝙃𝙪𝙗 𝙍𝙚𝙥𝙤', url: 'https://github.com/Fred1e/Fee-Xmd', merchant_url: 'https://github.com/Fred1e/Fee-Xmd', }), },
          { name: 'single_select', buttonParamsJson: JSON.stringify({ title: '𝐕𝐈𝐄𝐖☇ 𝐎𝐏𝐓𝐈𝐎𝐍𝐒 ☑', sections: [
            { title: '⌜ 𝘾𝙤𝙧𝙚 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 ⌟', highlight_label: '© 丨几匚', rows: [
              { title: '𝐏𝐢𝐧𝐠', description: 'Check bot response time', id: `ping` },
              { title: '𝐑𝐞𝐩𝐨', description: 'Get bot repository link', id: `repo` },
              { title: '𝐅𝐮𝐥𝐥𝐌𝐞𝐧𝐮', description: 'Display all commands', id: `fullmenu` },
              { title: '𝐃𝐞𝐯', description: "Send developer contact", id: `dev` },
            ], },
            { title: 'ℹ 𝙄𝙣𝙛𝙤 𝘽𝙤𝙩', highlight_label: '© 丨几匚', rows: [
              { title: '𝐒𝐞𝐭𝐭𝐢𝐇𝐠𝐬', description: 'Show bot settings', id: `.settings` },
              { title: '𝐒𝐮𝐩𝐩𝐨𝐫𝐭', description: 'Get support information', id: `.support` },
            ], },
            { title: '📜 𝘾𝙖𝙩𝙚𝙜𝙤𝙧𝙮 𝙈𝙚𝙣𝙪𝙨', highlight_label: '© 丨几匚', rows: [
              { title: 'ping', description: 'General commands', id: `.owner` },
              { title: 'menu', description: 'Bot settings commands', id: `.menu` },
            ], },
          ], }), },
        ],
      },
      contextInfo: {
        externalAdReply: {
          title: `njᥲbᥙᥣo`,
          body: `Translate text`,
          mediaType: 1,
        },
      },
    }, { quoted: ms });
    console.log('Message sent');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
