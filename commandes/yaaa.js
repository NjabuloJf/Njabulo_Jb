
const { fana } = require("../njabulo/fana");
const moment = require("moment-timezone");
// List of image URLs
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg" // New image added
];
// Select a random image file
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
moment.tz.setDefault("Africa/Botswana");
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

async function sendFormattedMessage(zk, chatId, text, ms) {
  const msgm = await zk.sendMessage(chatId, {
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
      image: { url: randomNjabulourl },
      header: text,
      footer: `Pσɯҽɾҽԃ Ⴆყ njabulo`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363399999197102@newsletter",
          newsletterName: "╭••➤®Njabulo Jb",
          serverMessageId: 143,
        },
        forwardingScore: 999,
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: '🌐Wa Channel',
              url: 'https://whatsapp.com/channel',
              merchant_url: 'https://whatsapp.com/channel',
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
  }, { quoted: ms });
  return msgm;
}

fana(
  {
    nomCom: "yaaa",
    categorie: "General",
    reaction: "📷",
  },
  async (chatId, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu, auteurMsgRepondu, mybotpic, nomAuteurMessage } = commandeOptions;
    if (!msgRepondu) {
      return sendFormattedMessage(zk, chatId, `Yo ${nomAuteurMessage}, reply to someone’s message to snag their profile pic! 😡 Don’t make Njabulo Jb do extra work! 🤔`, ms);
    }
    try {
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
      console.error("Error in .getpp command:", error);
      await sendFormattedMessage(zk, chatId, `TOTAL BUST, ${nomAuteurMessage}! Njabulo Jb crashed while grabbing the pic: ${error.message} 😡 Try again or flop! 😣`, ms);
    }
  }
);


