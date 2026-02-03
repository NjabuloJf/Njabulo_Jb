
require("dotenv").config();
const { Pool } = require("pg");
const s = require("../set");
var dbUrl = s.DATABASE_URL ? s.DATABASE_URL : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";
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

const creerTableHentai = async () => {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS hentai (
          groupeJid text PRIMARY KEY
        );
      `);
      console.log("La table 'hentai' avec 'groupeJid' comme clé primaire a été créée avec succès.");
    } catch (e) {
      console.error("Une erreur est survenue lors de la création de la table 'hentai':", e);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

creerTableHentai();

async function addToHentaiList(groupeJid) {
  try {
    const client = await pool.connect();
    try {
      const query = "INSERT INTO hentai (groupeJid) VALUES ($1) ON CONFLICT DO NOTHING";
      const values = [groupeJid];
      await client.query(query, values);
      console.log(`Le groupe JID ${groupeJid} a été ajouté à la liste de hentai.`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du groupe à la liste de hentai :", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function checkFromHentaiList(groupeJid) {
  try {
    const client = await pool.connect();
    try {
      const query = "SELECT EXISTS (SELECT 1 FROM hentai WHERE groupeJid = $1)";
      const values = [groupeJid];
      const result = await client.query(query, values);
      return result.rows[0].exists;
    } catch (error) {
      console.error("Erreur lors de la vérification de la présence du groupe dans la liste de hentai :", error);
      return false;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return false;
  }
}

async function removeFromHentaiList(groupeJid) {
  try {
    const client = await pool.connect();
    try {
      const query = "DELETE FROM hentai WHERE groupeJid = $1";
      const values = [groupeJid];
      await client.query(query, values);
      console.log(`Le groupe JID ${groupeJid} a été supprimé de la liste de hentai.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du groupe de la liste de hentai :", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

module.exports = {
  addToHentaiList,
  checkFromHentaiList,
  removeFromHentaiList,
};