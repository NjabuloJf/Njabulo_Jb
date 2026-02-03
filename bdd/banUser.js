
require('dotenv').config({ path: __dirname + '/set.env' });
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

async function creerTableBanUser() {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS banUser (
          jid text PRIMARY KEY
        );
      `);
      console.log("La table 'banUser' a été créée avec succès.");
    } catch (error) {
      console.error("Une erreur est survenue lors de la création de la table 'banUser':", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

creerTableBanUser();

async function banUser(jid) {
  try {
    const client = await pool.connect();
    try {
      await client.query('INSERT INTO banUser (jid) VALUES ($1) ON CONFLICT DO NOTHING', [jid]);
      console.log(`Utilisateur ${jid} banni avec succès.`);
    } catch (error) {
      console.error('Erreur lors du bannissement de l\'utilisateur:', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

async function unbanUser(jid) {
  try {
    const client = await pool.connect();
    try {
      await client.query('DELETE FROM banUser WHERE jid = $1', [jid]);
      console.log(`Utilisateur ${jid} débanni avec succès.`);
    } catch (error) {
      console.error('Erreur lors du débannissement de l\'utilisateur:', error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

async function isBanned(jid) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM banUser WHERE jid = $1', [jid]);
      return result.rows.length > 0;
    } catch (error) {
      console.error('Erreur lors de la vérification du bannissement:', error);
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
  banUser,
  unbanUser,
  isBanned,
};