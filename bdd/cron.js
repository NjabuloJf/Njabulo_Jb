
require("dotenv").config();
const { Pool } = require("pg");
let s = require("../set");
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

async function createTablecron() {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS cron (
          group_id text PRIMARY KEY,
          mute_at text default null,
          unmute_at text default null
        );
      `);
      console.log("La table 'cron' a été créée avec succès.");
    } catch (error) {
      console.error("Une erreur est survenue lors de la création de la table 'cron':", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

createTablecron();

async function getCron() {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM cron');
      return result.rows;
    } catch (error) {
      console.error('Erreur lors de la récupération des données de la table "cron":', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function addCron(group_id, rows, value) {
  try {
    const client = await pool.connect();
    try {
      let response = await client.query(`SELECT * FROM cron WHERE group_id = $1`, [group_id]);
      let exist = response.rows.length > 0;
      if (exist) {
        await client.query(`UPDATE cron SET ${rows} = $1 WHERE group_id = $2`, [value, group_id])
      } else {
        const query = `INSERT INTO cron (group_id, ${rows}) VALUES ($1, $2)`;
        await client.query(query, [group_id, value]);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la donnée dans la table "cron":', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function getCronById(group_id) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM cron WHERE group_id = $1', [group_id]);
      return result.rows[0];
    } catch (error) {
      console.error('Erreur lors de la récupération des données de la table "cron":', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function delCron(group_id) {
  try {
    const client = await pool.connect();
    try {
      await client.query('DELETE FROM cron WHERE group_id = $1', [group_id]);
    } catch (error) {
      console.error('Erreur lors de la suppression de la donnée dans la table "cron":', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

module.exports = {
  getCron,
  addCron,
  delCron,
  getCronById,
};