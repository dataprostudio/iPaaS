const express = require('express');
const app = express();
const port = 3000;

app.post('/form', (req, res) => {
  const name = req.body.name;
  const telephone = req.body.Telephone;
  const email = req.body.email;
  const message1 = req.body.message;
  const message2 = req.body.message;
  const message3 = req.body.message;

  // Connect to your PostgreSQL database
  const { Pool } = require('pg');
  const pool = new Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
  });

  // Insert the data into the database
  const query = {
    text: `INSERT INTO waiting_list (name, telephone, email, message1, message2, message3)
            VALUES ($1, $2, $3, $4, $5, $6)`,
    values: [name, telephone, email, message1, message2, message3],
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Data inserted successfully');
  });

  // Close the database connection
  pool.end();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});