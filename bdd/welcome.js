
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

const creerTableevents = async () => {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS events (
          Id serial PRIMARY KEY,
          jid text UNIQUE,
          welcome text DEFAULT 'non',
          goodbye text DEFAULT 'non',
          antipromote text DEFAULT 'non',
          antidemote text DEFAULT 'non'
        );
      `);
      console.log("La table 'events' a été créée avec succès.");
    } catch (e) {
      console.error("Une erreur est survenue lors de la création de la table 'events':", e);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

creerTableevents();

async function attribuerUnevaleur(jid, row, valeur) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM events WHERE jid = $1', [jid]);
      const jidExiste = result.rows.length > 0;
      if (jidExiste) {
        await client.query(`UPDATE events SET ${row} = $1 WHERE jid = $2`, [valeur, jid]);
        console.log(`La colonne ${row} a été actualisée sur ${valeur} pour le jid ${jid}`);
      } else {
        await client.query(`INSERT INTO events (jid, ${row}) VALUES ($1, $2)`, [jid, valeur]);
        console.log(`Nouveau jid ${jid} ajouté avec la colonne ${row} ayant la valeur ${valeur}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'actualisation de events :", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

async function recupevents(jid, row) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT ' + row + ' FROM events WHERE jid = $1', [jid]);
      const jidExists = result.rows.length > 0;
      if (jidExists) {
        return result.rows[0][row];
      } else {
        return 'non';
      }
    } catch (e) {
      console.error(e);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return 'non';
  }
};

module.exports = {
  attribuerUnevaleur,
  recupevents,
};