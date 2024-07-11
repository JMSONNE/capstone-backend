const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000
require('dotenv').config();

app.use(express.json());

app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})