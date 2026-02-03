
require("dotenv").config();
const { Pool } = require("pg");
let s = require("../set")
var dbUrl = s.DATABASE_URL ? s.DATABASE_URL : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};
const pool = new Pool(proConfig);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Fonction pour créer la table "antibot"
async function createAntibotTable() {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS antibot (
          jid text PRIMARY KEY,
          etat text,
          action text
        );
      `);
      console.log("La table 'antibot' a été créée avec succès.");
    } catch (error) {
      console.error("Une erreur est survenue lors de la création de la table 'antibot':", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

// Appelez la méthode pour créer la table "antibot"
createAntibotTable();

async function atbajouterOuMettreAJourJid(jid, etat) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM antibot WHERE jid = $1', [jid]);
      const jidExiste = result.rows.length > 0;
      if (jidExiste) {
        await client.query('UPDATE antibot SET etat = $1 WHERE jid = $2', [etat, jid]);
      } else {
        await client.query('INSERT INTO antibot (jid, etat, action) VALUES ($1, $2, $3)', [jid, etat, 'supp']);
      }
      console.log(`JID ${jid} ajouté ou mis à jour avec succès dans la table 'antibot'.`);
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la mise à jour du JID dans la table ,', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

async function atbmettreAJourAction(jid, action) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM antibot WHERE jid = $1', [jid]);
      const jidExiste = result.rows.length > 0;
      if (jidExiste) {
        await client.query('UPDATE antibot SET action = $1 WHERE jid = $2', [action, jid]);
      } else {
        await client.query('INSERT INTO antibot (jid, etat, action) VALUES ($1, $2, $3)', [jid, 'non', action]);
      }
      console.log(`Action mise à jour avec succès pour le JID ${jid} dans la table 'antibot'.`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'action pour le JID dans la table :', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

async function atbverifierEtatJid(jid) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT etat FROM antibot WHERE jid = $1', [jid]);
      if (result.rows.length > 0) {
        const etat = result.rows[0].etat;
        return etat === 'oui';
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'état du JID dans la table ', error);
      return false;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return false;
  }
};

async function atbrecupererActionJid(jid) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT action FROM antibot WHERE jid = $1', [jid]);
      if (result.rows.length > 0) {
        const action = result.rows[0].action;
        return action;
      } else {
        return 'supp';
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'action du JID dans la table :', error);
      return 'supp';
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return 'supp';
  }
};

module.exports = {
  atbmettreAJourAction,
  atbajouterOuMettreAJourJid,
  atbverifierEtatJid,
  atbrecupererActionJid,
};