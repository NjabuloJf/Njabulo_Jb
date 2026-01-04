const { fana } = require("../njabulo/fana");
const config = require("../set");
const moment = require("moment-timezone");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

fana({
  nomCom: "m",
  alias: ["help", "cmds"],
  categorie: "General",
  reaction: "📚",
  use: ".menu",
}, async (dest, zk, commandeOptions) => {
  console.log('Command triggered!');
  const { repondre, ms } = commandeOptions;

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

