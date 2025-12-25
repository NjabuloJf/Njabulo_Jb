
const { fana } = require("../njabulo/fana");
const axios = require("axios");

fana({ 
  nomCom: "lyu", 
  reaction: "🎵", 
  categorie: "Search", 
  aliases: ["lyric", "mistari"], 
}, async (chatId, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const songName = arg.join(" ").trim();
  if (!songName) return repondre("🎵 Type a song title or lyric line\nExample: lyrics what shall I render to Jehovah");

  try {
    console.log(`Searching lyrics for: ${songName}`);
    const res = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(songName)}`);
    const data = res.data;
    console.log('API Response:', data);
    if (!data.lyrics) {
      return repondre("❌ No lyrics found.");
    }
    const caption = `🎶 ${data.lyrics}`;
    await zk.sendMessage(chatId, { text: caption }, { quoted: ms });
  } catch (err) {
    console.error("lyrics error:", err);
    repondre("❌ Error fetching lyrics: " + err.message);
  }
});

