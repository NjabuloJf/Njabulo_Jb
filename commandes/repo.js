// ── Imports ───────────────────────────────────────────────────────
const { fana } = require("../njabulo/fana");
const axios = require("axios");
const moment = require("moment");

// ── Random header image ─────────────────────────────────────────────
const njabulox = [
  "https://files.catbox.moe/iii5jv.jpg",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg"
];
const randomNjabulourl = () => njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Base buttons (URL + Copy) ───────────────────────────────────────
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

// ── Helper: send image + copy button ─────────────────────────────────
async function sendRepoCard(zk, chatId, imgUrl, headerText, bodyText, copyText, ms) {
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy Info",
    id: "copy",
    copy_code: copyText
  });

  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: imgUrl },
        header: headerText,
        body: bodyText,
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

// ── Main repo command ───────────────────────────────────────────────
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
      const { data } = await axios.get("https://api.github.com/repos/NjabuloAI/Njabulo-Jb");

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

      await sendRepoCard(
        zk,
        dest,
        randomNjabulourl(),
        "📦 Repo Info",
        repoInfo,
        repoInfo,   // <-- copy button now contains the full repoInfo
        ms
      );
    } catch (e) {
      console.error("❌ Repo fetch error:", e);
      await repondre("❌ Couldn't fetch repo data. Try again later.");
    }
  }
);
