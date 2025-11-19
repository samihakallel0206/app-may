const express = require("express");

const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = require("./config/connectDB");
connectDB();
// Routes
app.use('/api/auth', require('./routes/auth_route'));
app.use('/api/users', require('./routes/users'));
app.use('/api/forfaits', require('./routes/forfaits'));
app.use('/api/products', require('./routes/products'));
app.use('/api/challenges', require('./routes/challenges'));
// app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
