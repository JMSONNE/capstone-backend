const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000
require('dotenv').config();
const productRoutes = require('./API');

app.use(express.json());

productRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})