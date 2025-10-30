const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)

fana({ nomCom: "jb", categorie: "General" }, async (dest, zk, commandeOptions) => {
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
┊___________________________
┊  ①◦➛ᥣιst mᥱnᥙ
┊  ②◦➛ᥲι mᥱnᥙ
┊  ③◦➛gᥱnᥱrᥲᥣ mᥱnᥙ
┊  ④◦➛doᥕnᥣoᥲd mᥱnᥙ 
┊  ⑤◦➛ᥙsᥱ mᥱnᥙ
┊  ⑥◦➛mod mᥱnᥙ
┊  ⑦◦➛fᥙn mᥱnᥙ
┊  ⑧◦➛books mᥱnᥙ
┊  ⑨◦➛sᥱᥲᥴh mᥱnᥙ
┊  ⑩◦➛groᥙρ mᥱnᥙ
┊  ⑪◦➛ᥴontroᥣ mᥱnᥙ
┊___________________________
┊ʀᴇᴘʟʏ ʜɪ ᴡɪᴛʜ *ɴᴀᴍᴇ* ʟɪᴋᴇ *ᴀɪ-ᴍᴇɴᴜ*
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰──────────────────⊷`;

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

    try {
        const senderName = nomAuteurMessage || message.from;  
        const sentMsg = await zk.sendMessage(dest, {
            image: { url: randomNjabulourl },
            caption: infoMsg,
            contextInfo: {
                mentionedJid: [dest.sender || ""],
                externalAdReply: {
                    title: "📝messages menu cmd",
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
                    displayName: "njᥲbᥙᥣo",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

        await zk.sendMessage(dest, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mpeg',
            ptt: true, 
            contextInfo: {
                mentionedJid: [dest.sender || ""],
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
                    displayName: "njᥲbᥙᥣo",
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
                        await zk.sendMessage(dest, { text: "List Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "2":
                        await zk.sendMessage(dest, { text: "AI Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "3":
                        await zk.sendMessage(dest, { text: "General Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "4":
                        await zk.sendMessage(dest, { text: "Download Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "5":
                        await zk.sendMessage(dest, { text: "User Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "6":
                        await zk.sendMessage(dest, { text: "Mod Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "7":
                        await zk.sendMessage(dest, { text: "Fun Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "8":
                        await zk.sendMessage(dest, { text: "Books Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "9":
                        await zk.sendMessage(dest, { text: "Search Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    case "10":
                        await zk.sendMessage(dest, { text: "Group Menu" });
                        await zk.sendMessage(dest, { react: { text: "⬇️", key: receivedMsg.key } });
                        break;
                    default:
                        await zk.sendMessage(dest, { text: "Invalid option" });
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






/*const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)

fana({ nomCom: "jb", categorie: "General" }, async (dest, zk, commandeOptions) => {
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
┊___________________________
┊  1. ᥣιst mᥱnᥙ
┊  2. ᥲι mᥱnᥙ
┊  3. gᥱnᥱrᥲᥣ mᥱnᥙ
┊  4. doᥕnᥣoᥲd mᥱnᥙ 
┊  5. ᥙsᥱ mᥱnᥙ
┊  6. mod mᥱnᥙ
┊  7. fᥙn mᥱnᥙ
┊  8. books mᥱnᥙ
┊  9. sᥱᥲᥴh mᥱnᥙ
┊ 10. groᥙρ mᥱnᥙ
┊___________________________
┊ʀᴇᴘʟʏ ʜɪ ᴡɪᴛʜ *ɴᴀᴍᴇ* ʟɪᴋᴇ *ᴀɪ-ᴍᴇɴᴜ*
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰────────────────⊷`;

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

    try {
        const senderName = nomAuteurMessage || message.from;  
        const sentMsg = await zk.sendMessage(dest, {
            image: { url: randomNjabulourl },
            caption: infoMsg,
            contextInfo: {
                mentionedJid: [dest.sender || ""],
                externalAdReply: {
                    title: "📝messages menu cmd",
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
                    displayName: "njᥲbᥙᥣo",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

        await zk.sendMessage(dest, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mpeg',
            ptt: true, 
        });

        const handler = async (msgData) => {
            const receivedMsg = msgData.messages[0];
            if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

            const isReplyToMenu = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === sentMsg.key.id;
            
            if (isReplyToMenu) {
                const receivedText = receivedMsg.message.conversation || 
                                  receivedMsg.message.extendedTextMessage?.text;

                switch (receivedText) {
                    case "1":
                        await zk.sendMessage(dest, { text: "List Menu" });
                        break;
                    case "2":
                        await zk.sendMessage(dest, { text: "AI Menu" });
                        break;
                    case "3":
                        await zk.sendMessage(dest, { text: "General Menu" });
                        break;
                    case "4":
                        await zk.sendMessage(dest, { text: "Download Menu" });
                        break;
                    case "5":
                        await zk.sendMessage(dest, { text: "User Menu" });
                        break;
                    case "6":
                        await zk.sendMessage(dest, { text: "Mod Menu" });
                        break;
                    case "7":
                        await zk.sendMessage(dest, { text: "Fun Menu" });
                        break;
                    case "8":
                        await zk.sendMessage(dest, { text: "Books Menu" });
                        break;
                    case "9":
                        await zk.sendMessage(dest, { text: "Search Menu" });
                        break;
                    case "10":
                        await zk.sendMessage(dest, { text: "Group Menu" });
                        break;
                    default:
                        await zk.sendMessage(dest, { text: "Invalid option" });
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
});*/
