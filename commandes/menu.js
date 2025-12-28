
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
          title: `😅 Reaction Menu`,
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
          title: `🎨 Edit Menu`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
① .sʜɪᴛ
② .ᴡᴀsᴛᴇᴅ
③ .ᴡᴀɴᴛᴇᴅ
④ .ᴛʀɪɢɢᴇʀ
⑤ .ᴛʀᴀsʜ
⑥ .ʀɪᴘ
⑦ .sᴇᴘɪᴀ
⑧ .ʀᴀɪɴʙᴏᴡ
⑨ .ʜɪᴛʟᴇʀ
⑩ .ɪɴᴠᴇʀᴛ
⑪ .ᴊᴀɪʟ
⑫ .ᴀғғᴇᴄᴛ
⑬ .ʙᴇᴀᴜᴛɪғᴜʟ
⑭ .ʙʟᴜʀ
⑮ .ᴄɪʀᴄʟᴇ
⑯ .ғᴀᴄᴇᴘᴀʟᴍ
⑰ .ɢʀᴇʏsᴄᴀʟᴇ
⑱ .ᴊᴏᴋᴇs
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
          title: `🐛Bug cmd Menu`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
① .ʙᴜɢ ᴄʀᴀsʜ
② .ʟᴏᴄᴄʀᴀsʜ
③ .ᴀᴍᴏᴜɴᴛʙᴜɢ <ᴀᴍᴏᴜɴᴛ>
④ .ᴄʀᴀsʜʙᴜɢ 255xxxx
⑤ .ᴘᴍʙᴜɢ 255xxxx
⑥ .ᴅᴇʟᴀʏʙᴜɢ 255xxxx
⑦ .ᴛʀᴏʟʟʏʙᴜɢ 255xxxx
⑧ .ᴅᴏᴄᴜʙᴜɢ 254xxxx
⑨ .ᴜɴʟɪᴍɪᴛᴇᴅʙᴜɢ 255xxxx
⑩ .ʙᴏᴍʙᴜɢ 255xxxx
⑪ .ʟᴀɢʙᴜɢ 255xxxx
⑫ .ɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
⑬ .ᴅᴇʟᴀʏɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
⑭ .ᴛʀᴏʟʟʏɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
⑮ .ʟᴀɢɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
⑯ .ʙᴏᴍɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
⑰ .ᴜɴʟɪᴍɪᴛᴇᴅɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
⑱ .ᴅᴏᴄᴜɢᴄʙᴜɢ <ɢʀᴏᴜᴘʟɪɴᴋ>
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
          title: `👥 Group Menu`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
① .ᴅᴇʟ
② .ᴛᴀɢᴀʟʟ
③ .ʟɪɴᴋ
④ .ᴘʀᴏᴍᴏᴛᴇ
⑤ .ᴅᴇᴍᴏᴛᴇ
⑥ .ʀᴇᴍᴏᴠᴇ
⑥ .ᴅᴇʟᴇᴛᴇ
⑧ .ɪɴғᴏ
⑨ .ᴀɴᴛɪʟɪɴᴋ
⑩ .ᴀɴᴛɪʙᴏᴛ
⑪ .ɢʀᴏᴜᴘ
⑫ .ɢɴᴀᴍᴇ
⑬ .ɢᴅᴇsᴄ
⑭ .ɢᴘᴘ
⑮ .ʜɪᴅᴇᴛᴀɢ
⑯ .ᴀᴜᴛᴏʟʟ
⑰ .ᴏɴʟʏᴀᴅᴍɪɴ
⑱ .ᴋɪᴄᴋᴀʟʟ
⑲ .ᴡᴀʀɴ
⑳ .ᴡᴇʟᴄᴏᴍᴇ
㉑ .ɢᴏᴏᴅʙʏᴇ
㉒ .ᴀɴᴛɪᴘʀᴏᴍᴏᴛᴇ
㉓ .ᴀɴᴛɪᴅᴇᴍᴏᴛᴇ
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
          title: `🧚‍♂️ Web Menu`,
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
          title: `🛠️ Use Menu`,
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
          title: `🔍 Search Menu`,
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
          title: `⚡ General Menu`,
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
① .ᴀɴᴛɪᴄᴀʟʟ
② .ʀᴇᴀᴅsᴛᴀᴛᴜs
③ .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ
④ .ᴅᴏᴡɴʟᴏᴀᴅsᴛᴀᴛᴜs
⑤ .sᴛᴀʀᴛᴍᴇssᴀɢᴇ
⑥ .ʀᴇᴀᴅᴍᴇssᴀɢᴇ
⑥ .ᴘᴍ-ᴘᴇʀᴍɪᴛ
⑧ .ᴄʜᴀᴛʙᴏᴛ
⑨ .ɢʀᴇᴇᴛ
⑩ .ᴀɴᴛɪᴠᴠ
⑪ .ᴘᴜʙʟɪᴄᴍᴏᴅᴇ
⑫ .ᴀᴜᴛᴏʀᴇᴄᴏʀᴅ
⑬ .ᴀᴜᴛᴏᴛʏᴘɪɴɢ
⑭ .ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ
⑮ .ᴘʀɪᴠᴀᴛᴇᴍᴏᴅᴇ
⑯ .ᴀᴜᴛᴏʟɪᴋᴇsᴛᴀᴛᴜs
⑰ .ᴄʜᴀᴛʙᴏᴛ
⑱ .sᴇᴛᴛɪɴɢs
⑲ .sᴇᴛᴘʀᴇғɪx
⑳ .ᴍᴇɴᴜʟɪɴᴋs
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
          title: `🤖 Chat Menu`,
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

    
