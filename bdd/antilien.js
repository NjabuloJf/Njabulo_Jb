
require 'dotenv').config();
const { Pool } = require("pg");

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

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

async function createAntilienTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS antilien (
        jid text PRIMARY KEY,
        etat text,
        action text
      );
    `);
    console.log("La table 'antilien' a été créée avec succès.");
  } catch (error) {
    console.error("Une erreur est survenue lors de la création de la table 'antilien':", error);
  } finally {
    client.release();
  }
}

createAntilienTable();

async function ajouterOuMettreAJourJid(jid, etat) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;
    if (jidExiste) {
      await client.query('UPDATE antilien SET etat = $1 WHERE jid = $2', [etat, jid]);
    } else {
      await client.query('INSERT INTO antilien (jid, etat, action) VALUES ($1, $2, $3)', [jid, etat, 'supp']);
    }
    console.log(`JID ${jid} ajouté ou mis à jour avec succès dans la table 'antilien'.`);
  } catch (error) {
    console.error('Erreur lors de l\'ajout ou de la mise à jour du JID dans la table ,', error);
  } finally {
    client.release();
  }
};

async function mettreAJourAction(jid, action) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM antilien WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;
    if (jidExiste) {
      await client.query('UPDATE antilien SET action = $1 WHERE jid = $2', [action, jid]);
    } else {
      await client.query('INSERT INTO antilien (jid, etat, action) VALUES ($1, $2, $3)', [jid, 'non', action]);
    }
    console.log(`Action mise à jour avec succès pour le JID ${jid} dans la table 'antilien'.`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'action pour le JID dans la table :', error);
  } finally {
    client.release();
  }
};

async function verifierEtatJid(jid) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT etat FROM antilien WHERE jid = $1', [jid]);
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
};

async function recupererActionJid(jid) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT action FROM antilien WHERE jid = $1', [jid]);
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
};

module.exports = {
  mettreAJourAction,
  ajouterOuMettreAJourJid,
  verifierEtatJid,
  recupererActionJid,
};
