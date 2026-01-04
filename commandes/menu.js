const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');



fana({ nomCom: "menu1", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo/fana");
    let coms = {};
    let mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

  moment.tz.setDefault("Africa/Dar Es Salam");
    const currentTime = moment();
    const formattedTime = currentTime.format("HH:mm:ss");
    const formattedDate = currentTime.format("DD/MM/YYYY");
    const currentHour = currentTime.hour();

    const greetings = ["Good Morning 🌄", "Good Afternoon 🌃", "Good Evening ⛅", "Good Night 🌙"];
    const greeting = currentHour < 12 ? greetings[0] : currentHour < 17 ? greetings[1] : currentHour < 21 ? greetings[2] : greetings[3];

    const { totalUsers } = await fetchGitHubStats();
    const formattedTotalUsers = totalUsers.toLocaleString();

  try { 
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

    const start = new Date().getTime(); 
    await zk.sendPresenceUpdate('composing', dest); 
    const end = new Date().getTime(); 
    const responseTime = (end - start) / 1000; 
    const cards = [ 
      { 
        header: { 
          title: `📊 Uptime`, 
          hasMediaAttachment: true, 
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage, 
        }, 
        body: { 
          text: `⏳`, 
        }, 
        footer: { 
          text: "", 
        }, 
        nativeFlowMessage: { 
          buttons: [ 
            { 
              "buttonId": "uptime-btn",
              "buttonText": {"displayText": "𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹" },
              "type": 1,
            }, 
          ], 
        }, 
      }, 
      { 
        header: { 
          title: `📊 Ping`, 
          hasMediaAttachment: true, 
          imageMessage: (await generateWAMessageContent({ image: { url: randomNjabulourl } }, { upload: zk.waUploadToServer })).imageMessage, 
        }, 
        body: { 
          text: `⏳`, 
        }, 
        footer: { 
          text: "", 
        }, 
        nativeFlowMessage: { 
          buttons: [ 
            { 
              "buttonId": "uptime-btn",
              "buttonText": {"displayText": "𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹" },
              "type": 1,
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
              header: { 
                text: `🔍 System Info` 
              }, 
              body: { 
                text: `*📂 sʏsᴛᴇᴍs ʟᴏᴀᴅɪɴɢ*` 
              }, 
              carouselMessage: { 
                cards 
              }, 
            }, 
          }, 
        }, 
      }, 
      { 
        quoted: { 
          key: { 
            fromMe: false, 
            participant: `0@s.whatsapp.net`, 
            remoteJid: "status@broadcast" 
          }, 
          message: { 
            contactMessage: { 
              displayName: "ɳʝαႦυʅσ ʝႦ", 
              vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD` 
            } 
          } 
        } 
      } 
    ); 
    await zk.relayMessage(dest, message.message, { messageId: message.key.id }); 
  } catch (e) { 
    console.error("Error in menu command:", e); 
    repondre(`An error occurred: ${e.message}`); 
  } 
});

