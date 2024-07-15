const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
require('dotenv').config();
const applyRoutes = require('./routes')

app.use(express.json());

applyRoutes(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})