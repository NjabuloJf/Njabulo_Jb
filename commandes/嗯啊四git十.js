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

      const buttons = [{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Website",
      id: `backup channel`,
      url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u" 
    })
  },{
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: "Messaging online",
      id: `copy`,
      copy_code: data.html_url 
    })
    }];

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

await zk.sendMessage(dest, {
    interactiveMessage: {
      image: { url: randomNjabulourl },
      header: gitdata,
      buttons: buttons,
      headerType: 1,
      contextInfo: {
        mentionedJid: [dest.sender || ""],
        externalAdReply: {
          title: "📝messages menu cmd",
          mediaType: 1,
          previewType: 0,
          thumbnailUrl: randomNjabulourl,
          sourceUrl: "https://www.instagram.com/njabulojb871", // added URL
          renderLargerThumbnail: false,
        }
      }
    }
  }, {
    quoted: {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "🟢online njᥲbᥙᥣo🍥",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
        }
      }
    }
  });


      const audioUrl = "https://files.catbox.moe/4ufunx.mp3";
            
        await zk.sendMessage(dest, {
            audio: { url: audioUrl },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: {
                externalAdReply: {
                    title: "📝messages menu song",
                    mediaType: 1,
                    previewType: 0,
                    thumbnailUrl: randomNjabulourl,
                    sourceUrl: "https://www.instagram.com/njabulojb871",
                    renderLargerThumbnail: false,
                }
            }
        }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "🟢online njᥲbᥙᥣo🍥",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

    } catch (e) {
      console.log("Error fetching data:", e);
      repondre("❌ Error fetching repository data. Please try again later.");
    }
  }
); 
