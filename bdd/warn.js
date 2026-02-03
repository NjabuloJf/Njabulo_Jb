
require("dotenv").config();
const { Pool } = require("pg");
const s = require("../set");
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

async function creerTableWarnUsers() {
  try {
    const client = await pool.connect();
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS warn_users (
          jid text PRIMARY KEY,
          warn_count integer DEFAULT 0
        );
      `;
      await client.query(query);
      console.log("La table 'warn_users' a été créée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la création de la table 'warn_users':", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

creerTableWarnUsers();

async function ajouterUtilisateurAvecWarnCount(jid) {
  try {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO warn_users (jid, warn_count) VALUES ($1, 1) 
        ON CONFLICT (jid) DO UPDATE SET warn_count = warn_users.warn_count + 1;
      `;
      const values = [jid];
      await client.query(query, values);
      console.log(`Utilisateur ${jid} ajouté ou mis à jour avec un warn_count de 1.`);
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour de l'utilisateur :", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

async function getWarnCountByJID(jid) {
  try {
    const client = await pool.connect();
    try {
      const query = "SELECT warn_count FROM warn_users WHERE jid = $1";
      const values = [jid];
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        const warnCount = result.rows[0].warn_count;
        return warnCount;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du warn_count :", error);
      return -1;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return -1;
  }
};

async function resetWarnCountByJID(jid) {
  try {
    const client = await pool.connect();
    try {
      const query = "UPDATE warn_users SET warn_count = 0 WHERE jid = $1";
      const values = [jid];
      await client.query(query, values);
      console.log(`Le warn_count de l'utilisateur ${jid} a été réinitialisé à 0.`);
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du warn_count :", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

module.exports = {
  ajouterUtilisateurAvecWarnCount,
  getWarnCountByJID,
  resetWarnCountByJID,
};