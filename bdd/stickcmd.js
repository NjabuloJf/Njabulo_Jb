
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

async function creerTableStickcmd() {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS stickcmd (
          cmd text PRIMARY KEY,
          id text NOT NULL
        );
      `);
      console.log("La table 'stickcmd' a été créée avec succès.");
    } catch (e) {
      console.error("Une erreur est survenue lors de la création de la table 'stickcmd':", e);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

creerTableStickcmd();

async function addstickcmd(cmd, id) {
  try {
    const client = await pool.connect();
    try {
      const query = "INSERT INTO stickcmd(cmd, id) VALUES ($1, $2) ON CONFLICT DO NOTHING";
      const values = [cmd, id];
      await client.query(query, values);
    } catch (error) {
      console.log('Erreur lors de l\'ajout du stickcmd', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function inStickCmd(id) {
  try {
    const client = await pool.connect();
    try {
      const query = "SELECT EXISTS (SELECT 1 FROM stickcmd WHERE id = $1)";
      const values = [id];
      const result = await client.query(query, values);
      return result.rows[0].exists;
    } catch (error) {
      return false;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return false;
  }
}

async function deleteCmd(cmd) {
  try {
    const client = await pool.connect();
    try {
      const query = "DELETE FROM stickcmd WHERE cmd = $1";
      const values = [cmd];
      await client.query(query, values);
      console.log(`Le stickcmd ${cmd} a été supprimé de la liste.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du stickcmd :", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function getCmdById(id) {
  try {
    const client = await pool.connect();
    try {
      const query = "SELECT cmd FROM stickcmd WHERE id = $1";
      const values = [id];
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        return result.rows[0].cmd;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du stickcmd par id :", error);
      return null;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return null;
  }
}

async function getAllStickCmds() {
  try {
    const client = await pool.connect();
    try {
      const query = "SELECT cmd FROM stickcmd";
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Erreur lors de la récupération de toutes les commandes stickcmd :", error);
      return [];
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return [];
  }
}

module.exports = {
  addstickcmd,
  deleteCmd,
  getCmdById,
  inStickCmd,
  getAllStickCmds,
};