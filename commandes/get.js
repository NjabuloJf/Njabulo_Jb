
const { fana } = require("../njabulo/fana");
const moment = require("moment-timezone");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');
// List of image URLs
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg" // New image added
];

moment.tz.setDefault("Africa/Botswana");
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

async function sendFormattedMessage(zk, chatId, text, ms) {
  try {
    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
    const message = generateWAMessageFromContent(chatId, {
      interactiveMessage: {
        header: {
          title: 'FEE-XMD MENU',
          subtitle: 'Your Ultimate WhatsApp Bot',
          documentMessage: {
            url: randomNjabulourl,
            mimetype: 'image/png',
            fileSha256: '+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=',
            fileLength: '1435',
            pageCount: 0,
            mediaKey: 'MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=',
            fileName: 'FEE-XMD MENU',
            fileEncSha256: 'ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=',
            directPath: '/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc?ccb=11-4&oh=01_Q5Aa2QGGiJj--6eHxoTTTTzuWtBgCrkcXBz9hN_y2s_Z1lrABA&oe=68D7901C&_nc_sid=5e03e0',
            mediaKeyTimestamp: '1756370084',
            jpegThumbnail: randomNjabulourl,
          },
          hasMediaAttachment: true,
        },
        body: {
          text: text
        },
        footer: {
          text: `Pσɯҽɾҽԃ Ⴆყ njabulo `
        },
        nativeFlowMessage: {
          buttons: [
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
                        title: '𝐏𝐢𝐧𝐠',
                        description: 'Check bot response time',
                        id: `ping`
                      },
                      {
                        title: '𝐑𝐞𝐩𝐨',
                        description: 'Get bot repository link',
                        id: `repo`
                      },
                      {
                        title: '𝐅𝐮𝐥𝐥𝐌𝐞𝐧𝐮',
                        description: 'Display all commands',
                        id: `fullmenu`
                      },
                      {
                        title: '𝐃𝐞𝐯',
                        description: "Send developer contact",
                        id: `dev`
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
                        id: `generalmenu`
                      },
                      {
                        title: '𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬𝐌𝐞𝐧𝐮',
                        description: 'Bot settings commands',
                        id: `settingsmenu`
                      },
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
              expiration_time: moment().add(1, 'hour').unix(),
            },
            bottom_sheet: {
              in_thread_buttons_limit: 2,
              divider_indices: [1, 2],
              list_title: 'Select Command',
              button_title: 'FEE-XMD MENU',
            },
          }),
        },
        contextInfo: {
          externalAdReply: {
            title: `njabulo`,
            body: `Yo, Ready to fuck shit up?`,
            mediaType: 1,
            thumbnail: randomNjabulourl,
            mediaUrl: '',
            sourceUrl: 'https://github.com/Fred1e/Fee-Xmd',
            showAdAttribution: false,
            renderLargerThumbnail: true,
          },
        },
      },
    }, { quoted: ms });
    await zk.sendMessage(chatId, message.message, { messageId: message.key.id });
  } catch (error) {
    console.error("Error in sendFormattedMessage:", error);
  }
}

fana(
  {
    nomCom: "get",
    categorie: "General",
    reaction: "📷",
  },
  async (chatId, zk, commandeOptions) => {
    try {
      const { ms, repondre, msgRepondu, auteurMsgRepondu, mybotpic, nomAuteurMessage } = commandeOptions;
      if (!msgRepondu) {
        return sendFormattedMessage(zk, chatId, `Yo ${nomAuteurMessage}, reply to someone’s message to snag their profile pic! 😡 Don’t make Njabulo Jb do extra work! 🤔`, ms);
      }
      await sendFormattedMessage(zk, chatId, `Yo ${nomAuteurMessage}, Njabulo Jb’s hunting for @${auteurMsgRepondu.split("@")[0]}’s profile pic! 📸 Hold tight! 🔍`, ms);
      let ppuser;
      try {
        ppuser = await zk.profilePictureUrl(auteurMsgRepondu, 'image');
      } catch {
        ppuser = mybotpic();
        await sendFormattedMessage(zk, chatId, `Yo ${nomAuteurMessage}, @${auteurMsgRepondu.split("@")[0]}’s profile pic is locked tight! 😣 Njabulo Jb’s got you my pic instead! 😎`, ms);
      }
      await zk.sendMessage(
        chatId,
        {
          image: { url: ppuser },
          caption: `BOOM, ${nomAuteurMessage}! Snagged @${auteurMsgRepondu.split("@")[0]}’s profile pic! 🔥`,
          mentions: [auteurMsgRepondu],
        },
        {
          quoted: {
            key: {
              fromMe: false,
              participant: `0@s.whatsapp.net`,
              remoteJid: "status@broadcast"
            },
            message: {
              contactMessage: {
                displayName: "NנɐႦυℓσ נႦ✆︎",
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
              }
            }
          }
        }
      );
    } catch (error) {
      console.error("Error in gppp command:", error);
      await sendFormattedMessage(zk, chatId, `TOTAL BUST, ${nomAuteurMessage}! Njabulo Jb crashed: ${error.message} 😡 Try again or flop! 😣`, ms);
    }
  }
);

