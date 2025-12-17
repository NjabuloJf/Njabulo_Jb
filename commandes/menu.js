const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)


// Random quotes array
const quotes = [
    "Dream big, work hard.",
    "Stay humble, hustle hard.",
    "Believe in yourself.",
    "Success is earned, not given.",
    "Actions speak louder than words.",
    "The best is yet to come.",
    "Keep pushing forward.",
    "Do more than just exist.",
    "Progress, not perfection.",
    "Stay positive, work hard.",
    "Be the change you seek.",
    "Never stop learning.",
    "Chase your dreams.",
    "Be your own hero.",
    "Life is what you make of it.",
    "Do it with passion or not at all.",
    "You are stronger than you think.",
    "Create your own path.",
    "Make today count.",
    "Embrace the journey.",
    "The best way out is always through.",
    "Strive for progress, not perfection.",
    "Don't wish for it, work for it.",
    "Live, laugh, love.",
    "Keep going, you're getting there.",
    "Don’t stop until you’re proud.",
    "Success is a journey, not a destination.",
    "Take the risk or lose the chance.",
    "It’s never too late.",
    "Believe you can and you're halfway there.",
    "Small steps lead to big changes.",
    "Happiness depends on ourselves.",
    "Take chances, make mistakes.",
    "Be a voice, not an echo.",
    "The sky is the limit.",
    "You miss 100% of the shots you don’t take.",
    "Start where you are, use what you have.",
    "The future belongs to those who believe.",
    "Don’t count the days, make the days count.",
    "Success is not the key to happiness. Happiness is the key to success."
];

