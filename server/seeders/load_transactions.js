import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../conection_db.js"

export async function loadTransactionsOnDatabase() {
    const filePath = path.resolve('server/data/02_transactions.csv')
    const transactions = []

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                transactions.push([
                    row.ID_of_transaction,
                    row.date_and_time_of_transaction,
                    row.transaction_amount,
                    row.transaction_status,
                    row.type_of_transaction
                ])
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO transactions (ID_of_transaction,date_and_time_of_transaction,transaction_amount,transaction_status,type_of_transaction) VALUES ?'
                    const [result] = await pool.query(sql,[transactions])

                    console.log(`${result.affectedRows} transactions was inserted`);
                    
                } catch (error) {
                console.error('Error trying transactions', error.message);
                reject(error)
            }
        })
        .on('error', (error) =>{
            console.error('Error reading CSV files')
            reject(error)
        })
    })
}