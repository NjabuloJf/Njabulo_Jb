const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');
const moment = require("moment-timezone");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({
  nomCom: "song",
  aliases: ["song", "playdoc", "audio", "mp3"],
  categorie: "download",
  reaction: "🎸"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;
  try {
    if (!arg) {
      return zk.sendMessage(dest, {
        text: 'Please provide a song name or keyword.',
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363399999197102@newsletter',
            newsletterName: "╭••➤®Njabulo Jb",
            serverMessageId: 143,
          },
        },
      }, { quoted: ms });
    }

    const query = arg.join(' ');
    const search = await ytSearch(query);
    if (!search || !search.videos || !search.videos[0]) {
      return zk.sendMessage(dest, {
        text: 'No results found for your query.',
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363399999197102@newsletter',
            newsletterName: "╭••➤®Njabulo Jb",
            serverMessageId: 143,
          },
        },
      }, { quoted: ms });
    }

    const video = search.videos[0];
    const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
    const fileName = `${safeTitle}.mp3`;
    const apiURL = `https://noobs-api.top/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp3`;

    try {
      const response = await axios.get(apiURL);
      if (response.status !== 200) {
        await zk.sendMessage(dest, {
          text: 'Failed to retrieve the MP3 download link. Please try again later.',
          contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363399999197102@newsletter',
              newsletterName: "╭••➤®Njabulo Jb",
              serverMessageId: 143,
            },
          },
        }, { quoted: ms });
        return;
      }

      const data = response.data;
      if (!data.downloadLink) {
        await zk.sendMessage(dest, {
          text: 'Failed to retrieve the MP3 download link.',
          contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363399999197102@newsletter',
              newsletterName: "╭••➤®Njabulo Jb",
              serverMessageId: 143,
            },
          },
        }, { quoted: ms });
        return;
      }

      moment.tz.setDefault("Africa/Botswana");
      const hour = moment().hour();
      let greeting = "Good Mornιng";
      if (hour >= 12 && hour < 18) {
        greeting = "Good ᥲftᥱrnnon!";
      } else if (hour >= 18) {
        greeting = "Good Evᥱrnιng!";
      } else if (hour >= 22 || hour < 5) {
        greeting = "Good Nιght";
      }

      const card = 
      {
        header: {
          title: `*📸 ${video.title}*`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: video.thumbnail } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `*🎧 Views:* ${video.views.toLocaleString()}\n*🎻 Uploaded:* ${video.ago}\n${video.timestamp}`,
        },
        footer: {
          text: "",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on YouTube",
                url: `https://youtu.be/${video.videoId}`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: `https://youtu.be/${video.videoId}`,
              }),
            },
          ],
        },
      };

      const message = generateWAMessageFromContent(
        dest,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
              interactiveMessage: {
                body: { text: `🔍 Search Results for: ${query}` },
                footer: { text: `📂 Found 1 result` },
                carouselMessage: { cards: [card] },
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
        document: { url: data.downloadLink },
        mimetype: 'audio/mpeg',
        fileName,
      }, { quoted: ms });
    } catch (err) {
      console.error('[PLAY] API Error:', err);
      await zk.sendMessage(dest, {
        text: 'An error occurred: ' + err.message,
      }, { quoted: ms });
    }
  } catch (err) {
    console.error('[PLAY] Error:', err);
    await zk.sendMessage(dest, {
      text: 'An error occurred: ' + err.message,
    }, { quoted: ms });
  }
});


