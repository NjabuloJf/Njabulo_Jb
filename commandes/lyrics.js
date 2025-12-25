
const { fana } = require("../njabulo/fana");
const axios = require("axios");

// ... (rest of your script)

fana({ 
  nomCom: "lyrics", 
  reaction: "🎵", 
  categorie: "Search", 
  aliases: ["lyric", "mistari"], 
}, async (chatId, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const songName = arg.join(" ").trim();
  if (!songName) {
    return sendFormattedMessage(
      zk,
      chatId,
      "*Pᥣᥱᥲsᥱ ρrovιdᥱ ᥲ song nᥲmᥱ. Exᥲmρᥣᥱ: ᥣყrιᥴs Shᥲρᥱ of Yoᥙ*",
      ms
    );
  }

  try {
    const response = await axios.get(`https://api.elrayyxml.web.id/api/search/lyrics?q=${encodeURIComponent(songName)}`);
    const data = response.data;

    if (data.status && data.result) {
      const { title, artist, lyrics } = data.result;
      const caption = `🎶 *${title}* - ${artist}\n\n${lyrics}\n\n*Powered by Njabulo Jb*`;

      sendFormattedMessage(zk, chatId, caption, ms);
    } else {
      sendFormattedMessage(zk, chatId, "*Coᥙᥣdn't fιnd ᥣყrιᥴs for*" + songName + "*", ms);
    }
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    sendFormattedMessage(zk, chatId, "*Error fetching lyrics*", ms);
  }
});

