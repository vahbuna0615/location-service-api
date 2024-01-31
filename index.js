const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const locationRouter = require('./routes/locationRouter');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api', locationRouter);

app.listen(4040, () => {
  console.log(`Listening on port 4040`)
});