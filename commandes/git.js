"use strict";
const { fana } = require("../njabulo/fana");
const axios = require("axios");
const moment = require("moment");

// List of image URLs
const njabulox = [
  "",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg" // New image added
];

fana(
  { nomCom: "repo", categorie: "General", reaction: "🧃", nomFichier: __filename },
  async (dest, zk, commandeOptions) => {
    const { pushname, repondre } = commandeOptions;
    const contactName = commandeOptions?.ms?.pushName || "Unknown Contact";

    try {
      const { data } = await axios.get("https://api.github.com/repos/NjabuloJ/Njabulo-Jb");

      const created = moment(data.created_at).format("DD/MM/YYYY");
      const updated = moment(data.updated_at).format("DD/MM/YYYY");
      const license = data.license?.name ?? "None";
      const language = data.language ?? "Not specified";

      
      // Pick a random image
      const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

      const gitdata = `
📅 Created : ${created}
🔄 Updated : ${updated}
👤 Owner   : ${data.owner.login}
⭐ Stars   : ${data.stargazers_count}
🍴 Forks   : ${data.forks_count}
📚 License : ${license}
🛠️ Language: ${language}
🌐 URL     : ${data.html_url}

👋 Hey ${contactName}, give it a star if you like it!`;



      

      const card = {
        header: {
          title: `📸 Created : ${created}\n🔄 Updated : ${updated}\n👤 Owner   : ${data.owner.login}\n⭐ Stars   : ${data.stargazers_count}\n🍴 Forks   : ${data.forks_count}\n📚 License : ${license}\n🛠️ Language: ${language}\n🌐 URL     : ${data.html_url}\n👋 Hey ${contactName}, give it a star if you like it!go`,`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: ` 📅 Created : ${created}\n🔄 Updated : ${updated}\n👤 Owner   : ${data.owner.login}\n⭐ Stars   : ${data.stargazers_count}\n🍴 Forks   : ${data.forks_count}\n📚 License : ${license}\n🛠️ Language: ${language}\n🌐 URL     : ${data.html_url}\n👋 Hey ${contactName}, give it a star if you like it!go`,
        },
        footer: {
          text: "🔹 Play song",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on YouTube",
                url: `https://youtu.com`,
              }),
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Link",
                copy_code: 'hallo'
              }),
            },
          ],
        },
      };

      const message = generateWAMessageFromContent(
        dest,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
              interactiveMessage: {
                body: { text: `🔍 Search Results for: ` },
                footer: { text: `📂 Found 1 result` },
                carouselMessage: { cards: [card] },
              },
            },
          },
        },
        { quoted: ms }
      );

      await zk.relayMessage(dest, message.message, { messageId: message.key.id });

    } catch (e) {
      console.log("Error fetching data:", e);
      repondre("❌ Error fetching repository data. Please try again later.");
    }
  }
); 
