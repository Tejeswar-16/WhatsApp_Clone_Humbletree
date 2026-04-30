const express = require('express');
const router = require("./routes/routes.js");
const cors = require("cors");
const connectDB = require("./config/db.js");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api',router);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});