import mysql from "mysql2/promise"
export const pool = mysql.createPool({
    host: "localhost",
    database: "project",
    port: 3306,
    user: "root",
    password: '1234',
    connectionLimit: 10,        
    waitForConnections: true,   
    queueLimit: 0 
})

async function tryDatabaseConection() {
    try {
        const connection = await pool.getConnection()
        console.log('Succesfully connection to database')
        connection.release
    } catch (error) {
        console.error('Error conecting with database', error.message)
        
    }

}

tryDatabaseConection()