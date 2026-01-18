const { fana } = require('../njabulo/fana');
const { ajouterUtilisateurAvecWarnCount, getWarnCountByJID, resetWarnCountByJID } = require('../bdd/warn');
const s = require("../set");
const config = require("../set");



const buttons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "🌐WA channel",
      id: "backup channel",
      url: config.GURL
    }),
  },
  ];

fana({
  nomCom: 'warn',
  categorie: 'Group'
}, async (dest, zk, commandeOptions) => {
  const {
    ms,
    arg,
    repondre,
    superUser,
    verifGroupe,
    verifAdmin,
    msgRepondu,
    auteurMsgRepondu
  } = commandeOptions;

  if (!verifGroupe) {
    return await zk.sendMessage(dest, { 
interactiveMessage: {
header: 'This command is for groups only!',
buttons,
        headerType: 1
    }
}, { quoted: ms });
  }

  if (verifAdmin || superUser) {
    if (!msgRepondu) {
      return await zk.sendMessage(dest, { 
interactiveMessage: {
header: 'Reply to a message of the user to warn',
buttons,
        headerType: 1
    }
}, { quoted: ms });
    }

    if (!arg || !arg[0] || arg.join('') === '') {
      await ajouterUtilisateurAvecWarnCount(auteurMsgRepondu);
      let warn = await getWarnCountByJID(auteurMsgRepondu);
      let warnlimit = s.WARN_COUNT;

      if (warn >= warnlimit) {
        await zk.sendMessage(dest, {
interactiveMessage: {
 header: 'This user has reached the warning limit, so I will kick them',
buttons,
        headerType: 1
    }
}, { quoted: ms });
        await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");
      } else {
        var rest = warnlimit - warn;
        await zk.sendMessage(dest, { 
interactiveMessage: {
header: `This user is warned, ${rest} warnings left before kick`,
buttons,
        headerType: 1
    }
}, { quoted: ms });
      }
    } else if (arg[0] === 'reset') {
      await resetWarnCountByJID(auteurMsgRepondu);
      await zk.sendMessage(dest, { 
interactiveMessage: {
header: "Warn count is reset for this user",
buttons,
        headerType: 1
    }
 }, { quoted: ms });
    } else {
      await zk.sendMessage(dest, { 
interactiveMessage: {
header: 'Reply to a user by typing .warn or .warn reset',
buttons,
        headerType: 1
    }
}, { quoted: ms });
    }
  } else {
    await zk.sendMessage(dest, { 
interactiveMessage: {
header: 'You are not an admin',
buttons,
        headerType: 1
    }
 }, { quoted: ms });
  }
});
