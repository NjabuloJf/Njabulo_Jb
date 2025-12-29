:
const { exec } = require("child_process");
const { ezra } = require("../fredi/ezra");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require('../luckydatabase/antilien');
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require('../luckydatabase/antibot');
const { search, download } = require('aptoide-scraper');
const fs = require('fs-extra');
const conf = require("../set");
const { default: axios } = require("axios");
const { getBinaryNodeChild, getBinaryNodeChildren } = require("@whiskeysockets/baileys")['default'];

ezra({ 
  'nomCom': 'approve', 
  'aliases': ["approve-all", "accept"], 
  'categorie': "Group", 
  'reaction': '🔎' 
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, ms } = commandeOptions;
  if (!verifGroupe) {
    await zk.sendMessage(origineMessage, { text: "This command works in groups only" }, { quoted: ms });
    return;
  }
  if (!verifAdmin) {
    await zk.sendMessage(origineMessage, { text: "You are not an admin here!" }, { quoted: ms });
    return;
  }
  const pendingRequests = await zk.groupRequestParticipantsList(origineMessage);
  if (pendingRequests.length === 0) {
    await zk.sendMessage(origineMessage, { text: "There are no pending join requests." }, { quoted: ms });
    return;
  }
  for (const request of pendingRequests) {
    await zk.groupRequestParticipantsUpdate(origineMessage, [request.jid], 'approve');
  }
  await zk.sendMessage(origineMessage, { text: "All pending participants have been approved to join by Lucky md." }, { quoted: ms });
});

ezra({ 
  'nomCom': "vcf", 
  'aliases': ["savecontact", "savecontacts"], 
  'categorie': "Group", 
  'reaction': '♻️' 
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, ms } = commandeOptions;
  const fs = require('fs');
  if (!verifAdmin) {
    await zk.sendMessage(origineMessage, { text: "You are not an admin here!" }, { quoted: ms });
    return;
  }
  if (!verifGroupe) {
    await zk.sendMessage(origineMessage, { text: "This command works in groups only" }, { quoted: ms });
    return;
  }
  try {
    let groupMetadata = await zk.groupMetadata(origineMessage);
    const participants = groupMetadata.participants;
    let vcfData = '';
    for (let participant of participants) {
      let number = participant.id.split('@')[0];
      let name = participant.name || participant.notify || "[LUCKY] +" + number;
      vcfData += "BEGIN:VCARD\nVERSION:3.0\nFN:" + name + "\nTEL;type=CELL;type=VOICE;waid=" + number + ':+' + number + "\nEND:VCARD\n";
    }
    await zk.sendMessage(origineMessage, { text: "A moment, *LUCKY-MD* is compiling " + participants.length + " contacts into a vcf..." }, { quoted: ms });
    await fs.writeFileSync("./contacts.vcf", vcfData.trim());
    await zk.sendMessage(origineMessage, { 
      document: fs.readFileSync("./contacts.vcf"), 
      mimetype: "text/vcard", 
      fileName: groupMetadata.subject + '.Vcf', 
      caption: "VCF for " + groupMetadata.subject + "\nTotal Contacts: " + participants.length + "\n*KEEP USING LUCKY_MD*" 
    }, { quoted: ms });
    fs.unlinkSync('./contacts.vcf');
  } catch (error) {
    console.error("Error while creating or sending VCF:", error.message || error);
    await zk.sendMessage(origineMessage, { text: "An error occurred while creating or sending the VCF. Please try again." }, { quoted: ms });
  }
});

ezra({ 
  'nomCom': 'invite', 
  'aliases': ["link"], 
  'categorie': 'Group', 
  'reaction': '🪄' 
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, nomGroupe, nomAuteurMessage, verifGroupe, ms } = commandeOptions;
  if (!verifGroupe) {
    await zk.sendMessage(origineMessage, { text: "*This command works in groups only!*" }, { quoted: ms });
    return;
  }
  try {
    const inviteLink = await zk.groupInviteCode(origineMessage);
    const message = "Hello " + nomAuteurMessage + ", here is the group link of " + nomGroupe + ":\n\nClick Here To Join: https://chat.whatsapp.com/" + inviteLink;
    await zk.sendMessage(origineMessage, { text: message }, { quoted: ms });
  } catch (error) {
    console.error("Error fetching group invite link:", error.message || error);
    await zk.sendMessage(origineMessage, { text: "An error occurred while fetching the group invite link. Please try again." }, { quoted: ms });
  }
});

ezra({ 
  'nomCom': 'revoke', 
  'categorie': 'Group' 
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre, verifGroupe, verifAdmin, ms } = commandeOptions;
  if (!verifAdmin) {
    await zk.sendMessage(origineMessage, { text: "for admins." }, { quoted: ms });
    return;
  };
  if (!verifGroupe) {
    await zk.sendMessage(origineMessage, { text: "This command is only allowed in groups." }, { quoted: ms });
  };
  await zk.groupRevokeInvite(origineMessage);
  await zk.sendMessage(origineMessage, { text: "group link revoked." }, { quoted: ms });
});



