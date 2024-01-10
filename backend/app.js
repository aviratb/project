const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
