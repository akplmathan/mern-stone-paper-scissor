const express = require('express');
const app = express();
const port = 4000;
const connectDB = require('./config/db');
const gameRouter = require("./routes/gameRoute")
const cors = require('cors')

connectDB()

app.use(express.json());
app.use(cors());
app.use('/api',gameRouter);
app.get('/',(req,res)=>{
    res.send("Server is Working...")
})

app.listen(port,()=>{
    console.log(`Server is Up And Running with http://localhost:${port}`);
})