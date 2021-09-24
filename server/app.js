const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');

const DB_URL = 'MongoDB URL';

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, { useNewUrlParser: true }).then(
   () => {
      console.log('Database is connected');
   },
   (err) => {
      console.log('Can not connect to the database' + err);
   }
);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', authRoutes);

module.exports = app;

app.listen(PORT, function () {
   console.log('Server is running on Port:', PORT);
});
