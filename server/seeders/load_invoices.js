import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from "../conection_db.js"

export async function loadInvoicesOnDatabase() {
    const filePath = path.resolve('server/data/03_invoices.csv')
    const invoices = []

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                transactions.push([
                    row.invoices_number,
                    row.id_user,
                    row.ID_of_transaction,
                    row.billing_period,
                    row.invoiced_amount,
                    row.amount_paid
                ])
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO invoices (invoices_number,id_user,ID_of_transaction,billing_period,invoiced_amount,amount_paid) VALUES ?'
                    const [result] = await pool.query(sql,[invoices])

                    console.log(`${result.affectedRows} invoices was inserted`);
                    resolve()
                } catch (error) {
                console.error('Error trying invoices', error.message);
                reject(error)
            }
        })
        .on('error', (err) =>{
            console.error('Error reading CSV files')
            reject(err)
        })
    })
}