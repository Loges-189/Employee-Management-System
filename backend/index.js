const express = require("express");
require("dotenv").config();
const cors = require('cors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const db = require('./db');

const app = express();
app.use(cors()); // allow frontend access
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

//ROUTES
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/AuthRoutes')
app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    
})