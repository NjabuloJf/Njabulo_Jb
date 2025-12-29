
const { timoth } = require('../njabulo/fana');
const { attribuerUnevaleur } = require('../data/welcome');


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
        await zk.sendMessage(dest, { text: `${nomCom} on to active and ${nomCom} off to put off` }, { quoted: ms });
      } else {
        if (arg[0] === 'on' || arg[0] === 'off') {
          await attribuerUnevaleur(dest, nomCom, arg[0]);
          await zk.sendMessage(dest, { text: `${nomCom} is actualised on ${arg[0]}` }, { quoted: ms });
        } else {
          await zk.sendMessage(dest, { text: 'on for active and off for desactive' }, { quoted: ms });
        }
      }
    } else {
      await zk.sendMessage(dest, { text: 'You can\'t use this commands' }, { quoted: ms });
    }
  });
}

// Appel de la fonction events pour les valeurs 'welcome' et 'goodbye'
events('welcome');
events('goodbye');
events('antipromote');
events('antidemote');

