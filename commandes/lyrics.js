
const { fana } = require("../njabulo/fana");
const axios = require("axios");

fana({ 
  nomCom: "lyrics", 
  reaction: "🎶", 
  categorie: "Music", 
  aliases: ["lirik"], 
}, async (chatId, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const query = arg.join(" ").trim();
  if (!query) return repondre("😊 Give me a song name!");

  try {
    const res = await axios.get(`https://api.elrayyxml.web.id/api/search/lyrics?q=${encodeURIComponent(query)}`);
    const data = res.data;

    if (data.status && data.result) {
      const lyrics = data.result.lyrics;
      const title = data.result.title || data.result.song_title;
      const artist = data.result.artist || data.result.artist_name;
      const year = data.result.year || 'Unknown';

      if (parseInt(year) > 1930) {
        repondre(`😅 Sorry, can't share lyrics for "${title}" by ${artist}. Want to know more about the song?`);
      } else {
        let msg = `🎶 *${title}* by ${artist}\n\n${lyrics}`;
        repondre(msg);
      }
    } else {
      repondre("😅 Lyrics not found. Try another song?");
    }
  } catch (err) {
    console.error("lyrics error:", err);
    repondre("❌ Error. Try again later.");
  }
});

