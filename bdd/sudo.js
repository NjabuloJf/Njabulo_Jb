
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

async function createSudoTable() {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS sudo (
          id serial PRIMARY KEY,
          jid text NOT NULL
        );
      `);
      console.log("La table 'sudo' a été créée avec succès.");
    } catch (error) {
      console.error("Une erreur est survenue lors de la création de la table 'sudo':", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

createSudoTable();

async function issudo(jid) {
  try {
    const client = await pool.connect();
    try {
      const query = "SELECT EXISTS (SELECT 1 FROM sudo WHERE jid = $1)";
      const values = [jid];
      const result = await client.query(query, values);
      return result.rows[0].exists;
    } catch (error) {
      console.error("Erreur lors de la vérification du groupe banni :", error);
      return false;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return false;
  }
}

async function removeSudoNumber(jid) {
  try {
    const client = await pool.connect();
    try {
      const query = "DELETE FROM sudo WHERE jid = $1";
      const values = [jid];
      await client.query(query, values);
      console.log(`Numéro de téléphone ${jid} supprimé de la liste des numéros de téléphone autorisés.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du numéro de téléphone autorisé :", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function addSudoNumber(jid) {
  try {
    const client = await pool.connect();
    try {
      const query = "INSERT INTO sudo (jid) VALUES ($1) ON CONFLICT DO NOTHING";
      const values = [jid];
      await client.query(query, values);
      console.log(`Numéro de téléphone ${jid} ajouté à la liste des numéros de téléphone autorisés.`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du numéro de téléphone autorisé :", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function getAllSudoNumbers() {
  try {
    const client = await pool.connect();
    try {
      const query = "SELECT jid FROM sudo";
      const result = await client.query(query);
      const sudoNumbers = result.rows.map((row) => row.jid);
      return sudoNumbers;
    } catch (error) {
      console.error("Erreur lors de la récupération des numéros de téléphone autorisés :", error);
      return [];
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return [];
  }
}

async function isSudoTableNotEmpty() {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT COUNT(*) FROM sudo');
      const rowCount = parseInt(result.rows[0].count);
      return rowCount > 0;
    } catch (error) {
      console.error('Erreur lors de la vérification de la table "sudo" :', error);
      return false;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return false;
  }
};

module.exports = {
  issudo,
  addSudoNumber,
  removeSudoNumber,
  getAllSudoNumbers,
  isSudoTableNotEmpty,
};