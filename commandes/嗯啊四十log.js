// ── Imports ───────────────────────────────────────────────────────
const { fana } = require("../njabulo/fana");
const axios = require("axios");
const { writeFile } = require("fs/promises");

// ── Random image for error messages ─────────────────────────────────
const njabulox = [
  "",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Base button definition (URL + Copy) ─────────────────────────────
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
      copy_code: "", // filled dynamically
    }),
  },
];

// ── Helper: send an image with a “Copy URL” button ─────
async function sendImageWithCopy(zk, chatId, imageUrl, ms) {
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy URL",
    id: "copy",
    copy_code: imageUrl,
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

// ── Helper for simple error messages ─────
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

// ── Logo commands (fana) ─────────────────────────────────────────────

// Hacker
fana(
  { nomCom: "hacker", categorie: "Logo", reaction: "👨🏿‍💻" },
  async (chatId, zk, { arg, ms, repondre }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `*Exemple :* ${prefixe}hacker Rahmani`, ms);
      return;
    }
    try {
      repondre("*processing...*");
      const anu = await mumaker.ephoto("", arg);
      await sendImageWithCopy(zk, chatId, anu.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Dragonball
fana(
  { nomCom: "dragonball", categorie: "Logo", reaction: "🐉" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `*_EXEMPLE *:  ${prefixe}dragonball Fredi`, ms);
      return;
    }
    try {
      repondre("*processing...*");
      const img = await mumaker.ephoto("https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, img.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Naruto
fana(
  { nomCom: "naruto", categorie: "Logo", reaction: "⛩" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `*Exemple : * ${prefixe}naruto Rahmani`, ms);
      return;
    }
    try {
      repondre("*processing...*");
      const img = await mumaker.ephoto("https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, img.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Didong
fana(
  { nomCom: "didong", categorie: "Logo", reaction: "📱" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `*exemple :* ${prefixe}didong Fredie`, ms);
      return;
    }
    try {
      repondre("*processing...*");
      const img = await mumaker.ephoto("https://ephoto360.com/tao-anh-che-vui-tu-choi-cuoc-goi-voi-ten-cua-ban-930.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, img.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Wall
fana(
  { nomCom: "wall", categorie: "Logo", reaction: "👍" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}wall Rahmani_Md`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/break-wall-text-effect-871.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Summer
fana(
  { nomCom: "summer", categorie: "Logo", reaction: "🌞" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}summer My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/create-sunset-light-text-effects-online-for-free-1124.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Neonlight
fana(
  { nomCom: "neonlight", categorie: "Logo", reaction: "💡" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}neonlight My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html", arg);
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Greenneon
fana(
  { nomCom: "greenneon", categorie: "Logo", reaction: "🟢" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}greenneon My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/green-neon-text-effect-874.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Glitch
fana(
  { nomCom: "glitch", categorie: "Logo", reaction: "🎛️" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}glitch My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Devil
fana(
  { nomCom: "devil", categorie: "Logo", reaction: "😈" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}devil My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html", arg);
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Boom
fana(
  { nomCom: "boom", categorie: "Logo", reaction: "💥" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `  Exemple :* ${prefixe}boom Rahmani`, ms);
      return;
    }
    try {
      repondre("*processing...*");
      const img = await mumaker.ephoto("https://en.ephoto360.com/boom-text-comic-style-text-effect-675.html", arg);
      await sendImageWithCopy(zk, chatId, img.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Water
fana(
  { nomCom: "water", categorie: "Logo", reaction: "💦" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `${prefixe}water Rahmani`, ms);
      return;
    }
    try {
      repondre("*processing...*");
      const img = await mumaker.ephoto("https://en.ephoto360.com/create-water-effect-text-online-295.html", arg);
      await sendImageWithCopy(zk, chatId, img.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Snow
fana(
  { nomCom: "snow", categorie: "Logo", reaction: "❄️" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}Snow My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/create-beautiful-3d-snow-text-effect-online-1101.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Transformer
fana(
  { nomCom: "transformer", categorie: "Logo", reaction: "🤖" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}Transformer My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/create-a-transformer-text-effect-online-1035.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Thunder
fana(
  { nomCom: "thunder", categorie: "Logo", reaction: "⚡" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}Thunder My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Harry Potter
fana(
  { nomCom: "harrypotter", categorie: "Logo", reaction: "🧙‍♂️" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}HarryPotter My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/create-harry-potter-text-effect-online-1025.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Cat (Foggy Window)
fana(
  { nomCom: "cat", categorie: "Logo", reaction: "🪟" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}FoggyWindow My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/write-text-on-foggy-window-online-free-1015.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// White Gold
fana(
  { nomCom: "whitegold", categorie: "Logo", reaction: "💫" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}WhiteGold My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/elegant-white-gold-3d-text-effect-online-free-1070.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Light Glow
fana(
  { nomCom: "lightglow", categorie: "Logo", reaction: "🌟" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}LightGlow My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Thor
fana(
  { nomCom: "thor", categorie: "Logo", reaction: "🔨" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}Thor My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/create-thor-logo-style-text-effect-online-1064.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Neon
fana(
  { nomCom: "neon", categorie: "Logo", reaction: "💡" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `Exemple of using commande:\n ${prefixe}Neon My text`, ms);
      return;
    }
    try {
      const data = await mumaker.textpro("https://textpro.me/neon-text-effect-online-879.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, data.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Purple
fana(
  { nomCom: "purple", categorie: "Logo", reaction: "🧳" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `${prefixe}purple zokou`, ms);
      return;
    }
    try {
      const img = await mumaker.ephoto("https://en.ephoto360.com/purple-text-effect-online-100.html", arg);
      await sendImageWithCopy(zk, chatId, img.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Gold
fana(
  { nomCom: "gold", categorie: "Logo", reaction: "🧚🏿‍♀️" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `${prefixe}gold Zokou-MD`, ms);
      return;
    }
    try {
      const img = await mumaker.ephoto("https://en.ephoto360.com/modern-gold-4-213.html", arg);
      await sendImageWithCopy(zk, chatId, img.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Arena
fana(
  { nomCom: "arena", categorie: "Logo", reaction: "🥵" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `${prefixe}arena Zokou-MD`, ms);
      return;
    }
    try {
      const img = await mumaker.ephoto("https://en.ephoto360.com/create-cover-arena-of-valor-by-mastering-360.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, img.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Incandescent
fana(
  { nomCom: "incandescent", categorie: "Logo", reaction: "😋" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `${prefixe}incandescent Zokou-MD`, ms);
      return;
    }
    try {
      const img = await mumaker.ephoto("https://en.ephoto360.com/text-effects-incandescent-bulbs-219.html", arg.join(" "));
      await sendImageWithCopy(zk, chatId, img.image, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);

// Gif×1
fana(
  { nomCom: "gif×1", categorie: "Logo", reaction: "😋" },
  async (chatId, zk, { arg, ms, repondre, prefixe }) => {
    if (!arg?.length) {
      await sendError(zk, chatId, `${prefixe}gif×1 Thomas-MD`, ms);
      return;
    }
    try {
      const text = arg.join(" ");
      const url = `https://api.caliph.biz.id/api/kaneki?nama=${encodeURIComponent(text)}&apikey=caliphkey`;
      // Assuming mumaker.sendFile returns the image URL; adjust if needed
      const img = await mumaker.sendFile(m.chat, url, 'logo.png', '✅ Result', m);
      await sendImageWithCopy(zk, chatId, img, ms);
    } catch (e) {
      await sendError(zk, chatId, `🥵 ${e.message}`, ms);
    }
  }
);