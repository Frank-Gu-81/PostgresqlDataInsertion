# PostgresqlDataInsertion

## Postgresql Config
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'password', // Replace with your password
  database: 'companies', // Replace with your database name
  port: 5432,
});

## In terminal, type "node insertData.json" to run the insertion
