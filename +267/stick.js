const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { fana } = require("../njabulo/fana");

// ── Button definition (same as in the other modules) ─────
const buttons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Website",
      id: "backup channel",
      url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
    }),
  },
  {
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: "Messaging online",
      id: "copy",
      copy_code: "greeting",
    }),
  },
];

// ── Helper that sends a simple interactive message with buttons ─────
async function sendButtonMessage(zk, chatId, text) {
  await zk.sendMessage(chatId, {
    interactiveMessage: {
      header: text,
      buttons,
      headerType: 1,
    },
  });
}

// ── Main command ─────────────────────────────────────────────
fana(
  {
    nomCom: "stickersearch",
    categorie: "Search",
    reaction: "🌀",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg, nomAuteurMessage } = commandeOptions;

    if (!arg[0]) {
      repondre("where is the request ? !");
      return;
    }

    const searchTerm = arg.join(" ");
    const tenorApiKey = "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c"; // <-- put your Tenor key here

    try {
      // fetch a handful of GIFs
      const { data } = await axios.get(
        `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${tenorApiKey}&client_key=my_project&limit=8&media_filter=gif`
      );

      // send up to 5 stickers
      for (let i = 0; i < Math.min(5, data.results.length); i++) {
        const gifUrl = data.results[i].media_formats.gif.url;

        const sticker = new Sticker(gifUrl, {
          pack: nomAuteurMessage,
          author: "njabulo jb",
          type: StickerTypes.FULL,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 60,
          background: "transparent",
        });

        const stickerBuf = await sticker.toBuffer();

        await zk.sendMessage(
          dest,
          { sticker: stickerBuf },
          {
            quoted: {
              key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
              },
              message: {
                contactMessage: {
                  displayName: "NנɐႦυℓσ נႦ✆︎",
                  vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`,
                },
              },
            },
          }
        );
      }

      // after the stickers, send the button‑rich message
      await sendButtonMessage(
        zk,
        dest,
        `Here are your stickers, ${nomAuteurMessage}!`
      );
    } catch (error) {
      console.error("Error while searching stickers:", error);
      repondre("Error while searching stickers.");
    }
  }
);