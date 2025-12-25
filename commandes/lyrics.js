

const { fana } = require("../njabulo/fana");
const config = require("../set");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const axios = require('axios');

fana({
  nomCom: "lyrics",
  alias: ["song"],
  categorie: "Music",
  reaction: "🎵",
  use: ".lyrics <song name>",
}, async (dest, zk, commandeOptions) => {
  const { repondre, args, ms } = commandeOptions;
  if (!args.join(' ')) return repondre(`Please provide a song name`);
  const songName = args.join(' ');
  const apiUrl = `https://apiskeith.vercel.app/search/lyrics2?query=${encodeURIComponent(songName)}`;

  try {
    const loadingMessage = await repondre(`*⏳ Searching for lyrics of ${songName}...*`);
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log(data);
    if (data.error) return repondre(`Lyrics not found for ${songName}`);

    const lyrics = data.lyrics;
    const title = data.title;
    const artist = data.artist;
    const imagelyrics = data.image;

    const cards = [
      {
        header: {
          title: `📊 ${title}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: imagelyrics } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
🎵 *${title}* by ${artist}

${lyrics}
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
                display_text: "🌐 View on YouTube",
                url: `https://www.youtube.com/results?search_query=${title} ${artist}`,
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
              header: { text: `🔍 Lyrics` },
              body: { text: `*📂 Found lyrics for ${title}*` },
              carouselMessage: { cards },
            },
          },
        },
      },
      { quoted: ms }
    );
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    console.error("Error in lyrics command:", e);
    repondre(`An error occurred: ${e.message}`);
  }
});


