
const { zokou } = require('../framework/zokou');
var gis = require('g-i-s');
const axios = require("axios");

zokou({
  nomCom: "img",
  aliases: ["image", "images"],
  categorie: "Search",
  reaction: "📷"
}, async (dest, zk, commandeOptions) => {
  try {
    const { repondre, ms, arg } = commandeOptions;
    if (!arg[0]) {
      repondre('Which image do you want to search for? 🤔');
      return;
    }
    const q = arg.join(" ");
    repondre(`Searching for "${q}"... 📸`);

    gis(q, async (error, results) => {
      try {
        if (error) {
          console.error(error);
          repondre("Oops, an error occurred 😕");
          return;
        }

        if (!results || results.length === 0) {
          repondre("No images found 😔");
          return;
        }

        const images = results.slice(0, 8);
        const picked = [];

        for (const img of images) {
          try {
            const bufferRes = await axios.get(img.url, { responseType: "picked.push({ buffer: bufferRes.data, directLink: img.url });
          } catch (e) {
            console.error("Image download failed:", img.url, e);
          }
        }

        if (picked.length === 0) {
          repondre("Failed to download images 😕");
          return;
        }

        const cards = await Promise.all(picked.map(async (item, i) => ({
          header: {
            title: `📸 Image ${i + 1}`,
            hasMediaAttachment: true,
            imageMessage: (await zk.sendMessage(dest, { image: item.buffer }, { quoted: ms })).imageMessage
          },
          body: { text: `🔍 Search: ${q}` },
          footer: { text: "🔹 Scroll to see more images" },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({ display_text: "🌐 View Original", url: item.directLink })
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({ display_text: "📋 Copy Link", copy_code: item.directLink })
              }
            ]
          }
        }));

        const message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
              interactiveMessage: {
                body: { text: `🔍 Search Results for: ${q}` },
                footer: { text: `📂 Found ${picked.length} images` },
                carouselMessage: { cards }
              }
            }
          }
        };

        await zk.sendMessage(dest, message, { quoted: ms });
      } catch (err) {
        console.error("Image command error:", err);
        repondre("An error occurred 😕");
      }
    });
  } catch (err) {
    console.error("Image command error:", err);
    repondre("An error occurred 😕");
  }
});

