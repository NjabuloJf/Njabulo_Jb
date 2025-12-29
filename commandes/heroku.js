
const { fana } = require("../njabulo/fana");
const s = require("../set");
const fs = require('fs');
const Heroku = require('heroku-client');

const njabulox = [
  "", // (empty string kept as in original)
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];




const buttons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Website",
      id: "backup channel",
      url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
    }),
  },
];


// Function to get a description of an environment variable
function getDescriptionFromEnv(varName) {
  const filePath = "./app.json";
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const config = JSON.parse(fileContent);
  return config.env[varName]?.description || "The environment variable description was not found.";
}

// Anti-call function setup
fana({ 
  nomCom: 'anticall', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "thís cσmmαnd ís rєstríctєd tσ thє вσt σwnєr. σr Rahmani хmd σwnєr" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { 
     interactiveMessage: {
     header: 'Instructions:\n\nType "anticall yes" to enable or "anticall no" to disable.',
         buttons,
        headerType: 1,
    }
 }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.ANTICALL = 'yes'; // Enable Anti-Call
      responseMessage = 'Anti-call has been enabled.';
      break;
    case "no":
      s.ANTICALL = 'no'; // Disable Anti-Call
      responseMessage = 'Anti-call has been disabled.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'anticall yes' or 'anticall no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { 
    interactiveMessage: {
   header: 'Error processing your request.',
       buttons,
        headerType: 1
     }
   }, { quoted: ms });
  }
});



fana({ 
  nomCom: 'areact', 
  categorie: "General" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { 
    header: "thís cσmmαnd ís rєstríctєd tσ thє вσt σwnєr. σr Rahmani хmd σwnєr",  
      buttons,
        headerType: 1
     }
   }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, {
    interactiveMessage: {
    header: 'Instructions:\n\nType "areact yes" to enable or "areact no" to disable.',
        buttons,
        headerType: 1
     }
    }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTO_REACT = 'yes'; // Enable Areact
      responseMessage = 'Areact has been enabled.';
      break;
    case "no":
      s.AUTO_REACT = 'no'; // Disable Areact
      responseMessage = 'Autoreaction has been disabled.';
      break;
    default:
      return await zk.sendMessage(chatId, { 
      text: "Please don't invent an option. Type 'areact yes' or 'areact no'.",
          buttons,
        headerType: 1,
       }
      }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { 
     header: responseMessage,
        buttons,
        headerType: 1,
        }
    }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});


fana({ 
  nomCom: 'readstatus', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "thís cσmmαnd ís rєstríctєd tσ thє вσt σwnєr. σr Rahmani хmd σwnє" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "readstatus yes" to enable or "readstatus no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTO_READ_STATUS = 'yes'; // Enable autoread status
      responseMessage = 'Auto read status has been enabled successfully.';
      break;
    case "no":
      s.AUTO_READ_STATUS = 'no'; // Disable autoread status
      responseMessage = 'Auto read status has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'readstatus yes' or 'readstatus no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});


fana({ 
  nomCom: 'antidelete', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "antidelete yes" to enable or "antidelete no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.ADM = 'yes'; // Enable Antidelete
      responseMessage = 'Antidelete has been enabled successfully.';
      break;
    case "no":
      s.ADM = 'no'; // Disable antidelete
      responseMessage = 'Antidelete has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'antidelete yes' or 'antidelete no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'downloadstatus', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "downloadstatus yes" to enable or "downloadstatus no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTO_DOWNLOAD_STATUS = 'yes'; // Enable Autodownloadstatus
      responseMessage = 'Auto download status has been enabled successfully.';
      break;
    case "no":
      s.AUTO_DOWNLOAD_STATUS = 'no'; // Disable autodownload status
      responseMessage = 'Auto download status has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'downloadstatus yes' or 'downloadstatus no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'startmessage', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "startmessage yes" to enable or "startmessage no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.DP = 'yes'; // Enable startmessage
      responseMessage = 'Start message has been enabled successfully.';
      break;
    case "no":
      s.DP = 'no'; // Disable startmessage
      responseMessage = 'Start message has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'startmessage yes' or 'startmessage no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});


