
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

const creerTableAlive = async () => {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS alive (
          id serial PRIMARY KEY,
          message text,
          lien text
        );
      `);
      console.log("La table 'alive' a été créée avec succès.");
    } catch (e) {
      console.error("Une erreur est survenue lors de la création de la table 'alive':", e);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};

creerTableAlive();

async function addOrUpdateDataInAlive(message, lien) {
  try {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO alive (id, message, lien) VALUES (1, $1, $2) 
        ON CONFLICT (id) DO UPDATE SET message = excluded.message, lien = excluded.lien;
      `;
      const values = [message, lien];
      await client.query(query, values);
      console.log("Données ajoutées ou mises à jour dans la table 'alive' avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour des données dans la table 'alive':", error);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

async function getDataFromAlive() {
  try {
    const client = await pool.connect();
    try {
      const query = "SELECT message, lien FROM alive WHERE id = 1";
      const result = await client.query(query);
      if (result.rows.length > 0) {
        const { message, lien } = result.rows[0];
        return { message, lien };
      } else {
        console.log("Aucune donnée trouvée dans la table 'alive'.");
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données depuis la table 'alive':", error);
      return null;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return null;
  }
}

module.exports = {
  addOrUpdateDataInAlive,
  getDataFromAlive,
};