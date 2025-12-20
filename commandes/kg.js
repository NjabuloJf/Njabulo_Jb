
const { fana } = require("../njabulo/fana");
const gis = require("g-i-s");
const axios = require("axios");
const conf = require(__dirname + "/../set");

fana({
  nomCom: "ima",
  aliases: ["image", "images"],
  categorie: "Images",
  reaction: "☘️"
}, async (dest, zk, commandeOptions) => {
  try {
    const { repondre, ms, arg } = commandeOptions;
    const q = arg.join(' ');
    if (!q) return repondre("Please provide a search query 🔍");

    repondre("Searching images... 📸");

    gis(q, async (error, results) => {
      if (error) {
        console.error(error);
        return repondre("Error searching images 😕");
      }

      if (!results || results.length === 0) return repondre("No images found 😔");

      const images = results.slice(0, 8);
      const picked = [];

      for (const img of images) {
        try {
          const bufferRes = await axios.get(img.url, { responseType: "arraybuffer" });
          picked.push({ buffer: bufferRes.data, directLink: img.url });
        } catch (e) {
          console.error("Image download failed:", img.url, e);
        }
      }

      if (picked.length === 0) return repondre("Failed to download images 😕");

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
    });
  } catch (err) {
    console.error("Image command error:", err);
    repondre("An error occurred 😕");
  }
});

