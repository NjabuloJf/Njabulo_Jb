const { fana } = require("../njabulo/fana");
const yts = require("yt-search");

fana({
  nomCom: "yts",
  aliases: ["ytsearch"],
  categorie: "Search",
  reaction: "🔍",
  description: "Search for YouTube videos."
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  try {
    if (!arg[0]) return repondre("Please provide a search query.");
    const searchQuery = arg.join(" ");
    await repondre(`🔍 Searching for "${searchQuery}"...`);
    const results = await yts(searchQuery);
    if (!results.videos.length) return repondre("No results found.");

    let resultText = `*YouTube Search Results for "${searchQuery}"*\n\n`;
    results.videos.slice(0, 5).forEach((video, index) => {
      resultText += `*${index + 1}.* ${video.title}\n`;
      resultText += `URL: ${video.url}\n\n`;
    });

    const video = results.videos[0];
    const img = video.thumbnail;

    await zk.sendMessage(dest, { 
      image: { url: img }, 
      caption: resultText,
    contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
         },
         forwardingScore: 999, // 
         externalAdReply: {
         title: video.title,
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: img,
         renderLargerThumbnail: false,
        },
        },
          }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "njᥲbᥙᥣo",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

    await zk.sendMessage(dest, { 
      image: { url: img }, 
      caption: ` 🎧Duration: ${video.duration}\n 🔎Views: ${video.views}\n 🔊Channel: ${video.author.name}\n *⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ↻*\n 0:00 ──〇─────── : ${video.duration}`,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
         },
         forwardingScore: 999, // 
         externalAdReply: {
         title: video.title,
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: img,
         renderLargerThumbnail: false,
        },
        },
          }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "njᥲbᥙᥣo",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });
      
      
      
  } catch (err) {
    console.error(err);
    repondre("An error occurred while searching for videos.");
  }
});






/*const { fana } = require("../njabulo/fana");
const yts = require("yt-search");

fana({
  nomCom: "yts",
  aliases: ["ytsearch"],
  categorie: "Search",
  reaction: "🔍",
  description: "Search for YouTube videos."
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  try {
    if (!arg[0]) return repondre("Please provide a search query.");

    const searchQuery = arg.join(" ");
    await repondre(`🔍 Searching for "${searchQuery}"...`);

    const results = await yts(searchQuery);

    if (!results.videos.length) return repondre("No results found.");

    let resultText = `*YouTube Search Results for "${searchQuery}"*\n\n`;
    results.videos.slice(0, 5).forEach((video, index) => {
      resultText += `*${index + 1}.* ${video.title}\n`;
      resultText += `URL: ${video.url}\n\n`;
    });

    const img = results.videos[0].thumbnail;

    await zk.sendMessage(dest, { 
      image: { 
        url: img 
      }, 
      caption: resultText
     }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "njᥲbᥙᥣo",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

   await zk.sendMessage(dest, { 
      image: { url: img },
     caption: `
🎧Duration: ${video.duration}
🔎Views: ${video.views}
🔊Channel: ${video.author.name}

*⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ↻*
0:00 ──〇─────── :  ${video.duration}*`,
        contextInfo: {
         externalAdReply: {
         title: video.title,
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: img,
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
                    displayName: "njᥲbᥙᥣo",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });
        
  } catch (err) {
    console.error(err);
    repondre("An error occurred while searching for videos.");
  }
});*/
