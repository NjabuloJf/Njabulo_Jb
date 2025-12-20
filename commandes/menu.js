const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)

fana({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo//fana");
    var coms = {};
    var mode = "ρᥙbᥣιᥴ";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "ρrιvᥲtᥱ";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Botswana");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    const hour = moment().hour();
    let greeting = "Good Mornιng";
    if (hour >= 12 && hour < 18) {
        greeting = "Good ᥲftᥱrnnon!";
    } else if (hour >= 18) {
        greeting = "Good Evᥱrnιng!";
    } else if (hour >= 22 || hour < 5) {
        greeting = "Good Nιght";
    }

    let infoMsg = `╭───────────⊷
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊____________________
┊  ①◦➛ᥴontroᥣ mᥱnᥙ
┊  ②◦➛ᥲι mᥱnᥙ
┊  ③◦➛gᥱnᥱrᥲᥣ mᥱnᥙ
┊  ④◦➛doᥕnᥣoᥲd mᥱnᥙ 
┊  ⑤◦➛ᥙsᥱ mᥱnᥙ
┊  ⑥◦➛anime
┊  ⑦◦➛groᥙρ mᥱnᥙ 
┊____________________
┊ *ʀᴇᴘʟʏ* ᴡɪᴛʜ ɴᴜᴍʙᴇʀ *① ᴛᴏ ⑩*
┊ *ʀᴇᴘʟʏ* ᴡɪᴛʜ ɴᴀᴍᴇ ʟɪᴋᴇ *ᴀɪ-ᴍᴇɴᴜ*
╰┬─────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰───────────────⊷`;

    const njabulox = [
        "",
        "https://files.catbox.moe/xjeyjh.jpg",
        "https://files.catbox.moe/mh36c7.jpg",
        "https://files.catbox.moe/u6v5ir.jpg",
        "https://files.catbox.moe/bnb3vx.jpg" 
    ];

    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

    const audioUrls = [
        "https://files.catbox.moe/6x0rb7.mp3",
        "https://files.catbox.moe/uz4apw.mp3",
        "https://files.catbox.moe/cup6rc.mp3" 
    ];

    const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];


    const button = [
      {
        "buttonId":  `.menu`,
        "buttonText": { "displayText": "Avaliable" },
        "type": 1
      },
      {
        "buttonId":  `.list`,
        "buttonText": { "displayText": "Options action" },
        "type": 1
      }
    ];
    
    
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

try {
  const senderName = nomAuteurMessage || message.from;
  const sentMsg = await zk.sendMessage(dest, {
    interactiveMessage: {
      image: { url: randomNjabulourl },
      header: infoMsg,
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

          // Send the audio as a voice note
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

        const handler = async (msgData) => {
            const receivedMsg = msgData.messages[0];
            if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

            const isReplyToMenu = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === sentMsg.key.id;
            
            if (isReplyToMenu) {
                const receivedText = receivedMsg.message.conversation || 
                                  receivedMsg.message.extendedTextMessage?.text;

                switch (receivedText) {
                    case "1":
const controlMenu = `
ʜᴇʀᴏᴋᴜ-ᴄʟɪᴇɴᴛ
① .ᴘᴍ-ᴘᴇʀᴍɪᴛ
② .ᴀᴜᴛᴏʟɪᴋᴇsᴛᴀᴛᴜs
③ .ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ
④ .ᴀᴜᴛᴏʀᴇᴄᴏʀᴅ
⑤ .ᴀᴜᴛᴏᴛʏᴘɪɴɢ
⑥ .ᴘʀɪᴠᴀᴛᴇᴍᴏᴅᴇ
⑦ .ᴘᴜʙʟɪᴄᴍᴏᴅᴇ
`;
             await zk.sendMessage(dest, { 
            text: controlMenu, 
            buttons: button,
            headerType: 1,
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
         await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "2":
const aiMenu = `
    .ᴄʜᴀᴛ
② .ɴᴊᴀʙᴜʟᴏ
③ .ɢᴘᴛ
④ .ɢᴇᴍɪɴɪ
⑤ .ɪʟᴀᴍᴀ
`;
          await zk.sendMessage(dest, { 
              text: aiMenu, 
            buttons: button,
            headerType: 1,
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
         await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "3":
const generalMenu = `
ɢᴇɴᴇʀᴀʟ
① .ɢᴇᴛᴘᴘ
② .ʀᴇᴘᴏ
③ .ᴍᴇɴᴜ
④ .ᴍᴇɴᴀ
⑤ .ᴏʙᴛ
⑥ .ᴏᴡɴᴇʀ
⑦ .ᴘɪ
⑧ .ᴘɪɴɢ
⑨ .sʜᴀᴢᴀᴍ
⑩ .ᴜᴘᴛɪᴍᴇ
⑪ .ᴜʀʟ
① .ᴘᴀɪʀ 
`;
        await zk.sendMessage(dest, {
            text: generalMenu, 
            buttons: button,
            headerType: 1, 
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
        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "4":
const downloadMenu = `
sᴇᴀʀᴄʜ
① .ʟʏʀɪᴄs
② .sᴛɪᴄᴋᴇʀsᴇᴀʀᴄʜ
③ .ʏᴛs
④ .ᴘʟᴀʏ 
⑤ .ᴠɪᴅᴇᴏ 
⑥ .ɪᴍᴀɢᴇ
⑦ .ɪᴍɢ 
⑧ .ғʙ 
`;
        await zk.sendMessage(dest, { 
            text: downloadMenu, 
            buttons: button,
            headerType: 1,
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
        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "5":
const useMenu = `
ᴜsᴇ
① .ᴛʀᴛ
② .ғᴀɴᴄʏ
③ .ʜᴀᴄᴋ 
④ .ʙʟᴏᴄᴋ
⑤ .ᴜɴʙʟᴏᴄᴋ
⑥ .ʟᴇғᴛ
`;
       await zk.sendMessage(dest, { 
           image: { url: randomNjabulourl }, 
           caption: useMenu, 
            buttons: button,
            headerType: 1,
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
        

         await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "6":
const funMenu = `
ᴡᴇᴇʙ
① .ᴡᴀɪғᴜ
② .ɴᴇᴋᴏ
③ .sʜɪɴᴏʙᴜ
④ .ᴍᴇɢᴜᴍɪɴ
⑤ .ᴄᴏsᴘʟᴀʏ
⑥ .ᴄᴏᴜᴘʟᴇᴘᴘ
`;
        await zk.sendMessage(dest, { 
            text: funMenu,
            buttons: button,
            headerType: 1,
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
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "7":
const groupMenu = `
ɢʀᴏᴜᴘ
① .ᴀɴᴛɪʟɪɴᴋ
② .ᴀᴘᴘʀᴏᴠᴇ
③ .ᴅᴇʟ
④ .ᴘʀᴏᴍᴏᴛᴇ
⑤ .ᴅᴇᴍᴏᴛᴇ
⑥ .ɢʀᴏᴜᴘ
⑦ .ʜɪᴅᴇᴛᴀɢ
⑧ .ʟɪɴᴋ
⑨ .ᴋɪᴄᴋᴀʟʟ
⑩ .ᴛᴀɢᴀʟʟ
⑪ .ᴡᴇʟᴄᴏᴍᴇ
⑫ .ɢᴏᴏᴅʙʏᴇ
⑬ .ᴀɴᴛɪᴘʀᴏᴍᴏᴛᴇ
⑭ .ᴀɴᴛɪᴅᴇᴍᴏᴛᴇ
`;
        await zk.sendMessage(dest, { 
            text: groupMenu, 
             buttons: button,
            headerType: 1,
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
       await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
         break;
        default:
      const error = `Hყ Invᥲᥣιd oρtιon  *ᥣᥲst nᥙmbᥱr 10*`;
        await zk.sendMessage(dest, { 
       image: { url: randomNjabulourl }, 
        caption: error , 
         buttons: button,
         headerType: 1,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
         },
         forwardingScore: 999, // 
         externalAdReply: {
         title: "🚫 message  Invᥲᥣιd oρtιon",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: randomNjabulourl,
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
               await zk.sendMessage(dest, { react: { text: "❌", key: receivedMsg.key } });
                }
            }
        };

        zk.ev.on("messages.upsert", handler);

        setTimeout(() => {
            zk.ev.off("messages.upsert", handler);
        }, 300000);

    } catch (error) {
        console.error("Menu error: ", error);
        repondre(" error: " + error);
    }
});



