const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const { fana } = require("../njabulo/fana");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const fs = require("fs-extra");
const config = require("../set");
const ffmpeg = require("fluent-ffmpeg");
const { Catbox } = require("node-catbox");

const catbox = new Catbox();

// ── Button definition (same as in the other modules) ─────
const buttons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹",
      id: "backup channel",
      url: config.GURL
    }),
  },
  {
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: "Copy",
      id: "copy",
      copy_code: "",          // will be filled dynamically
    }),
  },
];

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // (empty string kept as in original)
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Helper that sends an interactive message with image + buttons ─────
// `copyCode` is the text that will be copied when the user presses the “Copy” button.
async function sendFormattedMessage(zk, chatId, text, ms, copyCode = text) {
  // clone the button array so we can set the copy_code dynamically
  const copyButtons = JSON.parse(JSON.stringify(buttons));
  copyButtons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy",
    id: "copy",
    copy_code: copyCode,
  });

  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: randomNjabulourl },
        header: text,
        buttons: copyButtons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "💓ᥕᥱᥣᥴomᥱ fᥲmιᥣყ ",
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
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`,
          },
        },
      },
    }
  );
}

// ── Catbox upload helper ─────────────────────────────────────────────
async function uploadToCatbox(Path) {
  if (!fs.existsSync(Path)) {
    throw new Error("File does not exist");
  }

  try {
    const response = await catbox.uploadFile({ path: Path });
    if (response) {
      return response; // the URL string
    } else {
      throw new Error("Error retrieving the file link");
    }
  } catch (err) {
    throw new Error(String(err));
  }
}

// ── Convert audio to MP3 ─────────────────────────────────────────────
async function convertToMp3(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat("mp3")
      .on("error", (err) => reject(err))
      .on("end", () => resolve(outputPath))
      .save(outputPath);
  });
}

// ── Command: .url ─────────────────────────────────────────────
fana(
  {
    nomCom: "url",
    categorie: "General",
    reaction: "👨🏿‍💻",
  },
  async (chatId, zk, commandeOptions) => {
    const { msgRepondu, repondre, ms } = commandeOptions;

    if (!msgRepondu) {
      sendFormattedMessage(zk, chatId, "Please reply to an image, video, or audio file.", ms);
      return;
    }

    let mediaPath, mediaType;

    if (msgRepondu.videoMessage) {
      const videoSize = msgRepondu.videoMessage.fileLength;
      if (videoSize > 50 * 1024 * 1024) {
        sendFormattedMessage(zk, chatId, "The video is too long. Please send a smaller video.", ms);
        return;
      }
      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
      mediaType = "video";
    } else if (msgRepondu.imageMessage) {
      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
      mediaType = "image";
    } else if (msgRepondu.audioMessage) {
      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
      mediaType = "audio";

      const outputPath = `${mediaPath}.mp3`;
      try {
        await convertToMp3(mediaPath, outputPath);
        fs.unlinkSync(mediaPath);
        mediaPath = outputPath;
      } catch (error) {
        console.error("Error converting audio to MP3:", error);
        sendFormattedMessage(zk, chatId, "Failed to process the audio file.", ms);
        return;
      }
    } else {
      sendFormattedMessage(zk, chatId, "Unsupported media type. Reply with an image, video, or audio file.", ms);
      return;
    }

    try {
      const catboxUrl = await uploadToCatbox(mediaPath);
      fs.unlinkSync(mediaPath);

      const replyText = `Media Uploaded Successfully ✅\nMedia Link: \n\nurl: ${catboxUrl}\n\nSize: 0.26 MB\n> Pσɯҽɾԃ Ⴆყ ɳʝαႦυʅσ ʝႦ`;
      // Pass the URL as the *copyCode* so the “Copy” button copies only the link
      sendFormattedMessage(zk, chatId, replyText, ms, catboxUrl);
    } catch (error) {
      console.error("Error while creating your URL:", error);
      sendFormattedMessage(zk, chatId, "Oops, an error occurred.", ms);
    }
  }
);
