const { fana } = require("../njabulo/fana");
const s = require("../set");
const fs = require("fs");
const Heroku = require("heroku-client");

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // (empty string kept as in original)
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Base button definition (same as in other modules) ─────
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

// ── Helper that sends an interactive message with image + buttons ─────
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
            title: "👥message settings owner control",
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

// ── Helper to get description from app.json (unused in this snippet) ─────
function getDescriptionFromEnv(varName) {
  try {
    const filePath = "./app.json";
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const config = JSON.parse(fileContent);
    return config.env[varName]?.description || "The environment variable description was not found.";
  } catch (error) {
    console.error("Error reading app.json:", error);
    return "Error reading app.json";
  }
}

// ── Private mode command ─────────────────────────────────────────────
fana(
  { nomCom: "privatemode", categorie: "Control" },
  async (chatId, zk, context) => {
    const { ms, superUser, auteurMessage, arg } = context;

    if (!superUser) {
      return sendFormattedMessage(
        zk,
        chatId,
        "```you error 🚫 only owner```",
        ms
      );
    }

    if (!arg[0]) {
      return sendFormattedMessage(
        zk,
        chatId,
        'Instructions:\n\nType "privatemode yes" to enable or "privatemode no" to disable.',
        ms
      );
    }

    const option = arg.join(" ").toLowerCase();
    let responseMessage;

    switch (option) {
      case "yes":
        s.MODE = "yes";
        responseMessage = "Private mode has been enabled successfully.";
        break;
      case "no":
        s.MODE = "no";
        responseMessage = "Private mode has been disabled successfully.";
        break;
      default:
        return sendFormattedMessage(
          zk,
          chatId,
          "Please don't invent an option. Type 'privatemode yes' or 'privatemode no'.",
          ms
        );
    }

    try {
      await sendFormattedMessage(zk, chatId, responseMessage, ms);
    } catch (error) {
      console.error("Error processing your request:", error);
      await sendFormattedMessage(
        zk,
        chatId,
        "Error processing your request.",
        ms
      );
    }
  }
);

// ── Public mode command ─────────────────────────────────────────────
fana(
  { nomCom: "publicmode", categorie: "Control" },
  async (chatId, zk, context) => {
    const { ms, superUser, auteurMessage, arg } = context;

    if (!superUser) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*This command is restricted to the bot owner or Queen-M owner.* ",
        ms
      );
    }

    if (!arg[0]) {
      return sendFormattedMessage(
        zk,
        chatId,
        'Instructions:\n\nType "publicmode yes" to enable or "publicmode no" to disable.',
        ms
      );
    }

    const option = arg.join(" ").toLowerCase();
    let responseMessage;

    switch (option) {
      case "yes":
        s.MODE = "yes";
        responseMessage = "*Public mode has been enabled successfully.*";
        break;
      case "no":
        s.MODE = "no";
        responseMessage = "*Public mode has been disabled successfully.*";
        break;
      default:
        return sendFormattedMessage(
          zk,
          chatId,
          "Please don't invent an option. Type 'publicmode yes' or 'publicmode no'.",
          ms
        );
    }

    try {
      await sendFormattedMessage(zk, chatId, responseMessage, ms);
    } catch (error) {
      console.error("Error processing your request:", error);
      await zk.sendMessage(
        chatId,
        { text: "Error processing your request." },
        { quoted: ms }
      );
    }
  }
);

// ── PM-PERMIT command ─────────────────────────────────────────────
fana(
  { nomCom: "pm-permit", categorie: "HEROKU-CLIENT" },
  async (chatId, zk, context) => {
    const { ms, superUser, auteurMessage, arg } = context;

    if (!superUser) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*This command is restricted to the bot owner or Queen-M owner.* ",
        ms
      );
    }

    if (!arg[0]) {
      return sendFormattedMessage(
        zk,
        chatId,
        'Instructions:\n\nType "pm-permit yes" to enable or "pm-permit no" to disable.',
        ms
      );
    }

    const option = arg.join(" ").toLowerCase();
    let responseMessage;

    switch (option) {
      case "yes":
        s.PM_PERMIT = "yes";
        responseMessage = "*PM-PERMIT has been enabled successfully.*";
        break;
      case "no":
        s.PM_PERMIT = "no";
        responseMessage = "*PM-PERMIT has been disabled successfully.*";
        break;
      default:
        return sendFormattedMessage(
          zk,
          chatId,
          "Please don't invent an option. Type 'pm-permit yes' or 'pm-permit no'.",
          ms
        );
    }

    try {
      await sendFormattedMessage(zk, chatId, responseMessage, ms);
    } catch (error) {
      console.error("Error processing your request:", error);
      await zk.sendMessage(
        chatId,
        { text: "Error processing your request." },
        { quoted: ms }
      );
    }
  }
);

