const { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "img",
  aliases: ["image", "images"],
  categorie: "Images",
  reaction: "☘️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Which image?');
    return;
  }

  const searchTerm = arg.join(" ");
  const loadingMessage = await repondre(`⏳ Searching for ${searchTerm} images...`);

  try {
    const results = await new Promise((resolve, reject) => {
      gis(searchTerm, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    if (!results || results.length === 0) {
      await zk.sendMessage(dest, { text: "No images found." }, { quoted: ms });
      await zk.deleteMessage(dest, loadingMessage.key);
      return;
    }

    for (let i = 0; i < Math.min(results.length, 5); i++) {
      const result = results[i];
      if (!result?.url) continue;

      const imageimg = `
🖼️ Title: *${searchTerm}*
💾 Size: *${result.width}x${result.height}*
🎆 Quality: *High HD*
🌐 Download by *➥ sir Njabulo Jbメ*`;

      const buttons = [{
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "Visit Website",
          id: "backup channel",
          url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u"
        })
      }, {
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
          display_text: "Messaging online",
          id: "copy",
          copy_code: searchTerm
        })
      }];

      await zk.sendMessage(dest, {
        interactiveMessage: {
          image: { url: result.url },
          header: imageimg,
          buttons,
          headerType: 1,
          contextInfo: {
            externalAdReply: {
              title: "📝messages menu cmd",
              mediaType: 1,
              previewType: 0,
              thumbnailUrl: result.url,
              sourceUrl: "https://www.instagram.com/njabulojb871",
              renderLargerThumbnail: false,
            }
          }
        }
      }, {
        quoted: {
          key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast"
          },
          message: {
            contactMessage: {
              displayName: "🟢online njᥲbᥙᥣo🍥",
              vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
            }
          }
        }
      });
    }

    await zk.deleteMessage(dest, loadingMessage.key);
  } catch (error) {
    console.error("Error searching images:", error);
    await zk.sendMessage(dest, { text: "Error searching images. Please try again." }, { quoted: ms });
    await zk.deleteMessage(dest, loadingMessage.key).catch(() => {});
  }
});
