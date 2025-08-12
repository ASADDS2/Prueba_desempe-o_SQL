import { loadUsersOnDatabase } from "./load_users.js"

(async () => {
    try {
        console.log('Running seeders')
        await loadUsersOnDatabase()

        console.log('Every seeders succesfully conected');
    } catch (error) {
        console.error('Error doing seeders', error.message); 
    } finally{
        process.exit();
    }
})