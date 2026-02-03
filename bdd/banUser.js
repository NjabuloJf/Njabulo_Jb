require("dotenv").config();
const { Pool } = require("pg");
const s = require("../set");

const dbUrl = s.DATABASE_URL || "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYiGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";

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

const creerTableBanUser = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS banUser (
        jid text PRIMARY KEY
      );
    `);
    console.log("La table 'banUser' a été créée avec succès.");
  } catch (e) {
    console.error("Une erreur est survenue lors de la création de la table 'banUser':", e);
  }
};

creerTableBanUser();

async function addUserToBanList(jid) {
  const client = await pool.connect();
  try {
    const query = "INSERT INTO banUser (jid) VALUES ($1)";
    const values = [jid];
    await client.query(query, values);
    console.log(`JID ${jid} ajouté à la liste des bannis.`);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur banni :", error);
  } finally {
    client.release();
  }
}

async function isUserBanned(jid) {
  const client = await pool.connect();
  try {
    const query = "SELECT EXISTS (SELECT 1 FROM banUser WHERE jid = $1)";
    const values = [jid];
    const result = await client.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur banni :", error);
    return false;
  } finally {
    client.release();
  }
}

async function removeUserFromBanList(jid) {
  const client = await pool.connect();
  try {
    const query = "DELETE FROM banUser WHERE jid = $1";
    const values = [jid];
    await client.query(query, values);
    console.log(`JID ${jid} supprimé de la liste des bannis.`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur banni :", error);
  } finally {
    client.release();
  }
}

module.exports = {
  addUserToBanList,
  isUserBanned,
  removeUserFromBanList,
};

