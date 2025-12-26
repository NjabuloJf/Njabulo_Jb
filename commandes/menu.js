
const { fana } = require("../njabulo/fana");
const config = require("../set");
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
          title: `📊 Logo Menu`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
① .ʜᴀᴄᴋᴇʀ
② .ᴅʀᴀɢᴏɴʙᴀʟʟ
③ .ɴᴀʀᴜᴛᴏ
④ .ᴅɪᴅᴏɴɢ
⑤ .ᴅɪᴅᴏɴɢ
⑥ .sᴜᴍᴍᴇʀ
⑦ .ᴡᴀʟʟ
⑧ .ɢʀᴇᴇɴɴᴇᴏɴ
⑨ .ɴᴇᴏɴʟɪɢʜᴛ
⑩ .ʙᴏᴏᴍʟɢ
⑪ .ᴅᴇᴠɪʟ
⑫ .ɢʟɪᴛᴄʜ
⑬ .ᴛʀᴀɴsғᴏʀᴍᴇʀ
⑭ .sɴᴏᴡ
⑮ .ᴡᴀᴛᴇʀ
⑯ .ɴᴇᴏɴ
⑰ .ᴛʜᴏʀ
⑱ .ʟɪɢʜᴛɢʟᴏᴡ
⑲ .ᴀʀᴇɴᴀ
⑳ .ɢᴏʟᴅ
㉑ .ᴘᴜʀᴘʟᴇ
㉒ .ɢɪғ
㉓ .ɪɴᴄᴀɴᴅᴇsᴄᴇɴᴛ
`,
        },
        footer: {
          text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on Channel",
                url: `https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
              }),
            },
          ],
        },
      },
      {
        header: {
          title: `📊 Group Menu`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
ɢʀᴏᴜᴘ
① .ᴀɴᴛɪʟɪɴᴋ
② .ᴀᴘᴘʀᴏᴠᴇ
③ .ᴅᴇʟ
④ .ᴘʀᴏᴍᴏᴛᴇ
⑤ .ᴅᴇᴍᴏᴛᴇ
⑥ .ɢʀᴏᴜᴘ
⑦ .ʜɪᴅᴇᴛᴀɢ
⑧ .ʟɪɴᴋ
⑨ .ᴋɪᴄᴋᴀʟʟ
⑩ .ᴛᴀɢᴀʟʟ
⑪ .ᴡᴇʟᴄᴏᴍᴇ
⑫ .ɢᴏᴏᴅʙʏᴇ
⑬ .ᴀɴᴛɪᴘʀᴏᴍᴏᴛᴇ
⑭ .ᴀɴᴛɪᴅᴇᴍᴏᴛᴇ
`,
        },
        footer: {
          text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on Channel",
                url: `https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
              }),
            },
          ],
        },
      },
      {
        header: {
          title: `📊 Web Menu`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
① .ᴡᴀɪғᴜ-ᴏɴᴇ
② .ɴᴇᴋᴏ-ᴏɴᴇ
③ .sʜɪɴᴏʙᴜ-ᴏɴᴇ
④ .ᴍᴇɢᴜᴍɪɴ-ᴏɴᴇ
⑤ .ᴄᴏsᴘʟᴀʏ-ᴏɴᴇ
⑥ .ᴄᴏᴜᴘʟᴇᴘᴘ-ᴏɴᴇ
⑦ .ᴡᴀɪғᴜ
⑧ .ɴᴇᴋᴏ
⑨ .sʜɪɴᴏʙᴜ
⑩ .ᴍᴇɢᴜᴍɪɴ
⑪ .ᴄᴏsᴘʟᴀʏ
⑫ .ᴄᴏᴜᴘʟᴇᴘᴘ
`,
        },
        footer: {
          text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on Channel",
                url: `https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
              }),
            },
          ],
        },
      },
      {
        header: {
          title: `📊 Use Menu`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
ᴜsᴇ
① .ᴛʀᴛ
② .ғᴀɴᴄʏ
③ .ʜᴀᴄᴋ
④ .ʙʟᴏᴄᴋ
⑤ .ᴜɴʙʟᴏᴄᴋ
⑥ .ʟᴇғᴛ
`,
        },
        footer: {
          text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on Channel",
                url: `https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
              }),
            },
          ],
        },
      },
      {
        header: {
          title: `📊 Search Menu`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
sᴇᴀʀᴄʜ
① .ʟʏʀɪᴄs
② .sᴛɪᴄᴋᴇʀsᴇᴀʀᴄʜ
③ .ʏᴛs
④ .ᴘʟᴀʏ
⑤ .ᴠɪᴅᴇᴏ
⑥ .ɪᴍᴀɢᴇ
⑥ .ɪᴍɢ
⑧ .ғʙ
`,
        },
        footer: {
          text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on Channel",
                url: `https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
              }),
            },
          ],
        },
      },
      {
        header: {
          title: `📊 General Menu`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
ɢᴇɴᴇʀᴀʟ
① .ɢᴇᴛᴘᴘ
② .ʀᴇᴘᴏ
③ .ᴍᴇɴᴜ
④ .ᴍᴇɴᴀ
⑤ .ᴏʙᴛ
⑥ .ᴏᴡɴᴇʀ
⑥ .ᴘɪ
⑧ .ᴘɪɴɢ
⑨ .sʜᴀᴢᴀᴍ
⑩ .ᴜᴘᴛɪᴍᴇ
⑪ .ᴜʀʟ
① .ᴘᴀɪʀ
`,
        },
        footer: {
          text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on Channel",
                url: `https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
              }),
            },
          ],
        },
      },
      {
        header: {
          title: `📊 Heroku Menu`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
ʜᴇʀᴏᴋᴜ-ᴄʟɪᴇɴᴛ
① .ᴘᴍ-ᴘᴇʀᴍɪᴛ
② .ᴀᴜᴛᴏʟɪᴋᴇsᴛᴀᴛᴜs
③ .ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ
④ .ᴀᴜᴛᴏʀᴇᴄᴏʀᴅ
⑤ .ᴀᴜᴛᴏᴛʏᴘɪɴɢ
⑥ .ᴘʀɪᴠᴀᴛᴇᴍᴏᴅᴇ
⑥ .ᴘᴜʙʟɪᴄᴍᴏᴅᴇ
`,
        },
        footer: {
          text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on Channel",
                url: `https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
              }),
            },
          ],
        },
      },
      {
        header: {
          title: `📊 Chat Menu`,
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
`,
        },
        footer: {
          text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on Channel",
                url: `https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
              }),
            },
          ],
        },
      },
    ];

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
      },
      { quoted: ms }
    );
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    console.error("Error in menu command:", e);
    repondre(`An error occurred: ${e.message}`);
  }
});

    
