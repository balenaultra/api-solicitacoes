'use strict';

const database = require('../config/database');

exports.create = async(data) => {
    console.log(data.body);

    const {id_user_requester, id_user_requested, id_request_type, request_message, request_date, request_detail} = data.body;  

    const sql = 
        ` INSERT INTO ultra.requests (id_user_requester, id_user_requested, id_request_type, request_message, request_date, request_detail)
            VALUES (${id_user_requester}, ${id_user_requested} , ${id_request_type}, '${request_message}', '${request_date}', '${request_detail}') 
          RETURNING id`;

    const result = await database.asyncQuery(sql);
                        
    console.log(result.rows);

    if (result.rows.length > 0) {
        let id = result.rows[0].id;

        console.log(`Request added with ID: ${id}`);
        
        return id;
    }
}

exports.get = async(data) => {
    const sql = 
        `    SELECT r.*, 
                    t.description AS request_type_description,
                    u.name AS name_requester
            FROM ultra.requests r 
            LEFT JOIN ultra.request_types t ON t.id = r.id_request_type  
            LEFT JOIN ultra.users u ON u.id = r.id_user_requester
            WHERE (r.id_user_requested = ${data.decoded.id} ) `;

    const result = await database.asyncQuery(sql);

    return result.rows;  
}

exports.update = async(id, data) => {
    const {response, response_message, response_date} = data;

    const sql = 
        ` UPDATE ultra.requests SET 
                 response = ${response} , 
                 response_message = '${response_message}',
                 response_date = '${response_date}'
          WHERE id = ${id} `;
    
    try {
        const result = await database.asyncQuery(sql);

        console.log(`Request updated with ID: ${id}`);
        
        return id;    
    } catch (e) {
        console.log(e);
    }
    
}