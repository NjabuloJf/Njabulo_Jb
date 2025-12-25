

const { fana } = require("../njabulo/fana");
const config = require("../set");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const axios = require('axios');

fana({
  nomCom: "ro",
  alias: ["repository"],
  categorie: "General",
  reaction: "⭐",
  use: ".repo",
}, async (dest, zk, commandeOptions) => {
  console.log('Command triggered!');
  const { repondre, ms } = commandeOptions;
  try {
    const repo = 'NjabuloJ/Njabulo-Jb';
    const response = await axios.get(`https://api.github.com/repos/${repo}`);
    const data = response.data;
    const created = new Date(data.created_at).toLocaleDateString();
    const updated = new Date(data.updated_at).toLocaleDateString();
    const license = data.license ? data.license.name : 'Not specified';

    const njabulox = [
      "https://files.catbox.moe/mh36c7.jpg",
      "https://files.catbox.moe/bnb3vx.jpg"
    ];

    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
    if (!randomNjabulourl) {
      console.error("Error: No image URL found.");
      repondre("An error occurred: No image URL found.");
      return;
    }

    const cards = [
      {
        header: {
          title: `📊 Repository Info`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
Njabulo-md is a WhatsApp bot created by Njabulo
📅 Created : ${created}
🔄 Updated : ${updated}
          `,
        },
        footer: {
          text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on GitHub",
                url: `https://github.com/${repo}`,
              }),
            },
          ],
        },
      },
      {
        header: {
          title: `📊 Stats`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: `
⭐ Stars : ${data.stargazers_count}
🍴 Forks : ${data.forks_count}
          `,
        },
        footer: {
          text: "Pσɯҽɾ Ⴆყ Ɲנαвυʟσ Jbᯤ",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 View on GitHub",
                url: `https://github.com/${repo}`,
              }),
            },
          ],
        },
      },
    ];

    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: {
              header: { text: `🔍 System Info` },
              body: { text: `*📂 Found 2 results*` },
              carouselMessage: { cards },
            },
          },
        },
      },
      { quoted: ms }
    );
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    console.error("Error in repo command:", e);
    repondre(`An error occurred: ${e.message}`);
  }
});


