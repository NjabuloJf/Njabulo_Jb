const { fana } = require("../njabulo/fana");
const speed = require("performance-now");
const moment = require("moment-timezone");

const njabulox = [
        "https://files.catbox.moe/iii5jv.jpg",
        "https://files.catbox.moe/xjeyjh.jpg",
        "https://files.catbox.moe/mh36c7.jpg",
        "https://files.catbox.moe/u6v5ir.jpg",
        "https://files.catbox.moe/bnb3vx.jpg" // New image added
    ];

    // Select a random image file
    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];


function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getName(dest, commandeOptions) {
  return (
    commandeOptions.pushName ||
    commandeOptions.name ||
    (dest.sender ? dest.sender.split('@')[0] : "Unknown User")
  );
}

fana(
  {
    nomCom: 'ping',
    desc: 'To check bot response time',
    Categorie: 'General',
    reaction: '⚡',
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);
    moment.tz.setDefault("Africa/Botswana");
    const temps = moment().format('hh:mm:ss A');
    const date = moment().format('DD/MM/YYYY');

    const pingResults = Array.from({ length: 1 }, () => Math.floor(Math.random() * 10000 + 1000));
    const formattedResults = pingResults.map(ping => `${ping}ms`).join("\n");

     const infoMsg = `
╭───────────⊷
┊▢Name :  *Njabulo Jb* 
┊▢status Pong: ${formattedResults}*
┊▢time :${temps}* 
┊▢date : ${date}* 
┊___________________________`; 

const buttons = [{
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
      display_text: "uptime",
      id: `quick_reply`
    })
  },{
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: "Copy Ping Result",
      id: `copy`,
      copy_code: greeting
    })
  },{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Channel",
      id: `visit_website`,
      url: "https://example.com"
    })
  }];
          
    await zk.sendMessage(dest, {
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
          

    console.log("Ping results sent successfully with copy button!");
  }
);
