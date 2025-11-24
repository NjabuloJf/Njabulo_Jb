const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');
const moment = require("moment-timezone");

fana({
  nomCom: "play",
  aliases: ["song", "playdoc", "audio", "mp3"],
  categorie: "download",
  reaction: "🎸"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    zk.sendMessage(dest, {
      interactiveMessage: {
        header: "YouTube download",
        title: `*Sᥱᥲrᥴhιng for ყoᥙr song♫* `,
        buttons: [
          {
           name: "cta_url",
          buttonParamsJson: JSON.stringify({
          display_text: "Visit Channel",
          id: `backup channel`,
          url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u" 
            }),
          },
        ],
      },
    }, {
      quoted: {
        key: {
          fromMe: false,
          participant: `0@s.whatsapp.net`,
          remoteJid: "status@broadcast"
        },
        message: {
          contactMessage: {
            displayName: "Njᥲbᥙᥣo",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
          }
        }
      }
    });
    
    console.log('Searching for song...');

    if (!arg) {
      console.log('No argument provided');
      return zk.sendMessage(dest, {
        text: 'Please provide a song name or keyword.',
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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
    }

    console.log('Argument provided:', arg);
    const query = arg.join(' ');
    console.log('Query:', query);

    console.log('[PLAY] Searching YT for:', query);
    const search = await ytSearch(query);
    console.log('Search result:', search);

    if (!search || !search.videos || !search.videos[0]) {
      console.log('No video found');
      return zk.sendMessage(dest, { 
        text: 'No results found for your query.',
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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
    }

    const video = search.videos[0];
    console.log('Video found:', video);

    const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
    const fileName = `${safeTitle}.mp3`;
    const apiURL = `https://noobs-api.top/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp3`;

    console.log('API URL:', apiURL);
    try {
      const response = await axios.get(apiURL);
      if (response.status !== 200) {
        console.log('API request failed with status code:', response.status);
        await zk.sendMessage(dest, { 
          text: 'Failed to retrieve the MP3 download link. Please try again later.',
          contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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
        return;
      }
      const data = response.data;
      if (!data.downloadLink) {
        console.log('No download link found');
        return zk.sendMessage(dest, { 
          text: 'Failed to retrieve the MP3 download link.',
          contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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
      }
     
      moment.tz.setDefault("Africa/Botswana");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Generate greeting based on time of day
    const hour = moment().hour();
    let greeting = "Good Mornιng";
    if (hour >= 12 && hour < 18) {
        greeting = "Good ᥲftᥱrnnon!";
    } else if (hour >= 18) {
        greeting = "Good Evᥱrnιng!";
    } else if (hour >= 22 || hour < 5) {
        greeting = "Good Nιght";
    }
      
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
      copy_code: greeting
    })
    }];
        
        const playsong = ` 🎧title: *${video.title}*
🎼views: *${video.views.toLocaleString()}*
🎻 uploaded: *${video.ago}*

*⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ↻*
0:00 ──〇─────── :  *${video.timestamp}*`;
       


     await zk.sendMessage(dest, {
    interactiveMessage: {
      image: { url: video.thumbnail }, 
      header: playsong,
      buttons: buttons,
      headerType: 1,
      contextInfo: {
        mentionedJid: [dest.sender || ""],
        externalAdReply: {
          title: video.title, 
          mediaType: 1,
          previewType: 0,
          thumbnailUrl: video.thumbnail, 
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

      console.log('Message sent with image and caption');

      await zk.sendMessage(dest, {
        audio: { url: data.downloadLink },
        mimetype: 'audio/mpeg',
        fileName,
       contextInfo: {
         externalAdReply: {
         title: " ⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ↻ ",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: video.thumbnail,
         renderLargerThumbnail: true,
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
      console.log('Audio file sent');
    } catch (err) {
      console.error('[PLAY] API Error:', err);
      if (err.response && err.response.status === 500) {
        await zk.sendMessage(dest, { 
          text: 'The API is currently experiencing issues. Please try again later.',
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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
      } else {
        await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
      }
    }
  } catch (err) {
    console.error('[PLAY] Error:', err);
    await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
  }
});
 
