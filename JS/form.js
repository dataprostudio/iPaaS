const express = require('express');
const router = express.Router();
const pool = require('./server');

// Route to handle form submission
router.post('/', (req, res) => {
  const { name, telephone, email, message } = req.body;

  // Validate input data
  if (!name || !telephone || !email || !message) {
    return res.status(400).send('Please fill out all fields');
  }

  // Prepare SQL query to insert form data into database
  const query = {
    text: `
      INSERT INTO waiting_list (name, telephone, email, message1, message2, message3)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    values: [name, telephone, email, message1, message2, message3],
  };

  // Execute SQL query with input data
  pool.query(query, [name, telephone, email, message], (err, results) => {
    if (err) {
      return res.status(500).send('Error inserting form data');
    }

    res.send(`Form submitted successfully! ID: ${results.insertId}`);
  });
});

module.exports = router;