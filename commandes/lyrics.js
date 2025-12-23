const { fana } = require("../njabulo/fana");
const axios = require("axios");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({
  nomCom: "lyrcs",
  reaction: '🎵', 
  categorie: "Music",
  aliases: ["lyric", "mistari"]
},
async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const songName = arg.join(" ").trim();
  if (!songName) {
    return repondre("Please provide a song name. Example: *" + "lyrics Shape of You*");
  }


  // ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // (empty string kept as in original)
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

  
  const apiUrl = `https://apiskeith.vercel.app/search/lyrics2?query=${encodeURIComponent(songName)}`;
  const loadingMessage = await repondre(`*⏳ Searching for lyrics of ${songName}...*`);

  try {
    const response = await axios.get(apiUrl, { timeout: 100000 });
    const data = response.data;

    if (!data.status || !data.result) {
       await zk.deleteMessage(dest, loadingMessage.key);
      return;
    }

    const cards = await Promise.all([
      {
        header: {
          title: `🎵 ${songName}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: data.result,
        },
        footer: {
          text: "ᯤNᴊᴀʙᴜʟᴏ Jʙ ᴘʜᴏᴛᴏ ɢʀᴀᴍ 🙄",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Lyrics",
                copy_code: data.result,
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
              footer: { text: `Found lyrics` },
              carouselMessage: { cards },
            },
          },
        },
      },
      { quoted: ms }
    );

    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
    await zk.deleteMessage(dest, loadingMessage.key);
  } catch (err) {
    console.error("lyrics error:", err);
    await zk.deleteMessage(dest, loadingMessage.key);
  }
});
