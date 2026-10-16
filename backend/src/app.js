require("dotenv").config();
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const router = require('../routes/listingRoutes');
const authRoutes = require('../routes/authRoutes');
const app = express();
app.use(cors({
    origin: "https://campus-marketplace-1-826i.onrender.com",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/listings', router);


module.exports = app;