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
㉔ ᴄᴍᴅ sᴏᴏɴ
㉕ ᴄᴍᴅ sᴏᴏɴ
㉖ ᴄᴍᴅ sᴏᴏɴ
㉗ ᴄᴍᴅ sᴏᴏɴ
ᒪOGO ᗰEᑎᑌ`,
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
        url: "https://whatsapp.com/channel/0029VbC9950DzgTDAVL08f3k",
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
      };
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
⑫ .ᴀғғᴇᴄᴛi
⑬ .ʙᴇᴀᴜᴛɪғᴜʟ
⑭ .ʙʟᴜʀ
⑮ .ᴄɪʀᴄʟᴇ
⑯ .ғᴀᴄᴇᴘᴀʟᴍ
⑰ .ɢʀᴇʏsᴄᴀʟᴇ
⑱ .ᴊᴏᴋᴇs
⑲ ᴄᴍᴅ sᴏᴏɴ
⑳ ᴄᴍᴅ sᴏᴏɴ
㉑ ᴄᴍᴅ sᴏᴏɴ
㉒ ᴄᴍᴅ sᴏᴏɴ
㉓ ᴄᴍᴅ sᴏᴏɴ
㉔ ᴄᴍᴅ sᴏᴏɴ
㉕ ᴄᴍᴅ sᴏᴏɴ
㉖ ᴄᴍᴅ sᴏᴏɴ
㉗ ᴄᴍᴅ sᴏᴏɴ
EᗪIT ᗰEᑎᑌ`,
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
⑲ ᴄᴍᴅ sᴏᴏɴ
⑳ ᴄᴍᴅ sᴏᴏɴ
㉑ ᴄᴍᴅ sᴏᴏɴ
㉒ ᴄᴍᴅ sᴏᴏɴ
㉓ ᴄᴍᴅ sᴏᴏɴ
㉔ ᴄᴍᴅ sᴏᴏɴ
㉕ ᴄᴍᴅ sᴏᴏɴ
㉖ ᴄᴍᴅ sᴏᴏɴ
㉗ ᴄᴍᴅ sᴏᴏɴ
ᗷᑌG ᗰEᑎᑌ`,
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
㉔ ᴄᴍᴅ sᴏᴏɴ
㉕ ᴄᴍᴅ sᴏᴏɴ
㉖ ᴄᴍᴅ sᴏᴏɴ
㉗ ᴄᴍᴅ sᴏᴏɴ
GᖇOᑌᑭ ᗰEᑎᑌ`,
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
ᗩᑎIᗰE ᗰEᑎᑌ`,
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
① .ʟᴇғᴛ
② .ᴛᴇʟᴇsᴛɪᴄᴋᴇʀ
③ .ᴄʀᴇᴡ
④ .ʟᴇᴀᴠᴇ
⑤ .ᴊᴏɪɴ
⑥ .ᴊɪᴅ
⑥ .ʙʟᴏᴄᴋ
⑧ .ᴜɴʙʟᴏᴄᴋ
⑨ .ʙᴀɴ
⑩ .ʙᴀɴɢʀᴏᴜᴘ
⑪ .sᴜᴅᴏ
⑫ .sᴀᴠᴇ
⑬ .ᴍᴇɴᴛɪᴏɴ
⑭ .ʟᴇғᴛ
⑮ .ᴜɴʙʟᴏᴄᴋ
⑯ .ʙʟᴏᴄᴋ
⑰ .ʜᴀᴄᴋ
⑱ .ғᴀɴᴄʏ
⑲ .ᴛʀᴛ
⑳ ᴄᴍᴅ sᴏᴏɴ
㉑ ᴄᴍᴅ sᴏᴏɴ
㉒ ᴄᴍᴅ sᴏᴏɴ
㉓ ᴄᴍᴅ sᴏᴏɴ
㉔ ᴄᴍᴅ sᴏᴏɴ
㉕ ᴄᴍᴅ sᴏᴏɴ
㉖ ᴄᴍᴅ sᴏᴏɴ
㉗ ᴄᴍᴅ sᴏᴏɴ
ᑌᔕE ᗰEᑎᑌ`,
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
① .ᴘʟᴀʏ
② .sᴏɴɢ
③ .ᴠɪᴅᴇᴏ
④ .ᴠɪᴅᴇᴏᴅᴏᴄ
⑤ .ғʙ
⑥ .ғᴀᴄᴇʙᴏᴏᴋ
⑦ .ʟɪᴛᴇ
⑧ .ᴛɪᴋᴛᴏᴋ
⑨ .ᴀᴘᴋ
⑩ .ᴍᴇᴅɪᴀғɪʀᴇ
⑪ .ᴅᴏᴡɴʟᴏᴀᴅ
⑫ .ᴍᴘ3 
⑬ .ᴍᴘ4 
⑭ .ᴍᴘ4ᴅᴏᴄ
⑮ .ᴍᴘ3ᴅᴏᴄ
⑯ .ʟʏʀɪᴄs 
⑰ .ʏᴛs
⑱ .ɪᴍɢ
⑲ .ɪᴍᴀɢᴇ
⑳ .ᴍᴏᴠɪᴇ 
㉑ .ᴋᴅʀᴀᴍᴀ
㉒ .ᴅʀᴀᴍᴀ
㉓ .sᴇᴀʀᴄʜ 
㉔ .ʏᴏᴜᴛᴜʙᴇ
㉕ .ᴠɪᴅᴇᴏxxx
㉖ .xxx
㉗ .ᴘᴏʀɴᴏ
ᗪOᗯᑎᒪOᗩᗪ ᗰEᑎᑌ`,
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
⑪ .ᴘᴀɪʀ 
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
GEᑎEᖇᗩᒪ ᗰEᑎᑌ`,
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
㉑ ᴄᴍᴅ sᴏᴏɴ
㉒ ᴄᴍᴅ sᴏᴏɴ
㉓ ᴄᴍᴅ sᴏᴏɴ
㉔ ᴄᴍᴅ sᴏᴏɴ
㉕ ᴄᴍᴅ sᴏᴏɴ
㉖ ᴄᴍᴅ sᴏᴏɴ
㉗ ᴄᴍᴅ sᴏᴏɴ
ᕼEᖇOKᑌ-ᑕᒪIEᑎT ᗰEᑎᑌ`,
        },
        footer: {
          text: ` ┌┤🌇 *Hallo family  ${greeting}*
╰──────────────⊷⳹`,
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
         image: { url: randomNjabulourl },
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: {
              header: { text: `🔍 System Info` },
              image: { url: randomNjabulourl },
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

    
