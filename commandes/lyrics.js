// ── Lyrics search command ─────────────────────────────────────────────
fana({
  nomCom: "eliy",
  aliases: ["lyric", "ly"],
  categorie: "Search",
  reaction: "🎵",
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) return repondre("🎵 Type a song title or lyric line");

  const q = arg.join(" ");
  const loadingMessage = await repondre(`*⏳ Searching for lyrics of ${q}...*`);

  try {
    const apiUrl = `https://apiskeith.vercel.app/search/lyrics2?query=${encodeURIComponent(q)}`;
    const res = await axios.get(apiUrl, { timeout: 100000 });
    const data = res.data;

    if (!data.status || !data.result) {
      await zk.sendMessage(dest, { text: "😕 Sorry, we can't provide lyrics for that song. Want to know more about the song or artist? 😊" }, { quoted: ms });
      await zk.deleteMessage(dest, loadingMessage.key);
      return;
    }

    const lyricsCards = await Promise.all(
      data.result.split('\n\n').map(async (lyricChunk, i) => ({
        header: {
          title: `🎵 Lyrics ${i + 1}`,
        },
        body: { text: lyricChunk },
        footer: { text: "ᯤNᴊᴀʙᴜʟᴏ Jʙ ᴘʜᴏᴛᴏ ɢʀᴀᴍ 🙄" },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({ display_text: "📋 Copy Lyrics", copy_code: lyricChunk }),
            },
          ],
        },
      }))
    );

    const lyricsMessage = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: {
              body: { text: `🔍 Lyrics for: ${q}` },
              footer: { text: `📂 Found lyrics` },
              carouselMessage: { cards: lyricsCards },
            },
          },
        },
      },
      { quoted: ms }
    );

    await zk.relayMessage(dest, lyricsMessage.message, { messageId: lyricsMessage.key.id });
    await zk.deleteMessage(dest, loadingMessage.key);
  } catch (err) {
    console.error("lyrics error:", err);
    await zk.sendMessage(dest, { text: "😕 Sorry, we can't provide lyrics for that song. Want to know more about the song or artist? 😊" }, { quoted: ms });
    await zk.deleteMessage(dest, loadingMessage.key);
  }
}); 
