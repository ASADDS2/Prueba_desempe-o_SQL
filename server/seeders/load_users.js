import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import { pool } from '../conection_db.js'

export async function loadUsersOnDatabase() {
    const filePath = path.resolve('server/data/01_users.csv')
    const users = []

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) =>{
            users.push([
                row.id_user,
                row_name_and_last_name.trim(),
                row_identification_number,
                row.email_address,
                row.phone_number
            ])
        })
        .on('end', async () => {
            try {
                const sql = 'INSERT INTO users (id_user,name_and_last_name,identification_number,email_address,phone_number) VALUES ?'
                const [result] = await pool.query(sql, [users])
                console.log(`${result.affectedRows} users was inserted`)
                resolve()
            } catch (error) {
                console.error('Error trying users', error.message);
                reject(error)
            }
        })
        .on('error', (error) =>{
            console.error('Error reading CSV files')
            reject(error)
        })
    })
}