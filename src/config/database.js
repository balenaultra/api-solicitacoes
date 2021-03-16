const { Pool } = require('pg');

// ==> Conexão com a Base de Dados:
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ultra-solicitacoes',
    password: 'estac2ul',
    port: 5432,        
});

pool.on('connect', () => {
  //necessário para a data não retornar em UTC
  var types = require('pg').types
  types.setTypeParser(1114, str => str);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

module.exports = {
  async asyncQuery(querySQL, params) { 
    return new Promise(
      (resolve, reject) => {  
        pool.query(querySQL, params, (err, data) => {
          if (err) {                
              console.log(querySQL)
              return reject(err);
          }                
          resolve(data);
        });
      });
  }
}