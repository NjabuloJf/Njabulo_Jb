// ── Imports ───────────────────────────────────────────────────────
const { fana } = require("../njabulo/fana");
const s = require("../set");
const fs = require("fs");
const acrcloud = require("acrcloud");

// ── Random image for the header ─────────────────────────────────
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
      display_text: "Copy",
      id: "copy",
      copy_code: "", // filled dynamically
    }),
  },
];

// ── Helper: send interactive message with image + buttons ─────
async function sendFormattedMessage(zk, chatId, text, ms) {
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
        header: text,
        buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "👥 message settings owner control",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
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
    {
      quoted: {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
        },
        message: {
          contactMessage: {
            displayName: "njᥲbᥙᥣo",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`,
          },
        },
      },
    }
  );
}

// ── Shazam command ─────────────────────────────────────────────
fana(
  {
    nomCom: "shazam",
    categorie: "General",
    reaction: "🤦",
  },
  async (chatId, zk, context) => {
    const { msgRepondu, repondre, arg, ms } = context;

    // Must be audio or video
    if (!/audio|video/.test(msgRepondu.mimetype)) {
      return repondre("⁉️Please send a valid audio or video file for analysis.");
    }

    try {
      const media = await msgRepondu.download();

      const acr = new acrcloud({
        host: "identify-ap-southeast-1.acrcloud.com",
        access_key: "26afd4eec96b0f5e5ab16a7e6e05ab37",
        access_secret: "wXOZIqdMNZmaHJP1YDWVyeQLg579uK2CfY6hWMN8",
      });

      const { status, metadata } = await acr.identify(media);
      if (status.code !== 0) return repondre(status.msg);

      const { title, artists, album, genres, release_date } = metadata.music[0];
      let txt = `Title: ${title}\n`;
      if (artists) txt += `Artists: ${artists.map(v => v.name).join(", ")}\n`;
      if (album) txt += `Album: ${album.name}\n`;
      if (genres) txt += `Genres: ${genres.map(v => v.name).join(", ")}\n`;
      if (release_date) txt += `Release Date: ${release_date}`;

      await sendFormattedMessage(zk, chatId, txt.trim(), ms);
    } catch (e) {
      console.error("🚫 Shazam error:", e);
      await repondre("❌Sorry, I couldn't recognize the song.");
    }
  }
);