const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const locationRouter = require('./routes/locationRouter');
const userRouter = require('./routes/userRouter');
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/', locationRouter);
app.use('/users', userRouter);

app.use(errorHandler);


app.listen(PORT, () => {
  //console.log(`Listening on port ${PORT}`);
});

module.exports = app;


