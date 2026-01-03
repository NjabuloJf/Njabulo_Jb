const util = require('util');
const fs = require('fs-extra');
const { fana } = require("../njabulo/fana");
const os = require("os");
const moment = require("moment-timezone");
const config = require("../set");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({ 
  nomCom: "ping", 
  alias: ["speed", "pong"], 
  categorie: "General", 
  reaction: "⏰", 
  use: ".ping", 
}, async (dest, zk, commandeOptions) => { 
  console.log('Command triggered!'); 
  const { repondre, ms, prefixe } = commandeOptions; 
  try { 
    const njabulox = [ 
      "https://files.catbox.moe/mh36c7.jpg", 
      "https://files.catbox.moe/bnb3vx.jpg" 
    ]; 
    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)]; 
    if (!randomNjabulourl) { 
      console.error("Error: No image URL found."); 
      repondre("An error occurred: No image URL found."); 
      return; 
    } 
    const reactionEmojis = ['❄️']; 
    const textEmojis = ['🚀']; 
    const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)]; 
    let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)]; 
    while (textEmoji === reactionEmoji) { 
      textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)]; 
    } 
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
    const start = new Date().getTime(); 
    await zk.sendPresenceUpdate('composing', dest); 
    const end = new Date().getTime(); 
    const responseTime = (end - start) / 1000; 
    const cards = [ 
      { 
        header: { 
          title: `📊 Uptime`, 
          hasMediaAttachment: true, 
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage, 
        }, 
        body: { 
          text: `⏳ *uptime* : *${runtime(process.uptime())} ${reactionEmoji}* `, 
        }, 
        footer: { 
          text: "", 
        }, 
        nativeFlowMessage: { 
          buttons: [
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: 'GitHub Repo',
                url: 'https://github.com/xhclintohn/Toxic-MD',
                merchant_url: 'https://github.com/xhclintohn/Toxic-MD',
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
                      {
                        title: '𝐅𝐮𝐥𝐥𝐌𝐞𝐧𝐮',
                        description: 'Display all commands',
                        id: `${prefix}fullmenu`
                      },
                      {
                        title: '𝐃𝐞𝐯',
                        description: "send developer contact",
                        id: `${prefix}dev`
                      },
                    ],
                  },
                  {
                    title: 'ℹ 𝙄𝙣𝙛𝙤 𝘽𝙤𝙩',
                    highlight_label: '© 丨几匚',
                    rows: [
                      {
                        title: '𝐏𝐢𝐧𝐠',
                        description: '',
                        id: `${prefix}ping`
                      },
                      {
                        title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬',
                        description: 'show bot settings',
                        id: `${prefix}settings`
                      },
                    ],
                  },
                  {
                    title: '📜 𝘾𝙖𝙩𝙚𝙜𝙤𝙧𝙮 𝙈𝙚𝙣𝙪𝙨',
                    highlight_label: '© 丨几匚',
                    rows: [
                      {
                        title: '𝐆𝐞𝐧𝐞𝐫𝐚𝐥𝐌𝐞𝐧𝐮',
                        description: 'General commands',
                        id: `${prefix}generalmenu`
                      },
                      {
                        title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬𝐌𝐞𝐧𝐮',
                        description: 'Bot settings commands',
                        id: `${prefix}settingsmenu`
                      },
                      {
                        title: '𝐎𝐰𝐧𝐞𝐫𝐌𝐞𝐧𝐮',
                        description: 'Owner only commands',
                        id: `${prefix}ownermenu`
                      },
                      {
                        title: '𝐇𝐞𝐫𝐨𝐤𝐮𝐌𝐞𝐧𝐮',
                        description: 'Heroku related commands',
                        id: `${prefix}herokumenu`
                      },
                      {
                        title: '𝐏𝐫𝐢𝐯𝐚𝐜𝐲𝐌𝐞𝐧𝐮',
                        description: 'Privacy commands',
                        id: `${prefix}privacymenu`
                      },
                      {
                        title: '𝐆𝐫𝐨𝐮𝐩𝐌𝐞𝐧𝐮',
                        description: 'Group management',
                        id: `${prefix}groupmenu`
                      },
                      {
                        title: '𝐀𝐈𝐌𝐞𝐧𝐮',
                        description: 'AI & chat commands',
                        id: `${prefix}aimenu`
                      },
                      {
                        title: '𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐌𝐞𝐧𝐮',
                        description: 'Media downloaders',
                        id: `${prefix}downloadmenu`
                      },
                      {
                        title: '𝐄𝐝𝐢𝐭𝐢𝐧𝐠𝐌𝐞𝐧𝐮',
                        description: 'Media editing tools',
                        id: `${prefix}editingmenu`
                      },
                      {
                        title: '𝐋𝐨𝐠𝐨𝐌𝐞𝐧𝐮',
                        description: 'Logo & text makers',
                        id: `${prefix}logomenu`
                      },
                      {
                        title: '+𝟏𝟖𝐌𝐞𝐧𝐮',
                        description: 'NSFW commands (18+)',
                        id: `${prefix}+18menu`
                      },
                      {
                        title: '𝐔𝐭𝐢𝐥𝐬𝐌𝐞𝐧𝐮',
                        description: 'Utility commands',
                        id: `${prefix}utilsmenu`
                      },
                    ],
                  },
                ],
              }),
            },
          ]
        } 
      }, 
      {
        header: { 
          title: `📊 Uptime`, 
          hasMediaAttachment: true, 
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage, 
        }, 
        body: { 
          text: `⏳ *uptime* : *${runtime(process.uptime())} ${reactionEmoji}* `, 
        }, 
        footer: { 
          text: "", 
        }, 
        nativeFlowMessage: { 
          buttons: [
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: 'GitHub Repo',
                url: 'https://github.com/xhclintohn/Toxic-MD',
                merchant_url: 'https://github.com/xhclintohn/Toxic-MD',
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
                      {
                        title: '𝐅𝐮𝐥𝐥𝐌𝐞𝐧𝐮',
                        description: 'Display all commands',
                        id: `${prefix}fullmenu`
                      },
                      {
                        title: '𝐃𝐞𝐯',
                        description: "send developer contact",
                        id: `${prefix}dev`
                      },
                    ],
                  },
                  {
                    title: 'ℹ 𝙄𝙣𝙛𝙤 𝘽𝙤𝙩',
                    highlight_label: '© 丨几匚',
                    rows: [
                      {
                        title: '𝐏𝐢𝐧𝐠',
                        description: '',
                        id: `${prefix}ping`
                      },
                      {
                        title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬',
                        description: 'show bot settings',
                        id: `${prefix}settings`
                      },
                    ],
                  },
                  {
                    title: '📜 𝘾𝙖𝙩𝙚𝙜𝙤𝙧𝙮 𝙈𝙚𝙣𝙪𝙨',
                    highlight_label: '© 丨几匚',
                    rows: [
                      {
                        title: '𝐆𝐞𝐧𝐞𝐫𝐚𝐥𝐌𝐞𝐧𝐮',
                        description: 'General commands',
                        id: `${prefix}generalmenu`
                      },
                      {
                        title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬𝐌𝐞𝐧𝐮',
                        description: 'Bot settings commands',
                        id: `${prefix}settingsmenu`
                      },
                      {
                        title: '𝐎𝐰𝐧𝐞𝐫𝐌𝐞𝐧𝐮',
                        description: 'Owner only commands',
                        id: `${prefix}ownermenu`
                      },
                      {
                        title: '𝐇𝐞𝐫𝐨𝐤𝐮𝐌𝐞𝐧𝐮',
                        description: 'Heroku related commands',
                        id: `${prefix}herokumenu`
                      },
                      {
                        title: '𝐏𝐫𝐢𝐯𝐚𝐜𝐲𝐌𝐞𝐧𝐮',
                        description: 'Privacy commands',
                        id: `${prefix}privacymenu`
                      },
                      {
                        title: '𝐆𝐫𝐨𝐮𝐩𝐌𝐞𝐧𝐮',
                        description: 'Group management',
                        id: `${prefix}groupmenu`
                      },
                      {
                        title: '𝐀𝐈𝐌𝐞𝐧𝐮',
                        description: 'AI & chat commands',
                        id: `${prefix}aimenu`
                      },
                      {
                        title: '𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐌𝐞𝐧𝐮',
                        description: 'Media downloaders',
                        id: `${prefix}downloadmenu`
                      },
                      {
                        title: '𝐄𝐝𝐢𝐭𝐢𝐧𝐠𝐌𝐞𝐧𝐮',
                        description: 'Media editing tools',
                        id: `${prefix}editingmenu`
                      },
                      {
                        title: '𝐋𝐨𝐠𝐨𝐌𝐞𝐧𝐮',
                        description: 'Logo & text makers',
                        id: `${prefix}logomenu`
                      },
                      {
                        title: '+𝟏𝟖𝐌𝐞𝐧𝐮',
                        description: 'NSFW commands (18+)',
                        id: `${prefix}+18menu`
                      },
                      {
                        title: '𝐔𝐭𝐢𝐥𝐬𝐌𝐞𝐧𝐮',
                        description: 'Utility commands',
                        id: `${prefix}utilsmenu`
                      },
                    ],
                  },
                ],
              }),
            },
          ]
        } 
      }, 
      ];
            await zk.relayMessage(dest, message.message, { messageId: message.key.id }); 
  } catch (e) { 
    console.error("Error in menu command:", e); 
    repondre(`An error occurred: ${e.message}`); 
  } 
});

