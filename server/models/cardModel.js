const { Pool } = require('pg');
const PG_URI = 'postgres://noslmpys:O-kJmmJEe45rc2akphR_VvKASywNsf-A@castor.db.elephantsql.com/noslmpys';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query: ', query);
    return pool.query(text, params, callback);
  }
}