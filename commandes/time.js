const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");
const axios = require("axios");

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // keep the empty entry as in the original
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Base button definition (same as in the other modules) ─────
const baseButtons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Website",
      id: "backup channel",
      url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
    }),
  },
  {
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: "Copy",
      id: "copy",
      copy_code: "", // will be filled dynamically
    }),
  },
];

// ── Helper that sends an *interactive* message with image + buttons ─────
async function sendFormattedMessage(zk, chatId, text, ms) {
  // clone the button array so we can set the copy_code for this message
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy",
    id: "copy",
    copy_code: text, // copy the exact text that was sent
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
            title: "⏰ message timezones",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363399999197102@newsletter",
            newsletterName: "╭••➤®Njabulo Jb",
            serverMessageId: 143,
          },
          forwardingScore: 999,
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

// ── .timezone command ─────────────────────────────────────────────
fana(
  {
    nomCom: "timezone",
    aliases: ["timee", "datee"],
    desc: "Check the current local time and date for a specified timezone.",
    categorie: "Mods",
    reaction: "🕰️",
  },
  async (dest, zk, context) => {
    const { repondre, arg, ms } = context;
    const timezone = arg[0];

    if (!timezone)
      return await sendFormattedMessage(
        zk,
        dest,
        "❌ Please provide a timezone code. Example: .timezone TZ",
        ms
      );

    try {
      const now = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: timezone,
      };

      const timeOptions = {
        ...options,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const localTime = now.toLocaleTimeString("en-US", options);
      const localDate = now.toLocaleDateString("en-US", timeOptions);

      await sendFormattedMessage(
        zk,
        dest,
        `🕰️ *Current Local Time:* ${localTime}\n📅 *Current Date:* ${localDate}`,
        ms
      );
    } catch (e) {
      console.error("Error in .timezone command:", e);
      await sendFormattedMessage(
        zk,
        dest,
        "❌ An error occurred. Please try again later.",
        ms
      );
    }
  }
);

// ── .color command ─────────────────────────────────────────────
fana(
  {
    nomCom: "color",
    aliases: ["rcolor", "colorcode"],
    desc: "Generate a random color with name and code.",
    categorie: "Mods",
    reaction: "🤦",
  },
  async (dest, zk, context) => {
    const { repondre, ms } = context;

    try {
      const colorNames = [
        "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink",
        "Brown", "Black", "White", "Gray", "Cyan", "Magenta", "Violet",
        "Indigo", "Teal", "Lavender", "Turquoise",
      ];

      const randomColorHex =
        "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
      const randomColorName =
        colorNames[Math.floor(Math.random() * colorNames.length)];

      await sendFormattedMessage(
        zk,
        dest,
        `🎨 *Random Color:* \nName: ${randomColorName}\nCode: ${randomColorHex}`,
        ms
      );
    } catch (e) {
      console.error("Error in .color command:", e);
      await sendFormattedMessage(
        zk,
        dest,
        "❌ An error occurred while generating the random color.",
        ms
      );
    }
  }
);

// ── .timenow command ─────────────────────────────────────────────
fana(
  {
    nomCom: "timenow",
    aliases: ["currenttime", "time"],
    desc: "Check the current local time.",
    categorie: "Mods",
    reaction: "🕰️",
  },
  async (dest, zk, context) => {
    const { repondre, ms } = context;

    try {
      const now = new Date();
      const localTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: conf.TIMEZONE,
      });

      await sendFormattedMessage(
        zk,
        dest,
        `🕒 Current Local Time: ${localTime}`,
        ms
      );
    } catch (e) {
      console.error("Error in .timenow command:", e);
      await sendFormattedMessage(
        zk,
        dest,
        "❌ An error occurred. Please try again later.",
        ms
      );
    }