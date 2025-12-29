
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



      
