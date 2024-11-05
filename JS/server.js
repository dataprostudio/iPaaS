const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/form', (req, res) => {
  const name = req.body.name;
  const telephone = req.body.telephone;
  const email = req.body.email;
  const message1 = req.body.message1;
  const message2 = req.body.message2;
  const message3 = req.body.message3;

  // PostgreSQL connection setup
  const { Pool } = require('pg');
  const pool = new Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
  });

  // Insert data into PostgreSQL
  const query = {
    text: `INSERT INTO waiting_list (name, telephone, email, message1, message2, message3)
           VALUES ($1, $2, $3, $4, $5, $6)`,
    values: [name, telephone, email, message1, message2, message3],
  };

  pool.query(query, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    console.log('Data inserted successfully');
    res.send('Form submitted successfully!');
  });

  // Close the database connection pool
  pool.end();
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
