const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: async (text, params, callback) => {
    console.log('executed query: ', text);
    const client = await pool.connect();
    const result = client.query(text, params, callback);
    client.release();
    return result;
  },
}