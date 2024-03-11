const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: '', // Replace with your password
    database: 'scrape_data', // Replace with your database name
    port: 5432,
});

const companyList = [];

const main = async () => {
    try {
        await client.connect();
        console.log('Connected to database');
        await client.query('BEGIN');
        // construct query message: select name from public.companies
        const queryText = 'SELECT name FROM public.companies';
        await client.query(queryText, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                // console.log(res.rows);
                for (let row of res.rows) {
                    companyList.push(row.name);
                }
            }
        });
        await client.query('COMMIT');
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        // console.log(companyList);
        fs.writeFileSync('companyList.txt', JSON.stringify(companyList));
        await client.end();
    }
}

main()