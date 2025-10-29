const { fana } = require("../njabulo/fana");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

fana({ 
  nomCom: "vcard", 
  aliases: ["card", "contact"], 
  categorie: "vcard", 
  reaction: "📇" 
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  try {
    let phoneNumber;
    let name;

    // Check if the message is a reply to another message
    if (ms.quoted) {
      phoneNumber = ms.quoted.sender.split('@')[0].replace(/[^0-9]/g, '');
      if (!arg[0]) {
        return repondre('Please provide a name for the contact.');
      }
      name = arg.join(' ');
    } else {
      // If not a reply, check if a phone number is provided
      if (!arg[0] || !arg[0].startsWith('+')) {
        return repondre('Please provide a phone number with country code (e.g. +1234567890) or reply to a message.');
      }
      phoneNumber = arg[0].replace(/[^0-9]/g, '');
      name = arg.slice(1).join(' ');
      if (!name) {
        return repondre('Please provide a name for the contact.');
      }
    }

    const vcardString = `BEGIN:VCARD\n` + `VERSION:3.0\n` + `FN:${name}\n` + `TEL;type=CELL;type=VOICE;waid=${phoneNumber}:${phoneNumber}\n` + `END:VCARD`;
    zk.sendMessage(dest, {
      contacts: {
        displayName: name,
        contacts: [{ displayName: name, vcard: vcardString }]
      }
    });
  } catch (error) {
    console.log(error);
  }
});
