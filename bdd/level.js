
require("dotenv").config();
const { Pool } = require("pg");
const s = require("../set");
const dbUrl = s.DATABASE_URL ? s.DATABASE_URL : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";
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

async function createUsersRankTable() {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users_rank (
          id SERIAL PRIMARY KEY,
          jid VARCHAR(255) UNIQUE,
          xp INTEGER DEFAULT 0,
          messages INTEGER DEFAULT 0
        );
      `);
    } catch (error) {
      console.error('Erreur lors de la création de la table users_rank:', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function ajouterOuMettreAJourUserData(jid) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users_rank WHERE jid = $1', [jid]);
      const jidExiste = result.rows.length > 0;
      if (jidExiste) {
        await client.query('UPDATE users_rank SET xp = xp + 10, messages = messages + 1 WHERE jid = $1', [jid]);
      } else {
        await client.query('INSERT INTO users_rank (jid, xp, messages) VALUES ($1, $2, $3)', [jid, 10, 1]);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données de l\'utilisateur:', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function getMessagesAndXPByJID(jid) {
  try {
    const client = await pool.connect();
    try {
      const query = 'SELECT messages, xp FROM users_rank WHERE jid = $1';
      const result = await client.query(query, [jid]);
      if (result.rows.length > 0) {
        const { messages, xp } = result.rows[0];
        return { messages, xp };
      } else {
        return { messages: 0, xp: 0 };
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
      return { messages: 0, xp: 0 };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return { messages: 0, xp: 0 };
  }
}

async function getBottom10Users() {
  try {
    const client = await pool.connect();
    try {
      const query = 'SELECT jid, xp, messages FROM users_rank ORDER BY xp DESC LIMIT 10';
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erreur lors de la récupération du bottom 10 des utilisateurs:', error);
      return [];
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return [];
  }
}

createUsersRankTable();

module.exports = {
  ajouterOuMettreAJourUserData,
  getMessagesAndXPByJID,
  getBottom10Users,
};