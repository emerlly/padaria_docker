module.exports = {
    port: process.env.DB_PORT || 3306,
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root_password',
    database: process.env.DB_NAME || 'padaria_db'
}