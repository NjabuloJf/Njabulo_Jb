// ── Imports ───────────────────────────────────────────────────────
const { fana } = require("../njabulo/fana");
const axios = require("axios");
const { writeFile } = require("fs/promises");

// ── Random image for the header (used only for error messages) ─────
const njabulox = [
  "",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Base button definition ─────────────────────────────────
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
      display_text: "Copy URL",
      id: "copy",
      copy_code: "", // will be filled dynamically
    }),
  },
];

// ── Helper: send an image with a “Copy URL” button ─────
async function sendImageWithCopy(zk, chatId, imageUrl, ms) {
  // Clone the base button array so we can set the copy_code for this message
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy URL",
    id: "copy",
    copy_code: imageUrl, // copy the image URL
  });

  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: imageUrl },
        header: "📸 Image",
        buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "👥 message settings owner control",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: imageUrl,
            renderLargerThumbnail: false,
          },
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363399999197102@newsletter",
            newsletterName: "╭••➤®Njabulo Jb",
            serverMessageId: 143,
          },
          forwardingScore: 999,
        },
      },
    },
    { quoted: ms }
  );
}

// ── Helper for error messages (kept from previous version) ─────
async function sendError(zk, chatId, text, ms) {
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy",
    id: "copy",
    copy_code: text,
  });

  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: randomNjabulourl },
        header: "⚠️ Error",
        body: text,
        buttons,
        headerType: 1,
        contextInfo: { mentionedJid: [ms?.sender?.jid || ""] },
      },
    },
    { quoted: ms }
  );
}

// ── Waifu command ─────────────────────────────────────────────
fana(
  { nomCom: "waifu", categorie: "Weeb", reaction: "😏" },
  async (chatId, zk, context) => {
    const { ms } = context;
    const api = "https://api.waifu.pics/sfw/waifu";

    try {
      for (let i = 0; i < 5; i++) {
        const { data } = await axios.get(api);
        await sendImageWithCopy(zk, chatId, data.url, ms);
      }
    } catch (e) {
      await sendError(zk, chatId, `Error: ${e.message}`, ms);
    }
  }
);

// ── Neko command ─────────────────────────────────────────────
fana(
  { nomCom: "neko", categorie: "Weeb", reaction: "😺" },
  async (chatId, zk, context) => {
    const { ms } = context;
    const api = "https://api.waifu.pics/sfw/neko";

    try {
      for (let i = 0; i < 5; i++) {
        const { data } = await axios.get(api);
        await sendImageWithCopy(zk, chatId, data.url, ms);
      }
    } catch (e) {
      await sendError(zk, chatId, `Error: ${e.message}`, ms);
    }
  }
);

// ── Shinobu command ─────────────────────────────────────────────
fana(
  { nomCom: "shinobu", categorie: "Weeb", reaction: "🦋" },
  async (chatId, zk, context) => {
    const { ms } = context;
    const api = "https://api.waifu.pics/sfw/shinobu";

    try {
      for (let i = 0; i < 5; i++) {
        const { data } = await axios.get(api);
        await sendImageWithCopy(zk, chatId, data.url, ms);
      }
    } catch (e) {
      await sendError(zk, chatId, `Error: ${e.message}`, ms);
    }
  }
);

// ── Megumin command ─────────────────────────────────────────────
fana(
  { nomCom: "megumin", categorie: "Weeb", reaction: "💥" },
  async (chatId, zk, context) => {
    const { ms } = context;
    const api = "https://api.waifu.pics/sfw/megumin";

    try {
      for (let i = 0; i < 5; i++) {
        const { data } = await axios.get(api);
        await sendImageWithCopy(zk, chatId, data.url, ms);
      }
    } catch (e) {
      await sendError(zk, chatId, `Error: ${e.message}`, ms);
    }
  }
);

// ── Cosplay command ─────────────────────────────────────────────
fana(
  { nomCom: "cosplay", categorie: "Weeb", reaction: "😏" },
  async (chatId, zk, context) => {
    const { ms } = context;
    const api = "https://fantox-cosplay-api.onrender.com/";

    try {
      for (let i = 0; i < 5; i++) {
        const { data } = await axios.get(api, { responseType: "arraybuffer" });
        await writeFile("./cosplay.jpg", data);
        // Send the locally saved image with a copy‑button (uses the file path as URL)
        await sendImageWithCopy(zk, chatId, "./cosplay.jpg", ms);
      }
    } catch (e) {
      await sendError(zk, chatId, `Error: ${e.message}`, ms);
    }
  }
);

// ── Couple PP command ─────────────────────────────────────────────
fana(
  { nomCom: "couplepp", categorie: "Weeb", reaction: "💞" },
  async (chatId, zk, context) => {
    const { ms } = context;
    const api = "https://smiling-hosiery-bear.cyclic.app/weeb/couplepp";

    try {
      const { data } = await axios.get(api);
      // Send male picture with copy button
      await sendImageWithCopy(zk, chatId, data.male, ms);
      // Send female picture with copy button
      await sendImageWithCopy(zk, chatId, data.female, ms);
    } catch (e) {
      await sendError(zk, chatId, `Error: ${e.message}`, ms);
    }
  }
);