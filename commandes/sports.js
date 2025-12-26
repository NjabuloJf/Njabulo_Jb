  
const { fana } = require('../njabulo/fana');
const axios = require("axios");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({
  nomCom: "spotifylist",
  aliases: ["spotifysearch", "splaylist"],
  categorie: "Fledi-search",
  reaction: "🎬"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg[0]) {
    return repondre('🤦Please provide a query!');
  }

  try {
    const searchApiUrl = `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(arg[0])}`;
    const searchData = (await axios.get(searchApiUrl)).data;

    if (!searchData || searchData.length === 0) {
      return repondre("⁉️No Spotify search results found.");
    }

    const cards = [];
    for (let i = 0; i < Math.min(6, searchData.length); i++) {
      const track = searchData[i];
      cards.push({
        header: {
          title: `${track.title}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: track.image || "https://via.placeholder.com/300" } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `*Artist*: ${track.artist || "Unknown"}\n*Album*: ${track.album || "Unknown"}`,
        },
        footer: {
          text: "NJABULO PLANET SPOTIFY PLAY",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "Listen on Spotify",
                url: track.url,
              }),
            },
          ],
        },
      });
    }

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
                text: `NJABULO PLANET SPOTIFY PLAY\n\nSearch results for: ${arg[0]}`
              },
              footer: {
                text: "Click to view tracks"
              },
              carouselMessage: {
                cards
              },
            },
          },
        },
      },
      { quoted: commandeOptions.ms }
    );

    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (error) {
    repondre(`❌Error: ${error.message}`);
    console.error(error);
  }
});