ezra({ 
  'nomCom': "antiword", 
  'categorie': 'Group', 
  'reaction': '🔗' 
}, async (origineMessage, zk, commandeOptions) => {
  var { repondre, arg, verifGroupe, superUser, verifAdmin, ms } = commandeOptions;
  if (!verifGroupe) {
    await zk.sendMessage(origineMessage, { text: "*This command is for groups only*" }, { quoted: ms });
    return;
  }
  if (superUser || verifAdmin) {
    const antiwordStatus = await verifierEtatJid(origineMessage);
    try {
      if (!arg || !arg[0] || arg === " ") {
        await zk.sendMessage(origineMessage, { text: "antiword on to activate the anti-word feature\nantiword off to deactivate the anti-word feature\nantiword action/remove to directly remove the sender without notice\nantiword action/warn to give warnings\nantiword action/delete to remove the word without any sanctions\n\nPlease note that by default, the anti-word feature is set to delete." }, { quoted: ms });
        return;
      };
      if (arg[0] === 'on') {
        if (antiwordStatus) {
          await zk.sendMessage(origineMessage, { text: "the antiword is already activated for this group" }, { quoted: ms });
        } else {
          await ajouterOuMettreAJourJid(origineMessage, "oui");
          await zk.sendMessage(origineMessage, { text: "the antiword is activated successfully" }, { quoted: ms });
        }
      } else {
        if (arg[0] === "off") {
          if (antiwordStatus) {
            await ajouterOuMettreAJourJid(origineMessage, "non");
            await zk.sendMessage(origineMessage, { text: "The antiword has been successfully deactivated" }, { quoted: ms });
          } else {
            await zk.sendMessage(origineMessage, { text: "antiword is not activated for this group" }, { quoted: ms });
          }
        } else {
          if (arg.join('').split('/')[0] === 'action') {
            let action = arg.join('').split('/')[1].toLowerCase();
            if (action == 'remove' || action == "warn" || action == "delete") {
              await mettreAJourAction(origineMessage, action);
              await zk.sendMessage(origineMessage, { text: "The anti-word action has been updated to " + arg.join('').split('/')[1] }, { quoted: ms });
            } else {
              await zk.sendMessage(origineMessage, { text: "The only actions available are warn, remove, and delete" }, { quoted: ms });
            }
          } else {
            await zk.sendMessage(origineMessage, { text: "antiword on to activate the anti-word feature\nantiword off to deactivate the anti-word feature\nantiword action/remove to directly remove the word sender without notice\nantiword action/warn to give warnings\nantiword action/delete to remove the word without any sanctions\n\nPlease note that by default, the anti-word feature is set to delete." }, { quoted: ms });
          }
        }
      }
    } catch (error) {
      await zk.sendMessage(origineMessage, { text: error }, { quoted: ms });
    }
  } else {
    await zk.sendMessage(origineMessage, { text: "You are not entitled to this order" }, { quoted: ms });
  }
});

ezra({ 
  'nomCom': "antilink-all", 
  'categorie': "Group", 
  'reaction': '🕯️' 
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, arg, verifGroupe, superUser, verifAdmin, ms } = commandeOptions;
  if (!verifGroupe) {
    await zk.sendMessage(origineMessage, { text: "*This Command works in Groups Only*" }, { quoted: ms });
    return;
  }
  if (superUser || verifAdmin) {
    const antilinkStatus = await verifierEtatJid(origineMessage);
    try {
      if (!arg || !arg[0].trim()) {
        await zk.sendMessage(origineMessage, { text: "Type `antilink-all on` to activate the antilink-all feature\nor `antilink-all off` to deactivate the antilink-all feature\nThen `antilink-all action/remove` to directly remove the link without notice\nor `antilink-all action/warn` to give warnings\nor `antilink-all action/delete` to remove the link without any sanctions\n\nPlease note that by default, the antilink-all feature is set to delete." }, { quoted: ms });
        return;
      }
      const [action, subAction] = arg.join(" ").split('/');
      if (action === 'on') {
        if (antilinkStatus) {
          await zk.sendMessage(origineMessage, { text: "Antilink-all is already activated for this group." }, { quoted: ms });
        } else {
          await ajouterOuMettreAJourJid(origineMessage, "oui");
          await zk.sendMessage(origineMessage, { text: "The antilink-all feature has been activated successfully." }, { quoted: ms });
        }
      } else {
        if (action === "off") {
          if (antilinkStatus) {
            await ajouterOuMettreAJourJid(origineMessage, "non");
            await zk.sendMessage(origineMessage, { text: "The antilink-all feature has been successfully deactivated." }, { quoted: ms });
          } else {
            await zk.sendMessage(origineMessage, { text: "Antilink-all is not activated for this group." }, { quoted: ms });
          }
        } else {
          if (action === 'action') {
            const subAction = arg.join('').split('/')[1].toLowerCase();
            if (["remove", "warn", "delete"].includes(subAction)) {
              await mettreAJourAction(origineMessage, subAction);
              await zk.sendMessage(origineMessage, { text: "The anti-link action has been updated to " + subAction + '.' }, { quoted: ms });
            } else {
              await zk.sendMessage(origineMessage, { text: "The only actions available are `warn`, `remove`, and `delete`." }, { quoted: ms });
            }
          } else {
            await zk.sendMessage(origineMessage, { text: "Type `antilink-all on` to activate the antilink-all feature\nor `antilink-all off` to deactivate the antilink-all feature\nor `antilink-all action/remove` to directly remove the link without notice\nor `antilink-all action/warn` to give warnings\nor `antilink-all action/delete` to remove the link without any sanctions\n\nPlease note that by default, the antilink-all feature is set to delete.\n\n*KEEP USING LUCKY_MD*" }, { quoted: ms });
          }
        }
      }
    } catch (error) {
      await zk.sendMessage(origineMessage, { text: "Error: " + error.message }, { quoted: ms });
    }
  } else {
    await zk.sendMessage(origineMessage, { text: "You are not allowed to use this command." }, { quoted: ms });
  }
});
