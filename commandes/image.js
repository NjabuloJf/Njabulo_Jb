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

  // Check if search term is provided
  if (!arg[0]) {
    repondre('Which image?');
    return;
  }

  const searchTerm = arg.join(" ");

  // Loading message
  const loadingMessage = await repondre(`*⏳ Searching for ${searchTerm} images...`*);

  try {
    // Search for images
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

    // Send images
    for (let i = 0; i < Math.min(results.length, 5); i++) {
      try {
        const result = results[i];
        if (!result || !result.url) continue;
        const caption = `
       🖼️ Title: *${searchTerm}*
       💾 Size: *${result.width}x${result.height}*
       🎆 Quality: *High HD*
       🌐 Download by *➥ sir Njabulo Jbメ*`;

        
        await zk.sendMessage(dest, {
          image: { url: result.url },
          caption: caption,
        }, { quoted: ms });
      } catch (error) {
        console.error(`Error sending image ${i}:`, error);
      }
    }

    // Delete loading message
    try {
      await zk.deleteMessage(dest, loadingMessage.key);
    } catch (error) {
      console.error("Error deleting loading message:", error);
    }
  } catch (error) {
    console.error("Error searching images:", error);
    await zk.sendMessage(dest, { text: "Error searching images. Please try again." }, { quoted: ms });
    try {
      await zk.deleteMessage(dest, loadingMessage.key);
    } catch (error) {
      console.error("Error deleting loading message:", error);
    }
  }
});
 
