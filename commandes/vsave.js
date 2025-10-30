const { fana } = require("../njabulo/fana");

fana({
  nomCom: "save1",
  aliases: [],
  categorie: "Contacts",
  reaction: "💾",
  description: "Saves and sends a contact."
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  try {
    if (!ms.quoted) return repondre("Reply to a message.");
    if (!arg[0]) return repondre("Please provide the contact name.");

    const contactName = arg.join(" ");
    const contactNumber = ms.quoted.sender.split('@')[0].replace(/[^0-9+]/g, '');

    const vcard = 'BEGIN:VCARD\n' + 
                   'VERSION:3.0\n' + 
                   `FN:${contactName}\n` + 
                   `TEL:${contactNumber}\n` + 
                   'END:VCARD';

    await zk.sendMessage(dest, { 
      contacts: { 
        displayName: contactName, 
        contacts: [{ 
          vcard 
        }] 
      } 
    });

    repondre(`Contact saved and sent: ${contactName} - ${contactNumber}`);
  } catch (err) {
    console.error(err);
    repondre("An error occurred while saving and sending the contact.");
  }
});


/*const { fana } = require("../njabulo/fana");

fana({
  nomCom: "save1",
  aliases: [],
  categorie: "Contacts",
  reaction: "💾",
  description: "Saves and sends a contact."
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  try {
    if (!ms.quoted) return repondre("Reply to a message.");

    if (!arg[0]) return repondre("Please provide the contact name.");

    const contactName = arg.join(" ");
    const contactNumber = ms.quoted.sender.split('@')[0].replace(/[^0-9+]/g, '');

    const vcard = 'BEGIN:VCARD\n' + 
                   'VERSION:3.0\n' + 
                   `FN:${contactName}\n` + 
                   `TEL:${contactNumber}\n` + 
                   'END:VCARD';

    await zk.sendMessage(dest, { 
      contacts: { 
        displayName: contactName, 
        contacts: [{ 
          vcard 
        }] 
      } 
    });

    repondre(`Contact saved and sent: ${contactName} - ${contactNumber}`);
  } catch (err) {
    console.error(err);
    repondre("An error occurred while saving and sending the contact.");
  }
});*/