// ── Auto like status command ─────────────────────────────────────────────
fana(
  { nomCom: "autolikestatus", categorie: "HEROKU-CLIENT" },
  async (chatId, zk, context) => {
    const { ms, repondre, superUser, auteurMessage, arg } = context;

    if (!superUser) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*This command is restricted to the bot owner or Queen-M owner.* ",
        ms
      );
    }

    if (!arg[0]) {
      return sendFormattedMessage(
        zk,
        chatId,
        'Instructions:\n\nType "autolikestatus yes" to enable or "autolikestatus no" to disable.',
        ms
      );
    }

    const option = arg.join(" ").toLowerCase();
    let responseMessage;

    switch (option) {
      case "yes":
        s.AUTO_LIKE_STATUS = "yes";
        responseMessage = "*Auto like status has been enabled successfully.*";
        break;
      case "no":
        s.AUTO_LIKE_STATUS = "no";
        responseMessage = "*Auto like status has been disabled successfully.*";
        break;
      default:
        return sendFormattedMessage(
          zk,
          chatId,
          "Please don't invent an option. Type 'autolikestatus yes' or 'autolikestatus no'.",
          ms
        );
    }

    try {
      await sendFormattedMessage(zk, chatId, responseMessage, ms);
    } catch (error) {
      console.error("Error processing your request:", error);
      await zk.sendMessage(
        chatId,
        { text: "Error processing your request." },
        { quoted: ms }
      );
    }
  }
);

// ── Always online command ─────────────────────────────────────────────
fana(
  { nomCom: "alwaysonline", categorie: "HEROKU-CLIENT" },
  async (chatId, zk, context) => {
    const { ms, repondre, superUser, auteurMessage, arg } = context;

    if (!superUser) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*This command is restricted to the bot owner or Queen-M owner.* ",
        ms
      );
    }

    if (!arg[0]) {
      return sendFormattedMessage(
        zk,
        chatId,
        'Instructions:\n\nType "alwaysonline yes" to enable or "alwaysonline no" to disable.',
        ms
      );
    }

    const option = arg.join(" ").toLowerCase();
    let responseMessage;

    switch (option) {
      case "yes":
        s.ETAT = "online";
        responseMessage = "*Always online has been enabled successfully.*";
        break;
      case "no":
        s.ETAT = "offline";
        responseMessage = "*Always online has been disabled successfully.*";
        break;
      default:
        return sendFormattedMessage(
          zk,
          chatId,
          "Please don't invent an option. Type 'alwaysonline yes' or 'alwaysonline no'.",
          ms
        );
    }

    try {
      await sendFormattedMessage(zk, chatId, responseMessage, ms);
    } catch (error) {
      console.error("Error processing your request:", error);
      await zk.sendMessage(
        chatId,
        { text: "Error processing your request." },
        { quoted: ms }
      );
    }
  }
);

// ── Auto record command ─────────────────────────────────────────────
fana(
  { nomCom: "autorecord", categorie: "HEROKU-CLIENT" },
  async (chatId, zk, context) => {
    const { ms, repondre, superUser, auteurMessage, arg } = context;

    if (!superUser) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*This command is restricted to the bot owner or Queen-M owner.* ",
        ms
      );
    }

    if (!arg[0]) {
      return sendFormattedMessage(
        zk,
        chatId,
        'Instructions:\n\nType "autorecord yes" to enable or "autorecord no" to disable.',
        ms
      );
    }

    const option = arg.join(" ").toLowerCase();
    let responseMessage;

    switch (option) {
      case "yes":
        s.AUTORECORD = "yes";
        responseMessage = "*Auto record has been enabled successfully.*";
        break;
      case "no":
        s.AUTORECORD = "no";
        responseMessage = "*Auto record has been disabled successfully.*";
        break;
      default:
        return sendFormattedMessage(
          zk,
          chatId,
          "Please don't invent an option. Type 'autorecord yes' or 'autorecord no'.",
          ms
        );
    }

    try {
      await sendFormattedMessage(zk, chatId, responseMessage, ms);
    } catch (error) {
      console.error("Error processing your request:", error);
      await zk.sendMessage(
        chatId,
        { text: "Error processing your request." },
        { quoted: ms }
      );
    }
  }
);

// ── Auto typing command ─────────────────────────────────────────────
fana(
  { nomCom: "autotyping", categorie: "HEROKU-CLIENT" },
  async (chatId, zk, context) => {
    const { ms, repondre, superUser, auteurMessage, arg } = context;

    if (!superUser) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*This command is restricted to the bot owner or Queen-M owner.* ",
        ms
      );
    }

    if (!arg[0]) {
      return sendFormattedMessage(
        zk,
        chatId,
        'Instructions:\n\nType "autotyping yes" to enable or "autotyping no" to disable.',
        ms
      );
    }

    const option = arg.join(" ").toLowerCase();
    let responseMessage;

    switch (option) {
      case "yes":
        s.AUTOTYPING = "yes";
        responseMessage = "*Auto typing has been enabled successfully.*";
        break;
      case "no":
        s.AUTOTYPING = "no";
        responseMessage = "*Auto typing has been disabled successfully.*";
        break;
      default:
        return sendFormattedMessage(
          zk,
          chatId,
          "Please don't invent an option. Type 'autotyping yes' or 'autotyping no'.",
          ms
        );
    }

    try {
      await sendFormattedMessage(zk, chatId, responseMessage, ms);
    } catch (error) {
      console.error("Error processing your request:", error);
      await zk.sendMessage(
        chatId,
        { text: "Error processing your request." },
        { quoted: ms }
      );
    }
  }
);