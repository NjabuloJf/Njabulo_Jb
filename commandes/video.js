
const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');
const moment = require("moment-timezone");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({ 
  nomCom: "video", 
  categorie: "download", 
  reaction: "🎥" 
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    if (!arg || arg.length === 0) {
      return zk.sendMessage(dest, { 
        text: 'Please provide a video name or keyword.', 
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

    if (!search || !search.videos || search.videos.length === 0) {
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

    const cards = await Promise.all(
      search.videos.slice(0, 5).map(async (video, i) => ({
        header: { 
          title: `📸 ${video.title}`, 
          hasMediaAttachment: true, 
          imageMessage: (await generateWAMessageContent({ image: { url: video.thumbnail } }, { upload: zk.waUploadToServer })).imageMessage, 
        },
        body: { 
          text: `*🎧 Views:* ${video.views.toLocaleString()}\n*🎻 Uploaded:* ${video.ago}\n${video.timestamp}`, 
        },
        footer: { 
          text: "ᯤAll is for you enjoy🎈", 
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
      }))
    );

    const message = generateWAMessageFromContent(
      dest, 
      { 
        viewOnceMessage: { 
          message: { 
            messageContextInfo: { 
              deviceListMetadata: {}, 
              deviceListMetadataVersion: 2 
            }, 
            interactiveMessage: { 
              body: { 
                text: `*Nᴊᴀʙᴜʟᴏ Jʙ YᴏᴜTᴜʙᴇ ᴅᴏᴡɴʟᴏᯤ*\n🔍 Search Results for: ${query}` 
              }, 
              footer: { 
                text: `📂 Found ${search.videos.length} results` 
              }, 
              carouselMessage: { 
                cards 
              }, 
            }, 
          }, 
        }, 
      }, 
      { quoted: ms }
    );

    await zk.relayMessage(dest, message.message, { messageId: message.key.id });

    // Send the first video
    const firstVideo = search.videos[0];
    const apiURL = `https://noobs-api.top/dipto/ytDl3?link=${encodeURIComponent(firstVideo.videoId)}&format=mp4`;

    try {
      const response = await axios.get(apiURL);
      if (response.status !== 200 || !response.data.downloadLink) {
        throw new Error('Failed to get download link');
      }

      const safeTitle = firstVideo.title.replace(/[\\/:*?"<>|]/g, '');
      const fileName = `${safeTitle}.mp4`;

      await zk.sendMessage(dest, { 
        video: { url: response.data.downloadLink }, 
        caption: firstVideo.title,
        contextInfo: { 
          externalAdReply: { 
            title: " ⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ↻ ", 
            mediaType: 1, 
            thumbnailUrl: firstVideo.thumbnail, 
          }, 
        }, 
      }, { quoted: ms });

    } catch (err) {
      console.error('[VIDEO] API Error:', err);
      await zk.sendMessage(dest, { text: 'Error: ' + err.message }, { quoted: ms });
    }

  } catch (err) {
    console.error('[VIDEO] Error:', err);
    await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message }, { quoted: ms });
  }
});


