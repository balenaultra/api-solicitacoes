'use strict';

const database = require('../config/database');

exports.create = async(data) => {
  //console.log(data.body);

  const {name, email, cnpj, code, password} = data.body;  

  const sql = 
    ` INSERT INTO ultra.users (name, email, company_cpf_cnpj, code, password)
      VALUES ('${name}', '${email}', '${cnpj}', ${code}, '${password}') 
      RETURNING id `;

  const result = await database.asyncQuery(sql);
                        
  //console.log(result.rows);

  if (result.rows.length > 0) {
    let id = result.rows[0].id;
    
    console.log(`User added with ID: ${id}`);
    return id;
  }
}

exports.authenticate = async(data) => {
  const sql = 
    `SELECT * 
       FROM ultra.users 
      WHERE company_cpf_cnpj ='${data.company_cpf_cnpj}'
        AND code = ${data.code}
        AND password ='${data.password}'`;
  
  const result = await database.asyncQuery(sql);

  //console.log(result.rows);

  if (result.rows.length > 0) {
    let row = result.rows[0];

    //console.log(row);
    return row;
  }
}