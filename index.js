require('dotenv').config();
const express = require('express');
const mondaySdk = require('monday-sdk-js');

const app = express();
const monday = mondaySdk({ token: process.env.MONDAY_API_TOKEN });

const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const response = await monday.api(`query {
      boards (limit:10) {
        id
        name
      }
    }`);
    res.json(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
