
const { exec } = require("child_process");
const { fana } = require("../njabulo/fana");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require('../bdd/antilien');
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require('../bdd/antibot');
const { search, download } = require('aptoide-scraper');
const fs = require('fs-extra');
const conf = require("../set");
const { default: axios } = require("axios");
const { getBinaryNodeChild, getBinaryNodeChildren } = require("@whiskeysockets/baileys")['default'];




fana({ 
  'nomCom': 'add', 
  'categorie': "Group", 
  'reaction': '🪄' 
}, async (origineMessage, zk, commandeOptions) => {
  let { 
    repondre, 
    verifAdmin, 
    msgRepondu, 
    infosGroupe, 
    auteurMsgRepondu, 
    verifGroupe, 
    auteurMessage, 
    superUser, 
    idBot, 
    arg, 
    ms 
  } = commandeOptions;

  if (!verifGroupe) return await zk.sendMessage(origineMessage, { text: "*This command works in groups only!*" }, { quoted: ms });
  if (!superUser) return await zk.sendMessage(origineMessage, { text: "You are too weak to do that" }, { quoted: ms });
  if (!verifAdmin) return await zk.sendMessage(origineMessage, { text: "You are not an admin here!" }, { quoted: ms });

  let groupMetadata;
  try {
    groupMetadata = await zk.groupMetadata(origineMessage);
  } catch (error) {
    return await zk.sendMessage(origineMessage, { text: "Failed to fetch group metadata." }, { quoted: ms });
  }

  let participants = groupMetadata.participants;
  if (!arg[0]) return await zk.sendMessage(origineMessage, { text: "Provide number to be added. Example:\nadd 2557XXXXX801" }, { quoted: ms });

  let numbers = arg.join(" ");
  const participantIds = participants.map(p => p.id);
  let numbersToAdd = [];
  let alreadyInGroup = [];

  try {
    const onWhatsApp = await Promise.all(
      numbers.split(',')
        .map(n => n.replace(/[^0-9]/g, ''))
        .filter(n => n.length > 4 && n.length < 14)
        .map(async n => [n, await zk.onWhatsApp(n + "@s.whatsapp.net")])
    );

    onWhatsApp.forEach(([num, result]) => {
      const jid = num + "@s.whatsapp.net";
      if (participantIds.includes(jid)) {
        alreadyInGroup.push(jid);
      } else if (result[0]?.exists) {
        numbersToAdd.push(num + "@s.whatsapp.net");
      }
    });
  } catch (error) {
    return await zk.sendMessage(origineMessage, { text: "Error validating phone numbers." }, { quoted: ms });
  }

  for (const jid of alreadyInGroup) {
    await zk.sendMessage(origineMessage, { text: "That user is already in this group!" }, { quoted: ms });
  }

  if (numbersToAdd.length > 0) {
    try {
      await zk.groupAdd(origineMessage, numbersToAdd);
      for (const jid of numbersToAdd) {
        await zk.sendMessage(origineMessage, { text: `Successfully added @${jid.split('@')[0]}` }, { quoted: ms });
      }
    } catch (error) {
      return await zk.sendMessage(origineMessage, { text: "Failed to add user to the group!" }, { quoted: ms });
    }
  }
});



fana({ 
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

fana({ 
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

fana({ 
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

fana({ 
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



      
