
const databaseConfig = require('../config/database');

const connection = require('../config/conection');
async function CreateDatabase(){
    try {
        const conn = await connection();
        await conn.query(
            `CREATE DATABASE IF NOT EXISTS ${databaseConfig.database}`

        );
        await conn.end();
        console.log('database created');
    } catch (error) {
        console.log('Error creating database', error);
    }
}

CreateDatabase();