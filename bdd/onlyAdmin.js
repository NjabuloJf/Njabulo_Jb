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

const creerTableOnlyAdmin = async () => {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS onlyAdmin (
          groupeJid text PRIMARY KEY
        );
      `);
      console.log("La table 'onlyAdmin' a été créée avec succès.");
    } catch (e) {
      console.error("Une erreur est survenue lors de la création de la table 'onlyAdmin':", e);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

creerTableOnlyAdmin();

async function addGroupToOnlyAdminList(groupeJid) {
  try {
    const client = await pool.connect();
    try {
      const query = "INSERT INTO onlyAdmin (groupeJid) VALUES ($1) ON CONFLICT DO NOTHING";
      const values = [groupeJid];
      await client.query(query, values);
      console.log(`Groupe JID ${groupeJid} ajouté à la liste des groupes onlyAdmin.`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du groupe onlyAdmin :", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function isGroupOnlyAdmin(groupeJid) {
  try {
    const client = await pool.connect();
    try {
      const query = "SELECT EXISTS (SELECT 1 FROM onlyAdmin WHERE groupeJid = $1)";
      const values = [groupeJid];
      const result = await client.query(query, values);
      return result.rows[0].exists;
    } catch (error) {
      console.error("Erreur lors de la vérification du groupe onlyAdmin :", error);
      return false;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return false;
  }
}

async function removeGroupFromOnlyAdminList(groupeJid) {
  try {
    const client = await pool.connect();
    try {
      const query = "DELETE FROM onlyAdmin WHERE groupeJid = $1";
      const values = [groupeJid];
      await client.query(query, values);
      console.log(`Groupe JID ${groupeJid} supprimé de la liste des groupes onlyAdmin.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du groupe onlyAdmin :", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

module.exports = {
  addGroupToOnlyAdminList,
  isGroupOnlyAdmin,
  removeGroupFromOnlyAdminList,
};