fana({ 
  nomCom: 'readmessage', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "readmessage yes" to enable or "readmessage no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTO_READ_MESSAGES = 'yes'; // Enable Autoread
      responseMessage = 'Auto read messages has been enabled successfully.';
      break;
    case "no":
      s.AUTO_READ_MESSAGES = 'no'; // Disable read message
      responseMessage = 'Auto read messages has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'readmessage yes' or 'readmessage no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'pm-permit', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "pm-permit yes" to enable or "pm-permit no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.PM_PERMIT = 'yes'; // Enable pm
      responseMessage = 'Pm permit has been enabled successfully.';
      break;
    case "no":
      s.PM_PERMIT = 'no'; // Disable pm
      responseMessage = 'Pm permit has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'pm-permit yes' or 'pm-permit no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'chatbot', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "chatbot yes" to enable or "chatbot no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.CHAT_BOT = 'yes'; // Enable chatbot
      responseMessage = 'Chatbot has been enabled successfully.';
      break;
    case "no":
      s.CHAT_BOT = 'no'; // Disable chatbot
      responseMessage = 'Chatbot has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'chatbot yes' or 'chatbot no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'greet', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "greet yes" to enable or "greet no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTO_REPLY = 'yes'; // Enable greet
      responseMessage = 'Greet has been enabled successfully.';
      break;
    case "no":
      s.AUTO_REPLY = 'no'; // Disable greet
      responseMessage = 'Greet has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'greet yes' or 'greet no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});


fana({ 
  nomCom: 'antivv', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "antivv yes" to enable or "antivv no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.ANTI_VV = 'yes'; // Enable antivv
      responseMessage = 'Antivv has been enabled successfully.';
      break;
    case "no":
      s.ANTI_VV = 'no'; // Disable antivv
      responseMessage = 'Antivv has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'antivv yes' or 'antivv no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'publicmode', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "publicmode yes" to enable or "publicmode no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.MODE = 'yes'; // Enable publicmode
      responseMessage = 'Publicmode has been enabled successfully.';
      break;
    case "no":
      s.MODE = 'no'; // Disable publicmode
      responseMessage = 'Publicmode has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'publicmode yes' or 'publicmode no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'autorecord', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "autorecord yes" to enable or "autorecord no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.ETAT = '3'; // Enable autorecord
      responseMessage = 'Autorecord has been enabled successfully.';
      break;
    case "no":
      s.ETAT = 'no'; // Disable autorecord
      responseMessage = 'Autorecord has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'autorecord yes' or 'autorecord no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'autotyping', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "autotyping yes" to enable or "autotyping no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.ETAT = '2'; // Enable autotyping
      responseMessage = 'Autotyping has been enabled successfully.';
      break;
    case "no":
      s.ETAT = 'no'; // Disable autotyping
      responseMessage = 'Autotyping has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'autotyping yes' or 'autotyping no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});


