onst { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "imgs",
  aliases: ["image", "images"],
  categorie: "Images",
  reaction: "🖼️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
const fakeQuoted = {
      key: {
        participant: '0@s.whatsapp.net',
        remoteJid: '0@s.whatsapp.net',
        id: m.id
      },
      message: { conversation: "Toxic Verified By WhatsApp" },
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true
      }
    };
          
  if (!arg[0]) {
    repondre('Which image?');
    return;
  }

  const searchTerm = arg.join(" ");
  gis(searchTerm, (error, results) => sendImage(error, results));

  function sendImage(error, results) {
    if (error) {
      repondre("Oops, an error occurred.");
      return;
    }

    if (!results || results.length === 0) {
      repondre("No images found.");
      return;
    }

    for (let i = 0; i < Math.min(results.length, 5); i++) {
      zk.sendMessage(dest, {
        image: { url: results[i].url },
        caption: `•`,
      }, { quoted: ms });
    }
  }
});
