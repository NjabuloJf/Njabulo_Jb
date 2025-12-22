
const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');
const moment = require("moment-timezone");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({
  nomCom: "ya",
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

    const cards = await Promise.all(
      search.videos.slice(0, 5).map(async (video, i) => ({
        header: {
          title: `📸 ${video.title}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: video.thumbnail } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `🎧 Views: ${video.views.toLocaleString()}\n🎻 Uploaded: ${video.ago}\n${video.timestamp}`,
        },
        footer: {
          text: "🔹 Play song",
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
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "🎵 Play Audio",
                id: `play_audio_${video.videoId}`,
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
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: {
              body: { text: `🔍 Search Results for: ${query}` },
              footer: { text: `📂 Found ${search.videos.length} results` },
              carouselMessage: { cards },
            },
          },
        },
      },
      { quoted: ms }
    );

    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (err) {
    console.error('[PLAY] Error:', err);
    await zk.sendMessage(dest, {
      text: 'An error occurred: ' + err.message,
    }, { quoted: ms });
  }
});

zk.on('message', async (message) => {
  try {
    if (message.type === 'interactive_response_message' && message.interactiveResponseMessage.nativeFlowResponseMessage) {
      const buttonId = message.interactiveResponseMessage.nativeFlowResponseMessage.id;
      if (buttonId.startsWith('play_audio_')) {
        const videoId = buttonId.replace('play_audio_', '');
        await playAudio(message.key.remoteJid, videoId, message);
      }
    }
  } catch (err) {
    console.error('[BUTTON_CLICK] Error:', err);
  }
});

async function playAudio(dest, videoId, message) {
  try {
    const apiURL = `https://noobs-api.top/dipto/ytDl3?link=${encodeURIComponent(videoId)}&format=mp3`;
    const response = await axios.get(apiURL);
    if (response.status !== 200) {
      await zk.sendMessage(dest, {
        text: 'Failed to retrieve the MP3 download link. Please try again later.',
      }, { quoted: message });
      return;
    }

    const data = response.data;
    if (!data.downloadLink) {
      await zk.sendMessage(dest, {
        text: 'Failed to retrieve the MP3 download link.',
      }, { quoted: message });
      return;
    }

    const video = (await ytSearch({ videoId })).videos[0];
    const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
    const fileName = `${safeTitle}.mp3`;
    await zk.sendMessage(dest, {
      audio: { url: data.downloadLink },
      mimetype: 'audio/mpeg',
      fileName,
    }, { quoted: message });
  } catch (err) {
    console.error('[PLAY_AUDIO] Error:', err);
    await zk.sendMessage(dest, {
      text: 'An error occurred: ' + err.message,
    }, { quoted: message });
  }
}


