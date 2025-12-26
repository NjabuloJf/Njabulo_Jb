

const { fana } = require("../njabulo/fana");
const yts = require("yt-search");
const config = require(__dirname + "/../set");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // keep the empty entry if you want a chance of no image
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
// ── Standard button set (used by all modules) ────────────────────────
const baseButtons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Website",
      id: "backup channel",
      url: config.GURL
    }),
  },
  {
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: "Copy",
      id: "copy",
      copy_code: config.GURL
    }),
  },
];
// ── Helper that sends an *interactive* message with image + buttons ─────
async function sendFormattedMessage(zk, chatId, text, ms) {
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy",
    id: "copy",
    copy_code: text,
  });
  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: randomNjabulourl },
        header: text,
        buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "🔍 YouTube Search",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
        },
      },
    },
    {
      quoted: {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
        },
        message: {
          contactMessage: {
            displayName: "njᥲbᥙᥣo",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`,
          },
        },
      },
    }
  );
}
// ── YouTube search command ─────────────────────────────────────────────
fana(
  {
    nomCom: "yts",
    aliases: ["ytsearch"],
    categorie: "Search",
    reaction: "🔍",
    description: "Search for YouTube videos.",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg } = commandeOptions;
    try {
      if (!arg[0]) {
        return repondre("Please provide a search query.");
      }
      const searchQuery = arg.join(" ");
      await repondre(`🔍 Searching for "${searchQuery}"...`);
      const results = await yts(searchQuery);
      if (!results.videos.length) {
        return repondre("No results found.");
      }
      const cards = await Promise.all(
        results.videos.slice(0, 5).map(async (video, i) => {
          let resultText = `*YouTube Search Result ${i+1}*\n\n`;
          resultText += `*🎧Title:* ${video.title}\n`;
          resultText += `🖇️*URL:* ${video.url}\n`;
          resultText += `*🙈Views:* ${video.views.toLocaleString()}\n`;
          resultText += `*🎶Uploaded:* ${video.ago}\n`;
          resultText += `*⏲️Duration:* ${video.timestamp}`;
          return {
            header: {
              title: `📸 ${video.title}`,
              hasMediaAttachment: true,
              imageMessage: (await generateWAMessageContent({ image: { url: video.thumbnail } }, { upload: zk.waUploadToServer })).imageMessage,
            },
            body: {
              text: resultText,
            },
            footer: {
              text: "*Nᴊᴀʙᴜʟᴏ Jʙ YᴏᴜTᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅᯤ*",
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
        })
      );
      const message = generateWAMessageFromContent(
        dest,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
              interactiveMessage: {
                header: { text: `🔍 Search Results for "${searchQuery}"` },
                footer: { text: `📂 Found ${results.videos.length} results` },
                carouselMessage: { cards },
              },
            },
          },
        },
        { quoted: ms }
      );
      await zk.relayMessage(dest, message.message, { messageId: message.key.id });
    } catch (err) {
      console.error(err);
      repondre("An error occurred while searching for videos.");
    }
  }
); 
