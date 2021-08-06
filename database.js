// For secure connection:
const fs = require('fs');
const { Pool } = require("pg");

// For sensitive information
require("dotenv").config();

// Configure the database connection.

const config = {
  user: "damir",
  password: process.env.COCKROACH_DB_PASSWORD,
  host: process.env.COCKROACH_DB_HOST,
  database: process.env.COCKROACH_DB_DATABASE,
  port: 26257,
  ssl: {
    rejectUnauthorized: false,
  },
  // For secure connection:
  ssl: {
        ca: fs.readFileSync('./certs/cc-ca.crt')
            .toString()
  }
};

// Create a connection pool

const pool = new Pool(config);

// Wrapper for a transaction.  This automatically re-calls the operation with
// the client as an argument as long as the database server asks for
// the transaction to be retried.

async function retryTxn(n, max, client, operation, callback) {
  await client.query("BEGIN;");
  while (true) {
    n++;
    if (n === max) {
      throw new Error("Max retry count reached.");
    }
    try {
      await operation(client, callback);
      await client.query("COMMIT;");
      return;
    } catch (err) {
      if (err.code !== "40001") {
        return callback(err);
      } else {
        console.log("Database check failed. Retrying.");
        console.log(err.message);
        await client.query("ROLLBACK;", () => {
          console.log("Rolling back database check.");
        });
        await new Promise((r) => setTimeout(r, 2 ** n * 1000));
      }
    }
  }
}

// Creates a table and inserts some initial values.

async function initTable(client, callback) {
  await client.query(
    "CREATE TABLE IF NOT EXISTS github_tokens (id INT PRIMARY KEY, github_token VARCHAR(40));",
    callback
  );
  // await client.query(
  //   "INSERT INTO github_tokens (id, github_token) VALUES (1, 'test_token'), (2, 'test_token_2');",
  //   callback
  // );
  await client.query("SELECT id, github_token FROM github_tokens;", callback);
}

async function checkForToken(client, callback) {
  const selectGitHubToken = "SELECT github_token FROM github_tokens WHERE id = 1 ;";
  console.log(selectGitHubToken);
  const selectFromValues = [from];
  await client.query(selectGitHubToken, selectFromValues, (err, res) => {
    if (err) {
      return callback(err);
    } else if (res.rows.length === 0) {
      console.log("GitHub token not found in table");
      return callback(err);
    }
    var token = res.rows[0].github_token;
    console.log(token)
  });

  // const updateFromBalanceStatement = "UPDATE accounts SET balance = balance - $1 WHERE id = $2 ;";
  // const updateFromValues = [amount, from];
  // await client.query(updateFromBalanceStatement, updateFromValues, callback);
  //
  // const updateToBalanceStatement = "UPDATE accounts SET balance = balance + $1 WHERE id = $2 ;";
  // const updateToValues = [amount, to];
  // await client.query(updateToBalanceStatement, updateToValues, callback);
  //
  // const selectBalanceStatement = "SELECT id, balance FROM accounts;";
  // await client.query(selectBalanceStatement, callback);
}

// Run the transactions in the connection pool

(async () => {
  // Connect to database
  const client = await pool.connect();

  // Callback
  function cb(err, res) {
    if (err) throw err;

    if (res.rows.length > 0) {
      console.log("New GitHub tokens:");
      res.rows.forEach((row) => {
        console.log(row);
      });
    }
  }

  // Initialize table in transaction retry wrapper
  console.log("Initializing table...");
  await retryTxn(0, 15, client, initTable, cb);

  // Transfer funds in transaction retry wrapper
  console.log("Transferring funds...");
  await retryTxn(0, 15, client, checkForToken, cb);

  // Exit program
  process.exit();
})().catch((err) => console.log(err.stack));
