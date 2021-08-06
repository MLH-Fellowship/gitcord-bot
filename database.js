// For secure connection:
const fs = require('fs');
const { Pool } = require("pg");

// For sensitive information
require("dotenv").config();

module.exports = {
  // Configure the database connection.
  execute (discord_id){
    console.log(discord_id);
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

  // This automatically re-calls the operation with
  // the client as an argument as long as the database server asks for
  // the transaction to be retried.

  async function retryTxn(n, max, client, operation, callback, discord_id) {
    await client.query("BEGIN;");
    while (true) {
      n++;
      if (n === max) {
        throw new Error("Max retry count reached.");
      }
      try {
        await operation(client, callback, discord_id);
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

  async function initTable(client, callback, discord_id) {
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

  async function checkForToken(client, callback, discord_id) {
    const selectGitHubToken = "SELECT github_token FROM github_tokens WHERE id = " + discord_id + ";"; // SQL INJECTION POSSIBLE (FIX ASAP)
    console.log(selectGitHubToken);
    const query = await client.query(selectGitHubToken, (err, res) => {
      if (err) {
        return false;
      } else if (res.rows.length === 0) {
        console.log('GitHub token not found in table');
        return false;
      }
      var token = res.rows[0].github_token;
      return token;
    });

    console.log("QUERY " + query);
  }
    // Run the transactions in the connection pool
    (async () => {
      // Connect to database
      const client = await pool.connect();

      // Callback
      function cb(err, res) {
        if (err) throw err;

        if (res.rows.length > 0) {
          console.log("Current GitHub tokens:");
          res.rows.forEach((row) => {
            console.log(row);
          });
        }
      }

      // Initialize table in transaction retry wrapper
      console.log("Initializing table...");
      await retryTxn(0, 15, client, initTable, cb);

      // Transfer funds in transaction retry wrapper
      console.log("Checking for tokens...");
      await retryTxn(0, 15, client, checkForToken, cb, discord_id);

      // Exit program
      process.exit();
    })().catch((err) => console.log(err.stack));
  }
};