// Function to get a random quote
const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};


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

    const { totalUsers } = await fetchGitHubStats();
    const formattedTotalUsers = totalUsers.toLocaleString();

    const randomQuote = getRandomQuote();

    const controlMenuu = `
    .ᴄʜᴀᴛ
② .ɴᴊᴀʙᴜʟᴏ
③ .ɢᴘᴛ
④ .ɢᴇᴍɪɴɪ
⑤ .ɪʟᴀᴍᴀ

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

ᴍᴏᴅs
① .ʙʟᴏᴄᴋ
② .ᴜɴʙʟᴏᴄᴋ
③ .ʟᴇғᴛ

ʜᴇʀᴏᴋᴜ-ᴄʟɪᴇɴᴛ
① .ᴘᴍ-ᴘᴇʀᴍɪᴛ
② .ᴀᴜᴛᴏʟɪᴋᴇsᴛᴀᴛᴜs
③ .ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ
④ .ᴀᴜᴛᴏʀᴇᴄᴏʀᴅ
⑤ .ᴀᴜᴛᴏᴛʏᴘɪɴɢ
⑥ .ᴘʀɪᴠᴀᴛᴇᴍᴏᴅᴇ
⑦ .ᴘᴜʙʟɪᴄᴍᴏᴅᴇ

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

sᴇᴀʀᴄʜ
① .ʟʏʀɪᴄs
② .sᴛɪᴄᴋᴇʀsᴇᴀʀᴄʜ
③ .ʏᴛs
④ .ᴘʟᴀʏ 
⑤ .ᴠɪᴅᴇᴏ 
⑥ .ɪᴍᴀɢᴇ
⑦ .ɪᴍɢ 
⑧ .ғʙ 

ᴜsᴇ
① .ᴛʀᴛ
② .ғᴀɴᴄʏ
③ .ʜᴀᴄᴋ 

ᴡᴇᴇʙ
① .ᴡᴀɪғᴜ
② .ɴᴇᴋᴏ
③ .sʜɪɴᴏʙᴜ
④ .ᴍᴇɢᴜᴍɪɴ
⑤ .ᴄᴏsᴘʟᴀʏ
⑥ .ᴄᴏᴜᴘʟᴇᴘᴘ
`;

    

    let infoMsg = `
    ╭─⃝──────────⊷
*┊ ┊ ┊ ┊ ┊* 
*┊ ┊ ✫ ˚㋛ ⋆｡ ❀* 
*┊ ☪︎⋆*
*⊹*    🪔 *𝐌𝐄𝐍𝐔*
*✧* 「hᥲᥣᥣo *${greeting}* 」

*┊* ✧ _*commandes*_
┊ ──¬¬¬¬¦
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ!*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]%*
┊▢modᥱ : *${mode}*
┊▢Total CMD  ${cm.length}
┊ ──¬¬¬¬¬¦
┊ *®ʀᴇᴘʟʏ* ᴡɪᴛʜ ɴᴜᴍʙᴇʀ *① ᴛᴏ ⑩*
┊ *©ʀᴇᴘʟʏ* ᴡɪᴛʜ ɴᴀᴍᴇ ʟɪᴋᴇ *ᴀɪ-ᴍᴇɴᴜ? *
╰┬──────────⊷⳹
┌┤ *${randomQuote}*
┊╰────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────⊷`;

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

    await zk.sendMessage(dest, { 
            text: controlMenuu, 
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
const controlMenu = `╭───────────⊷
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊___________________________
┊  *【 CONTROL MENU】⇳︎*
┊  ①◦➛ᥲᥙtostᥲtᥙsᥲvᥱ      
┊  ②◦➛ᥲntιdᥱᥣᥱtᥱ    
┊  ③◦➛ᥲᥙtostᥲtᥙsvιᥱᥕ                    
┊  ④◦➛ᥲᥙtorᥱᥲᥴt          
┊  ⑤◦➛ᥲntιᥴᥲᥣᥣ              
┊  ⑥◦➛modᥱρrιvᥲtᥱ            
┊  ⑦◦➛ᥲᥣᥕᥲყsonᥣιnᥱ               
┊  ⑧◦➛ᥲᥙtotყριng              
┊  ⑨◦➛ᥲᥙtorᥱᥴordιng              
┊  ⑩◦➛modᥱρᥙbᥣιᥴ              
┊___________________________
┊ ᥴontroᥣ mᥱnᥙ ᥴommᥲnds ᥲvᥲιᥣᥲbᥣᥱ 
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;
             await zk.sendMessage(dest, { 
            image: { url: randomNjabulourl }, 
            caption: controlMenu, 
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
const aiMenu = `╭───────────⊷
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊___________________________
┊  *【 AI MENU】⇳︎*
┊  ①◦➛ᥴhᥲt           
┊  ②◦➛njᥲbᥙᥣo          
┊  ③◦➛gρt                    
┊  ④◦➛gᥱmιnι            
┊  ⑤◦➛ιᥣᥲmᥲ               
┊  ⑥◦➛mᥱtᥲ                
┊  ⑦◦➛ᥲι                      
┊  ⑧◦➛gρtᥴhᥲt               
┊  ⑨◦➛ᥴhᥲtbot               
┊  ⑩◦➛mᥱtᥲ-ᥲι               
┊  ⑪◦➛fᥲnᥲ                   
┊  ⑫◦➛Jb  
┊  ⑬◦➛sᥴhooᥣ 
┊  ⑭◦➛ᥴᥲᥣᥴᥙᥣᥲtor 
┊___________________________
┊AI. mᥱnᥙ ᥴommᥲnds ᥲvᥲιᥣᥲbᥣᥱ 
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;
          await zk.sendMessage(dest, { 
              image: { url: randomNjabulourl }, 
              caption: aiMenu, 
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
const generalMenu = `╭───────────⊷
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊___________________________
┊  *【Gᥱnᥱrᥲᥣ】*
┊  ①◦➛ᥲᥣιvᥱ                   
┊  ②◦➛tᥱst                     
┊  ③◦➛hᥱᥣρ                    
┊  ④◦➛mᥱnᥙ                 
┊  ⑤◦➛obfᥙsᥴᥲtᥱ               
┊  ⑥◦➛oᥕnᥱr                  
┊  ⑦◦➛ριng                    
┊  ⑧◦➛rᥱρo                     
┊  ⑨◦➛ᥙρdᥲtᥱ               
┊  ⑩◦➛ᥙρtιmᥱ               
┊  ⑪◦➛ᥙrᥣ                           
┊  ⑫◦➛ᥴodᥱ            
┊___________________________
┊gᥱnᥱrᥲᥣ mᥱnᥙ ᥴommᥲnds ᥲvᥲιᥣᥲbᥣᥱ       
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;
        await zk.sendMessage(dest, {
            image: { url: randomNjabulourl }, 
            caption: generalMenu, 
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
const downloadMenu = `╭───────────⊷
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊___________________________
┊  *【Doᥕnᥣoᥲd mᥱnᥙ】*
┊  ①◦➛ᥲρk                
┊  ②◦➛ρᥣᥲყstorᥱ               
┊  ③◦➛mᥱdιᥲfιrᥱ              
┊  ④◦➛gιtᥴᥣonᥱ                
┊  ⑤◦➛fb                           
┊  ⑥◦➛ιnstᥲgrᥲm            
┊  ⑦◦➛fᥲᥴᥱbook              
┊  ⑧◦➛tιktok                     
┊  ⑨◦➛ᥣιtᥱ                          
┊  ⑩◦➛ρᥣᥲყ                        
┊  ⑪◦➛vιdᥱo                    
┊  ⑫◦➛vιdᥱodoᥴ                
┊  ⑬◦➛ᥲᥙdιo-voιᥴᥱ          
┊  ⑭◦➛ρᥣᥲყdoᥴ                
┊  ⑮◦➛ყts                        
┊  ⑯◦➛ყtmρ3                   
┊  ⑰◦➛ყtmρ4                 
┊  ⑱◦➛ᥲᥙdιo                    
┊  ⑲◦➛ιmg                      
┊  ⑳◦➛ιmᥲgᥱ                 
┊  ①◦➛ρhotᥱ                    
┊  ②◦➛gᥲᥣᥲxყ                  
┊  ③◦➛ᥣყrιᥴs                       
┊  ④◦➛ᥣყrιᥴs-voιᥴᥱ           
┊  ⑤◦➛vιdᥱofb                   
┊  ①◦➛vιdᥱoTιkTok           
┊  ②◦➛vιdᥱoYoᥙTᥙbᥱ       
┊  ③◦➛vιdᥱoxxx               
┊  ④◦➛vιdρorn                   
┊  ⑤◦➛vιdᥱosᥱx                 
┊___________________________
┊ doᥕnᥣoᥲd mᥱnᥙ ᥴommᥲnds ᥲvᥲιᥣᥲbᥣᥱ 
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;
        await zk.sendMessage(dest, { 
            image: { url: randomNjabulourl }, 
            caption: downloadMenu, 
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
const useMenu = `╭───────────⊷
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊___________________________
┊  *【Usᥱ】⇳︎*
┊  ①◦➛bᥣoᥴkᥣιst    
┊  ②◦➛fᥙᥣᥣρρ        
┊  ③◦➛bᥲngroᥙρ   
┊  ④◦➛sᥲvᥱ        
┊  ⑤◦➛ρrofιᥣᥱ.       
┊  ⑥◦➛ρrofιᥣᥱ2.      
┊  ⑦◦➛stιᥴkᥱr.       
┊  ⑧◦➛vv        
┊  ⑨◦➛nᥱᥕ           
┊  ⑩◦➛tᥱmρmᥲιᥣᥱ 
┊___________________________
┊ᥙsᥱ mᥱnᥙ ᥴommᥲnds ᥲvᥲιᥣᥲbᥣᥱ 
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;
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
const modsMenu = `╭───────────⊷
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊___________________________
┊  *【Mods】⇳︎*
┊  ①◦➛dᥲtᥱ               
┊  ③◦➛hᥲᥴk                   
┊  ④◦➛bᥣoᥴk                  
┊  ⑤◦➛ᥙnbᥣoᥴk             
┊  ⑥◦➛trt                   
┊  ⑦◦➛ᥣᥱft                    
┊  ⑧◦➛tιmᥱ                 
┊  ⑨◦➛ᥣᥱᥲvᥱ                 
┊  ⑩◦➛dᥱᥱρ                 
┊  ⑪◦➛bᥲss                     
┊  ⑫◦➛rᥱvᥱrsᥱ              
┊  ⑬◦➛sᥣoᥕ                    
┊  ⑭◦➛smooth             
┊  ⑮◦➛tᥱmρo                 
┊  ⑯◦➛nιghtᥴorᥱ             
┊___________________________
┊mod mᥱnᥙ ᥴommᥲnds ᥲvᥲιᥣᥲbᥣᥱ       
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;
         await zk.sendMessage(dest, { 
             image: { url: randomNjabulourl }, 
             caption: modsMenu, 
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
const funMenu = `╭───────────⊷
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊___________________________
┊  *【Fᥙn】*
┊  ①◦➛hᥲρρι               
┊  ②◦➛hᥱᥲrt                 
┊  ③◦➛ᥲngrყ                   
┊  ④◦➛sᥲd                    
┊  ⑤◦➛shყ                    
┊  ⑥◦➛moon                 
┊  ⑦◦➛nιkᥲᥣ                  
┊  ⑧◦➛hᥲnd                  
┊  ⑨◦➛ᥲdvιᥴᥱ               
┊  ⑩◦➛trιvιᥲ                    
┊  ⑪◦➛qᥙᥱstιon              
┊  ⑫◦➛trᥙth                     
┊  ⑬◦➛dᥲrᥱ                    
┊  ⑭◦➛ᥲmoᥙntqᥙιz         
┊  ⑮◦➛fᥲnᥴყ                   
┊  ⑯◦➛bᥙᥣᥣყ                    
┊  ⑰◦➛ᥴᥙddᥣᥱ                 
┊  ⑱◦➛ᥴrყ                       
┊  ⑲◦➛hᥙg                      
┊  ⑳◦➛ᥲᥕoo                   
┊  ①◦➛kιss                     
┊  ②◦➛ᥣιᥴk                     
┊  ③◦➛ρᥲt                   
┊  ④◦➛smᥙg               
┊  ⑤◦➛bonk                    
┊  ⑥◦➛ყᥱᥱt                  
┊  ⑦◦➛bᥣᥙsh                  
┊  ⑧◦➛smιᥣᥱ                
┊  ⑨◦➛ᥕᥲvᥱ                 
┊  ⑩◦➛hιghfιvᥱ              
┊  ⑪◦➛hᥲndhoᥣd            
┊  ⑫◦➛nom                    
┊  ⑬◦➛bιtᥱ                    
┊  ⑭◦➛gᥣomρ               
┊  ⑮◦➛sᥣᥲρ                  
┊  ⑯◦➛kιᥣᥣ                   
┊  ⑰◦➛kιᥴk                 
┊  ⑱◦➛hᥲρρყ                
┊  ⑲◦➛ᥕιnk                
┊  ⑳◦➛ρokᥱ                
┊  ①◦➛dᥲnᥴᥱ                
┊  ②◦➛ᥴrιngᥱ
┊___________________________
┊fᥙn mᥱnᥙ ᥴommᥲnds ᥲvᥲιᥣᥲbᥣᥱ               
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;
        await zk.sendMessage(dest, { 
            image: { url: randomNjabulourl }, 
            caption: funMenu,
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
                    case "8":
    const booksMenu = `╭───────────⊷
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊___________________________
┊  *【 BOOKS MENU】⇳︎*
┊  ①◦➛njᥲbᥙᥣo        
┊  ②◦➛ᥕιkιρᥱdιᥲ     
┊  ③◦➛ᥱᥣᥱmᥱnts                    
┊  ④◦➛bιbᥣᥱι            
┊  ⑤◦➛sᥙrᥲh               
┊  ⑥◦ᥴoᥣor               
┊  ⑦◦➛ᥲgrιᥴᥙᥣtᥙrᥱ                  
┊  ⑧◦➛ᥴontᥱnt               
┊  ⑨◦➛ᥱngᥣιsh               
┊  ⑩◦➛hoᥣᥣbook               
┊  ⑪◦➛ᥣᥲngᥙᥲgᥱ                 
┊  ⑫◦➛1-10
┊  ⑬◦➛A-Z
┊  ⑭◦➛tᥱᥲᥴhᥱr
┊  ⑮ᥲnsᥕᥱr
┊  ⑯ᥴoᥙntrყ
┊  ⑰ᥕoᥣd
┊___________________________
┊books mᥱnᥙ ᥴommᥲnds ᥲvᥲιᥣᥲbᥣᥱ 
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;

    await zk.sendMessage(dest, {
        image: { url: randomNjabulourl }, 
        caption: booksMenu, 
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
                    case "9":
                        await zk.sendMessage(dest, { text: "Search Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "10":
const groupMenu = `╭───────────⊷
┊▢nᥲmᥱ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┊▢ρrᥱfιx :  *[ ${s.PREFIXE} ]*
┊▢modᥱ : *${mode}*
┊▢dᥲtᥱ : *${date}*
┊___________________________
┊  *【Groᥙρ】*
┊  ①◦➛rᥱmovᥱᥲᥣᥣ         
┊  ②◦➛tᥲgᥲᥣᥣ               
┊  ③◦➛ᥕᥱᥣᥴomᥱ     
┊  ④◦➛goodbყᥱ         
┊  ⑤◦➛ᥲdd                  
┊  ⑥◦➛ᥲρρrovᥱ           
┊  ⑦◦➛vᥴᥲd             
┊  ⑧◦➛ιnvιtᥱ            
┊  ⑨◦➛ᥣιnk               
┊  ⑩◦➛ρromotᥱ         
┊  ⑪◦➛dᥱmotᥱ           
┊  ⑫◦➛rᥱmovᥱ            
┊  ⑬◦➛dᥱᥣ             
┊  ⑭◦➛rᥙᥣᥱs              
┊  ⑮◦➛dᥱᥣᥣιnk            
┊  ⑯◦➛dᥱᥣᥣιnk             
┊  ⑰◦➛hιdᥱtᥲg        
┊___________________________
┊groᥙρ mᥱnᥙ ᥴommᥲnds ᥲvᥲιᥣᥲbᥣᥱ       
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;
        await zk.sendMessage(dest, { 
            image: { url: randomNjabulourl }, 
            caption: groupMenu, 
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



