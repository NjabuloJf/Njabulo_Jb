const { fana } = require("../njabulo/fana");
const gis = require("g-i-s");
const axios = require("axios");
const conf = require(__dirname + "/../set");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // (empty string kept as in original)
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Base button definition (same as in other modules) ─────
const baseButtons = [
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
      display_text: "Copy",
      id: "copy",
      copy_code: "", // will be filled dynamically
    }),
  },
];

// ── Helper that sends an interactive message with image + buttons ─────
async function sendFormattedMessage(zk, chatId, text, ms) {
  // clone the button array so we can set the copy_code for this message
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy",
    id: "copy",
    copy_code: text, // copy the exact text that was sent
  });
  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: randomNjabulourl },
        header: text,
        buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "☘️ Image search",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
        },
      },
    },
    { quoted: ms }
  );
}

// ── Image search command ─────────────────────────────────────────────
fana(
  {
    nomCom: "img",
    aliases: ["image", "images"],
    categorie: "Images",
    reaction: "☘️",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg } = commandeOptions;
    if (!arg[0]) {
      return sendFormattedMessage(zk, dest, "Which image?", ms);
    }

    const q = arg.join(" ");
    const loadingMessage = await repondre(`*⏳ Searching for ${q} images...*`);

    try {
      const apiUrl = `https://apiskeith.vercel.app/search/images?query=${encodeURIComponent(q)}`;
      const res = await axios.get(apiUrl, { timeout: 100000 });
      const results = res.data?.result;

      if (!Array.isArray(results) || results.length === 0) {
        await zk.sendMessage(dest, { text: "No images found." }, { quoted: ms });
        if (loadingMessage) await zk.deleteMessage(dest, loadingMessage.key);
        return;
      }

      const images = results.slice(0, 8);
      const picked = await Promise.all(
        images.map(async (img) => {
          try {
            const bufferRes = await axios.get(img.url, { responseType: "arraybuffer" });
            return { buffer: bufferRes.data, directLink: img.url };
          } catch {
            console.error("Image download failed:", img.url);
            return null;
          }
        })
      );

      const validImages = picked.filter(Boolean);
      if (validImages.length === 0) {
        await zk.sendMessage(dest, { text: "No images found." }, { quoted: ms });
        if (loadingMessage) await zk.deleteMessage(dest, loadingMessage.key);
        return;
      }

      const cards = await Promise.all(
        validImages.map(async (item, i) => ({
          header: {
            title: `📸 Image ${i + 1}`,
            hasMediaAttachment: true,
            imageMessage: (await generateWAMessageContent({ image: item.buffer }, { upload: zk.waUploadToServer })).imageMessage,
          },
          body: { text: `🔍 Search: ${q}` },
          footer: { text: "" },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({ display_text: "🌐 View Original", url: item.directLink }),
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({ display_text: "📋 Copy Link", copy_code: item.directLink }),
              },
            ],
          },
        })
        )
      );

      const message = generateWAMessageFromContent(
        dest,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
              interactiveMessage: {
                body: { text: `🔍 Search Results for: ${q}` },
                footer: { text: `📂 Found ${validImages.length} images` },
                carouselMessage: { cards },
              },
            },
          },
        },
        { quoted: ms }
      );

      await zk.relayMessage(dest, message.message, { messageId: message.key.id });
      if (loadingMessage) await zk.deleteMessage(dest, loadingMessage.key);
    } catch (error) {
      console.error("Error searching images:", error.response ? error.response.data : error.message);
      await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
      if (loadingMessage) await zk.deleteMessage(dest, loadingMessage.key);
    }
  }
);



        
fana(
  {
    nomCom: "image",
    aliases: ["image", "images"],
    categorie: "Images",
    reaction: "☘️",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg } = commandeOptions;
    if (!arg[0]) {
      return sendFormattedMessage(zk, dest, "Which image?", ms);
    }

    const q = arg.join(" ");
    const loadingMessage = await repondre(`*⏳ Searching for ${q} images...*`);

    try {
      const apiUrl = `https://apiskeith.vercel.app/search/images?query=${encodeURIComponent(q)}`;
      const res = await axios.get(apiUrl, { timeout: 100000 });
      const results = res.data?.result;

      if (!Array.isArray(results) || results.length === 0) {
        await zk.sendMessage(dest, { text: "No images found." }, { quoted: ms });
        if (loadingMessage) await zk.deleteMessage(dest, loadingMessage.key);
        return;
      }

      const images = results.slice(0, 8);
      const picked = await Promise.all(
        images.map(async (img) => {
          try {
            const bufferRes = await axios.get(img.url, { responseType: "arraybuffer" });
            return { buffer: bufferRes.data, directLink: img.url };
          } catch {
            console.error("Image download failed:", img.url);
            return null;
          }
        })
      );

      const validImages = picked.filter(Boolean);
      if (validImages.length === 0) {
        await zk.sendMessage(dest, { text: "No images found." }, { quoted: ms });
        if (loadingMessage) await zk.deleteMessage(dest, loadingMessage.key);
        return;
      }

      const cards = await Promise.all(
        validImages.map(async (item, i) => ({
          header: {
            title: `📸 Image ${i + 1}`,
            hasMediaAttachment: true,
            imageMessage: (await generateWAMessageContent({ image: item.buffer }, { upload: zk.waUploadToServer })).imageMessage,
          },
          body: { text: `🔍 Search: ${q}` },
          footer: { text: "Nᴊᴀʙᴜʟᴏ Jʙ ᴘʜᴏᴛᴏ ɢʀᴀᴍ 🙄" },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({ display_text: "🌐 View Original", url: item.directLink }),
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({ display_text: "📋 Copy Link", copy_code: item.directLink }),
              },
            ],
          },
        })
        )
      );

      const message = generateWAMessageFromContent(
        dest,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
              interactiveMessage: {
                body: { text: `🔍 Search Results for: ${q}` },
                footer: { text: `📂 Found ${validImages.length} images` },
                carouselMessage: { cards },
              },
            },
          },
        },
        { quoted: ms }
      );

      await zk.relayMessage(dest, message.message, { messageId: message.key.id });
      if (loadingMessage) await zk.deleteMessage(dest, loadingMessage.key);
    } catch (error) {
      console.error("Error searching images:", error.response ? error.response.data : error.message);
      await zk.sendMessage(dest, { text: `Error: ${error.message}` }, { quoted: ms });
      if (loadingMessage) await zk.deleteMessage(dest, loadingMessage.key);
    }
  }
);



        
