
const { fana } = require('../njabulo/fana');
const { attribuerUnevaleur } = require('../bdd/welcome');
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



async function events(nomCom) {
  fana({
    nomCom: nomCom,
    categorie: 'Group'
  }, async (dest, zk, commandeOptions) => {
    const {
      ms,
      arg,
      repondre,
      superUser,
      verifAdmin
    } = commandeOptions;

    if (verifAdmin || superUser) {
      if (!arg[0] || arg.join(' ') === ' ') {
interactiveMessage: {
        await zk.sendMessage(dest, { 
header: `${nomCom} on to active and ${nomCom} off to put off`,
buttons,
          headerType: 1
          }
}, { quoted: ms });
      } else {
        if (arg[0] === 'on' || arg[0] === 'off') {
          await attribuerUnevaleur(dest, nomCom, arg[0]);
          await zk.sendMessage(dest, {
interactiveMessage: {
 header: `${nomCom} is actualised on ${arg[0]}`,
buttons,
          headerType: 1
          }
 }, { quoted: ms });
        } else {
          await zk.sendMessage(dest, { 
interactiveMessage: {
header: 'on for active and off for desactive',
buttons,
          headerType: 1
          }
 }, { quoted: ms });
        }
      }
    } else {
      await zk.sendMessage(dest, { 
interactiveMessage: {
header: 'You can\'t use this commands',
buttons,
          headerType: 1
          }
 }, { quoted: ms });
    }
  });
}

// Appel de la fonction events pour les valeurs 'welcome' et 'goodbye'
events('welcome');
events('goodbye');
events('antipromote');
events('antidemote');
