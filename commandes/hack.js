const { fana } = require("../njabulo/fana");
const config = require("../set");

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // keep the empty entry if you want a chance of no image
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Standard button set (used by all modules) ────────────────────────
const baseButtons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹",
      id: "backup channel",
      url: config.GURL
    }),
  },
];

// ── Helper that sends an *interactive* message with image + buttons ─────
async function sendFormattedMessage(zk, chatId, text, ms) {
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy",
    id: "copy",
    copy_code: text,
  });

  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: randomNjabulourl },
        header: text,
        buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "⚠️ Hack Prank",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
        },
      },
    },
    {
      quoted: {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
        },
        message: {
          contactMessage: {
            displayName: "njᥲbᥙᥣo",
            conversation: 'bot',
          },
        },
      },
    }
  );
}

// ── Hack command ─────────────────────────────────────────────
fana(
  {
    nomCom: "hack",
    categorie: "Fun",
    reaction: "⚠️",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;

    try {
      const hackMsgs = [
        "```⚡ *Njabulo Jb*  Injecting malware⚡```",
        "```🔐 *Njabulo Jb*  into device \n 0%```",
        "```♻️ transfering photos \n █ 10%```",
        "```♻️ transfer successful \n █ █ 20%```",
        "```♻️ transfering videos \n █ █ █ 30%```",
        "```♻️ transfer successful \n █ █ █ █ 40%```",
        "```♻️ transfering audio \n █ █ █ █ █ 50%```",
        "```♻️ transfer successful \n █ █ █ █ █ █ 60%```",
        "```♻️ transfering hidden files \n █ █ █ █ █ █ █ 70%```",
        "```♻️ transfer successful \n █ █ █ █ █ █ █ █ 80%```",
        "```♻️ transfering whatsapp chat \n █ █ █ █ █ █ █ █ █ 90%```",
        "```♻️ transfer successful \n █ █ █ █ █ █ █ █ █ █ 100%```",
        "```📲 System hyjacking on process.. \n Conecting to Server```",
        "```🔌 Device successfully connected... \n Recieving data...```",
        "```💡 Data hyjacked from divice 100% completed \n killing all evidence killing all malwares...```",
        "```🔋 HACKING COMPLETED```",
        "```📤 SENDING PHONE DOCUMENTS```",
      ];

      for (const msg of hackMsgs) {
        await repondre(msg);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      await repondre("```🗂️ ALL FILES TRANSFERRED```");

      const countdown = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"];
      for (const num of countdown) {
        await repondre("```❇️ SUCCESSFULLY SENT DATA AND Connection disconnected 📤```");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      await repondre("😏 *VICTIM SYSTEM DEMOLISHED!* 🤔");

      // Final interactive message with buttons
      sendFormattedMessage(zk, dest, "⚠️ Hack prank complete!", ms);
    } catch (err) {
      console.error("Critical error in prank script:", err);
      return await repondre("_😊 A critical error occurred during the prank 🤗_");
    }
  }
);