fana({ 
  nomCom: 'alwaysonline', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "alwaysonline yes" to enable or "alwaysonline no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.ETAT = '1'; // Enable alwaysonline
      responseMessage = 'Alwaysonline has been enabled successfully.';
      break;
    case "no":
      s.ETAT = 'no'; // Disable alwaysonline
      responseMessage = 'Alwaysonline has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'alwaysonline yes' or 'alwaysonline no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'privatemode', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "privatemode yes" to enable or "privatemode no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.MODE = 'no'; // Enable privatemode
      responseMessage = 'Privatemode has been enabled successfully.';
      break;
    case "no":
      s.MODE = 'yes'; // Disable privatemode
      responseMessage = 'Privatemode has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'privatemode yes' or 'privatemode no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'autolikestatus', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "autolikestatus yes" to enable or "autolikestatus no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTO_LIKE_STATUS = 'yes'; // Enable autolikestatus
      responseMessage = 'Autolikestatus has been enabled successfully.';
      break;
    case "no":
      s.AUTO_LIKE_STATUS = 'no'; // Disable autolikestatus
      responseMessage = 'Autolikestatus has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'autolikestatus yes' or 'autolikestatus no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'chatbot', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await zk.sendMessage(chatId, { text: "*This command is restricted to the bot owner or Rahmani-Md owner.* 💀,,idiot" }, { quoted: ms });
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await zk.sendMessage(chatId, { text: 'Instructions:\n\nType "chatbot yes" to enable or "chatbot no" to disable.' }, { quoted: ms });
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.CHATBOT = 'yes'; // Enable chatbot
      responseMessage = 'Chatbot has been enabled successfully.';
      break;
    case "no":
      s.CHATBOT = 'no'; // Disable chatbot
      responseMessage = 'Chatbot has been disabled successfully.';
      break;
    default:
      return await zk.sendMessage(chatId, { text: "Please don't invent an option. Type 'chatbot yes' or 'chatbot no'." }, { quoted: ms });
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ 
  nomCom: 'settings', 
  categorie: "HEROKU-CLIENT" 
}, async (chatId, messagingService, context) => {
  const { ms, repondre, superUser, auteurMessage } = context;

  if (!superUser) {
    await zk.sendMessage(chatId, { text: "This command is for my owner only!" }, { quoted: ms });
    return;
  }

  const settingsOptions = [
    { nom: "ADM", choix: ['yes', "no"] },
    { nom: "ANTICALL", choix: ['yes', 'no'] },
    { nom: "AUTO_REACT", choix: ['yes', "no"] },
    { nom: "AUTO_VIEW_STATUS", choix: ['yes', "no"] },
    { nom: 'AUTO_SAVE_STATUS', choix: ['yes', "no"] },
    { nom: "PM_PERMIT", choix: ['yes', "no"] },
    { nom: 'MODE', choix: ["public", "private"] },
    { nom: "STARTING_MESSAGE", choix: ['on', "off"] },
    { nom: "AUTO_READ_MESSAGES", choix: ['on', "off"] },
    { nom: 'PRESENCE', choix: ["online", "typing", 'recording'] },
    { nom: "CHAT_BOT", choix: ['on', 'off'] }
  ];

  let settingsMenu = "╭──────༺♡༻──────╮\n Rahmani-Md\n╰──────༺♡༻──────╯\n\n";
  settingsOptions.forEach((option, index) => {
    settingsMenu += `${index + 1}- *${option.nom}*\n`;
  });
  settingsMenu += "\n*Please choose a variable by its number*";

  const initialMessage = await messagingService.sendMessage(chatId, { text: settingsMenu }, { quoted: ms });

  const userChoice = await messagingService.awaitForMessage({
    chatJid: chatId,
    sender: auteurMessage,
    timeout: 60000,
    filter: msg => msg.message.extendedTextMessage?.contextInfo.stanzaId === initialMessage.key.id && msg.message.extendedTextMessage.text > 0 && msg.message.extendedTextMessage.text <= settingsOptions.length
  });

  const selectedOption = settingsOptions[userChoice.message.extendedTextMessage.text - 1];
  let settingsDetail = `╭──────༺♡༻──────╮\n Rahmani хmd\n╰──────༺♡༻──────╯\n\n`;
  settingsDetail += `*Variable Name* : ${selectedOption.nom}\n`;
  settingsDetail += `*Description* : ${getDescriptionFromEnv(selectedOption.nom)}\n\n`;
  settingsDetail += "┌────── ⋆⋅☆⋅⋆ ──────┐\n\n";
  selectedOption.choix.forEach((choice, index) => {
    settingsDetail += `* *${index + 1}* => ${choice}\n`;
  });
  settingsDetail += "\n└────── ⋆⋅☆⋅⋆ ──────┘\n\n*Now reply to this message with the number that matches your choice.*";

  const choiceMessage = await messagingService.sendMessage(chatId, { text: settingsDetail }, { quoted: userChoice });

  const userOptionChoice = await messagingService.awaitForMessage({
    chatJid: chatId,
    sender: auteurMessage,
    timeout: 60000,
    filter: msg => msg.message.extendedTextMessage?.contextInfo.stanzaId === choiceMessage.key.id && msg.message.extendedTextMessage.text > 0 && msg.message.extendedTextMessage.text <= selectedOption.choix.length
  });

  const heroku = new Heroku({ token: s.HEROKU_API_KEY });
  await heroku.patch(`/apps/${s.HEROKU_APP_NAME}/config-vars`, {
    body: {
      [selectedOption.nom]: selectedOption.choix[userOptionChoice.message.extendedTextMessage.text - 1]
    }
  });

  await zk.sendMessage(chatId, { text: "That Heroku variable is changing, The bot is restarting...." }, { quoted: ms });
});

// Function to change Heroku environment variables
function changevars(commandName, varName) {
  fana({ nomCom: commandName, categorie: 'HEROKU-CLIENT' }, async (chatId, messagingService, context) => {
    const { arg, superUser, repondre } = context;

    if (!superUser) {
      await zk.sendMessage(chatId, { text: "This command is for my owner only!" }, { quoted: ms });
      return;
    }

    if (!s.HEROKU_APP_NAME || !s.HEROKU_API_KEY) {
      await zk.sendMessage(chatId, { text: "Fill in the HEROKU_APP_NAME and HEROKU_API_KEY environment variables" }, { quoted: ms });
      return;
    }

    if (!arg[0]) {
      await zk.sendMessage(chatId, { text: getDescriptionFromEnv(varName) }, { quoted: ms });
      return;
    }

    const heroku = new Heroku({ token: s.HEROKU_API_KEY });
    await heroku.patch(`/apps/${s.HEROKU_APP_NAME}/config-vars`, {
      body: {
        [varName]: arg.join(" ")
      }
    });

    await zk.sendMessage(chatId, { text: "That Heroku variable is changing, The bot is restarting...." }, { quoted: ms });
  });
}

changevars("setprefix", "PREFIXES");
changevars("menulinks", "BOT_MENU_LINKS");
