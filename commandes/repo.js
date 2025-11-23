// ── Imports ───────────────────────────────────────────────────────
const { fana } = require("../njabulo/fana");
const axios = require("axios");
const moment = require("moment");

// ── Random header image list ─────────────────────────────────────
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];
const randomNjabulourl = () => njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Base button definition (URL + Copy) ─────────────────────────────
const baseButtons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Repo",
      id: "repo_url",
      url: "https://github.com/NjabuloAI/Njabulo-Jb"
    })
  },
  {
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: "Copy Info",
      id: "copy",
      copy_code: "" // filled dynamically
    })
  }
];

// ── Helper: send an image with a “Copy” button ─────
async function sendImageWithCopy(zk, chatId, imgUrl, text, ms) {
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy Info",
    id: "copy",
    copy_code: text
  });

  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: imgUrl },
        header: "📦 Repo Info",
        body: text,
        buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "Njabulo Jb – Repository",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: imgUrl,
            renderLargerThumbnail: false
          }
        }
      }
    },
    { quoted: ms }
  );
}

// ── Helper: send an audio file as a voice note ─────
async function sendVoiceNote(zk, chatId, audioUrl, ms) {
  await zk.sendMessage(
    chatId,
    {
      audio: { url: audioUrl },
      mimetype: "audio/mp4",
      ptt: true               // true = voice note
    },
    { quoted: ms }
  );
}

// ── Repo command ─────────────────────────────────────────────
fana(
  {
    nomCom: "repo",
    categorie: "General",
    reaction: "🧃",
    nomFichier: __filename
  },
  async (dest, zk, { pushname, repondre, ms }) => {
    const contactName = ms?.pushName || "Unknown";

    try {
      const { data } = await axios.get("https://api.github.com/repos/NjabuloJ/Njabulo-Jb");

      const created = moment(data.created_at).format("DD/MM/YYYY");
      const updated = moment(data.updated_at).format("DD/MM/YYYY");
      const license = data.license?.name ?? "None";
      const language = data.language ?? "Not specified";

      const repoInfo = `
📅 Created : ${created}
🔄 Updated : ${updated}
👤 Owner   : ${data.owner.login}
⭐ Stars   : ${data.stargazers_count}
🍴 Forks   : ${data.forks_count}
📚 License : ${license}
🛠️ Language: ${language}
🌐 URL     : ${data.html_url}

👋 Hey ${contactName}, give it a star if you like it!
`.trim();

      await sendImageWithCopy(zk, dest, randomNjabulourl(), repoInfo, ms);
    } catch (e) {
      console.error("❌ Repo fetch error:", e);
      await repondre("❌ Couldn't fetch repo data. Try again later.");
    }
  }
);

// ── Voice‑note command ─────────────────────────────────────────────
fana(
  {
    nomCom: "voice",
    categorie: "General",
    reaction: "🔊"
  },
  async (dest, zk, { arg, repondre, ms }) => {
    if (!arg?.length) {
      return repondre("⚠️ Provide an audio URL or local path after the command.");
    }

    const audioUrl = arg[0];
    try {
      await sendVoiceNote(zk, dest, audioUrl, ms);
    } catch (e) {
      console.error("❌ Voice note error:", e);
      await repondre("❌ Failed to send the voice note.");
    }
  }
); 
