const express = require('express');
const app = express();
const formsRouter = require('./forms');
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Route to handle form submission
app.post('/form', (req, res) => {
  const { name, telephone, email, message1, message2, message3 } = req.body;

  // Validate input data
  if (!name || !telephone || !email || !message1 || !message2 || !message3) {
    return res.status(400).send('Please fill out all fields');
  }

  const query = {
    text: `
      INSERT INTO waiting_list (name, telephone, email, message1, message2, message3)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    values: [name, telephone, email, message1, message2, message3],
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error inserting form data');
    }
    console.log('Data inserted successfully');
    res.send(`Form submitted successfully! ID: ${res.rows.insertId}`);
  });

  // Close the database connection
  pool.end();
});

app.use('/form', formsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});