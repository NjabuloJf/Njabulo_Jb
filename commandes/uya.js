const { fana } = require("../njabulo/fana");
const axios = require("axios");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({
  nomCom: "uya",
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
  const apiUrl = `https://apiskeith.vercel.app/search/lyrics2?query=${encodeURIComponent(songName)}`;
  const loadingMessage = await repondre(`*⏳ Searching for lyrics of ${songName}...*`);

  try {
    const response = await axios.get(apiUrl, { timeout: 100000 });
    const data = response.data;

    if (!data.status || !data.result) {
      await zk.sendMessage(dest, { text: "😕 Sorry, we can't provide lyrics for that song. Want to know more about the song or artist? 😊" }, { quoted: ms });
      await zk.deleteMessage(dest, loadingMessage.key);
      return;
    }

    const imageUrl = "https://files.catbox.moe/aktbgo.jpg"; // default image
    const cards = await Promise.all([
      {
        header: {
          title: `🎵 ${songName}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: imageUrl } }, { upload: zk.waUploadToServer })).imageMessage,
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
    await zk.sendMessage(dest, { text: "😕 Sorry, we can't provide lyrics for that song. Want to know more about the song or artist? 😊" }, { quoted: ms });
    await zk.deleteMessage(dest, loadingMessage.key);
  }
});
