'use strict';

const database = require('../config/database');

exports.create = async(data) => {  

    const {id, description, request_group} = data.body;  

    const sql = 
        ` INSERT INTO ultra.request_types (id, description, request_group)
            VALUES (${id}, '${description}', '${request_group}') 
          RETURNING id `;

    const result = await database.asyncQuery(sql);
    
    if (result.rows.length > 0) {
        let id = result.rows[0].id;

        console.log(`Request added with ID: ${id}`);
        
        return id;
    }
}

exports.get = async(data) => {
    const sql = 
        ` SELECT * 
            FROM ultra.request_types 
          ORDER BY id  `;

    const result = await database.asyncQuery(sql);
                            
    console.log(result.rows);

    return result.rows;  
}

exports.update = async(id, data) => {   

    const {description, request_group} = data;

    const sql = 
        ` UPDATE ultra.request_types SET 
                 description = '${description}' , 
                 request_group = '${request_group}'
          WHERE id = ${id} `;

    
    try {
        const result = await database.asyncQuery(sql);

        console.log(`Request updated with ID: ${id}`);
        
        return id;    
    } catch (e) {
        console.log(e);
    }
    
}