const { fana } = require("../njabulo/fana");
const config = require("../set");
const moment = require("moment-timezone");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({
  nomCom: "menu",
  alias: ["help", "cmds"],
  categorie: "General",
  reaction: "📚",
  use: ".menu",
}, async (dest, zk, commandeOptions) => {
  console.log('Command triggered!');
  const { repondre, ms } = commandeOptions;

  moment.tz.setDefault("Africa/Botswana");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    const hour = moment().hour();
    let greeting = "Good Mornιng";
    if (hour >= 12 && hour < 18) {
        greeting = "Good ᥲftᥱrnnon!";
    } else if (hour >= 18) {
        greeting = "Good Evᥱrnιng!";
    } else if (hour >= 22 || hour < 5) {
        greeting = "Good Nιght";
    }

  
  try {
    const njabulox = [
      "https://files.catbox.moe/xjeyjh.jpg",
      "https://files.catbox.moe/mh36c7.jpg",
      "https://files.catbox.moe/bnb3vx.jpg"
    ];

    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
    if (!randomNjabulourl) {
      console.error("Error: No image URL found.");
      repondre("An error occurred: No image URL found.");
      return;
    }

    const cards = [
      {
        header: {
          title: `╭───────────⊷
┊▢ *ɴᴀᴍᴇ: ɳʝαႦυʅσ ʝႦ*
┊▢ *ᴅᴀᴛᴇ:* ${date}
┊▢ *ᴛɪᴍᴇ:* ${temps}
┌┤`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
① .ʙᴜʟʟʏ
② .ᴄᴜᴅᴅʟᴇ
③ .ᴄʀʏ
④ .ʜᴜɢ
⑤ .ᴀᴡᴏᴏ
⑥ .ᴋɪss
⑦ .ʟɪᴄᴋ
⑧ .ᴘᴀᴛ
⑨ .sᴍᴜɢ
⑩ .ʙᴏɴᴋ
⑪ .ʏᴇᴇᴛ
⑫ .ʙʟᴜsʜ
⑬ .sᴍɪʟᴇ
⑭ .ᴡᴀᴠᴇ
⑮ .ʜɪɢʜғɪᴠᴇ
⑯ .ʜᴀɴᴅʜᴏʟᴅ
⑰ .ɴᴏᴍ
⑱ .ʙɪᴛᴇ
⑲ .ɢʟᴏᴍᴘ
⑳ .sʟᴀᴘ
㉑ .ᴋɪʟʟ
㉒ .ᴋɪᴄᴋ
㉓ .ʜᴀᴘᴘʏ
㉔ .ᴡɪɴᴋ
㉕ .ᴘᴏᴋᴇ
㉖ .ᴅᴀɴᴄᴇ
㉗ .ᴄʀɪɴɢᴇ
ᖇEᗩᑕTIOᑎ ᗰEᑎᒍ`,
        },
        footer: {
          text: `┌┤🌇 *Hallo family  ${greeting}*
╰──────────────⊷⳹`,
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹",
                url: `https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 𝗖𝗼𝗽𝘆 𝗟𝗶𝗻𝗸𝘀",
                copy_code: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
              }),
            },
          ],
        },
      },
      {                                      
        header: {
          title: `╭───────────⊷
┊▢ *ɴᴀᴍᴇ: ɳʝαႦυʅσ ʝႦ*
┊▢ *ᴅᴀᴛᴇ:* ${date}
┊▢ *ᴛɪᴍᴇ:* ${temps}
┌┤`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
ᴄʜᴀᴛ
② .ɴᴊᴀʙᴜʟᴏ
③ .ɢᴘᴛ
④ .ɢᴇᴍɪɴɪ
⑤ .ɪʟᴀᴍᴀ
⑥ ᴄᴍᴅ sᴏᴏɴ
⑦ ᴄᴍᴅ sᴏᴏɴ
⑧ ᴄᴍᴅ sᴏᴏɴ
⑨ ᴄᴍᴅ sᴏᴏɴ
⑩ ᴄᴍᴅ sᴏᴏɴ
⑪ ᴄᴍᴅ sᴏᴏɴ
⑫ ᴄᴍᴅ sᴏᴏɴ
⑬ ᴄᴍᴅ sᴏᴏɴ
⑭ ᴄᴍᴅ sᴏᴏɴ
⑮ ᴄᴍᴅ sᴏᴏɴ
⑯ ᴄᴍᴅ sᴏᴏɴ
⑰ ᴄᴍᴅ sᴏᴏɴ
⑱ ᴄᴍᴅ sᴏᴏɴ
⑲ ᴄᴍᴅ sᴏᴏɴ
⑳ ᴄᴍᴅ sᴏᴏɴ
㉑ ᴄᴍᴅ sᴏᴏɴ
㉒ ᴄᴍᴅ sᴏᴏɴ
㉓ ᴄᴍᴅ sᴏᴏɴ
㉔ ᴄᴍᴅ sᴏᴏɴ
㉕ ᴄᴍᴅ sᴏᴏɴ
㉖ ᴄᴍᴅ sᴏᴏɴ
㉗ ᴄᴍᴅ sᴏᴏɴ
ᑕᕼᗩT ᗰEᑎᑌ`,
        },
        footer: {
          text: `┌┤🌇 *Hallo family  ${greeting}*
╰──────────────⊷⳹ `,
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 Wa Channel",
                url: `https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Links",
                copy_code: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
              }),
            },
          ],
        },
      },
    ];

    const audioUrl = "https://files.catbox.moe/bf8mnv.mp3";
            
    
    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: {
              header: { text: `🔍 System Info` },
              body: { text: `*ɴᴀᴍᴇ ʙᴏᴛ ɴᴊᴀʙᴜʟᴏ ᴊʙ*\n*ʟɪʙʀᴀʀʏ ɴᴏᴅᴇ.ᴊs*` },
              carouselMessage: { cards },
            },
          },
        },
        }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "ɳʝαႦυʅσ ʝႦ",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

    
await zk.relayMessage(dest, message.message, { messageId: message.key.id });

    
   await zk.sendMessage(dest, {
            audio: { url: audioUrl },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "ɳʝαႦυʅσ ʝႦ",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

      
  } catch (e) {
    console.error("Error in menu command:", e);
    repondre(`An error occurred: ${e.message}`);
  }
});

    
