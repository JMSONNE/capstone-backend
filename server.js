const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
require('dotenv').config();
const applyRoutes = require('./routes')
const cors = require('cors');

app.use(cors({
    origin: 'https://javascripts-coffee.vercel.app', // Replace with your Vercel app URL
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(express.json());

applyRoutes(app);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})