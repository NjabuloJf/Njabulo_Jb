
const { fana } = require("../njabulo/fana");
const axios = require("axios");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({
  nomCom: "lt",
  reaction: '🎵', 
  categorie: "Music",
  aliases: ["lyric", "mistari"]
},
async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const songName = arg.join(" ").trim();
  if (!songName) {
    return repondre("Please provide a song name. Example: *" + s.PREFIXE + "lyrics Shape of You*");
  }
  const apis = [
    `https://api.dreaded.site/api/lyrics?title=${encodeURIComponent(songName)}`,
    `https://some-random-api.com/others/lyrics?title=${encodeURIComponent(songName)}`,
    `https://api.davidcyriltech.my.id/lyrics?title=${encodeURIComponent(songName)}`
  ];
  let lyricsData;
  for (const api of apis) {
    try {
      const response = await axios.get(api);
      if (response.data?.result?.lyrics) {
        lyricsData = response.data;
        break;
      }
    } catch (error) {
      console.error(`API ${api} failed:`, error.message);
    }
  }
  if (!lyricsData?.result) {
    return repondre("❌ Couldn't find lyrics for *" + songName + "*");
  }
  const { title, artist, thumb, lyrics } = lyricsData.result;
  const imageUrl = thumb || "https://files.catbox.moe/aktbgo.jpg"; 
  try {
    const cards = await Promise.all([
      {
        header: {
          title: `🎵 ${title}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: imageUrl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `Artist: ${artist}\n\n${lyrics}`,
        },
        footer: {
          text: "Powered by Rahmani-Md",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Lyrics",
                copy_code: lyrics,
              }),
            },
          ],
        },
      },
    ]);
    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: {
              header: { text: `Lyrics for "${songName}"` },
              footer: { text: `Found lyrics for ${title}` },
              carouselMessage: { cards },
            },
          },
        },
      },
      { quoted: ms }
    );
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (error) {
    console.error("Error sending lyrics:", error);
    repondre(`🎶 *${title}* - ${artist}\n\n${lyrics.substring(0, 2000)}...\n\n*[Truncated - image failed to load]*`);
  }
}); 
