const Pool = require('pg').Pool;

const pool = new Pool({
  host: '127.0.0.1',
  user: 'postgres',
  password: 'root',
  database: 'prueba',
  port: 5432,
})

module.exports = {
  pool
}
