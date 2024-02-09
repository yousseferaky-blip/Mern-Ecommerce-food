const express = require("express")
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const UserRoute = require("./router/user")
const ProductRouter = require("./router/product")
const path = require('path');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log("Connected to the database successfully!");
}).catch((error) => {
    console.error("Error connecting to the database:", error.message);
});

app.use("/api",UserRoute)
app.use("/api",ProductRouter)


const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
