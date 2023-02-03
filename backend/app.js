const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');


const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');



const app = express();
require('dotenv').config();

mongoose.connect("mongodb+srv://Punityadav2512:" + process.env.DbPW + "@cluster0.rvw26.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database!')
    
})
.catch((err) => {
    
    console.log('connection failed')
})

app.use(cors({origin: "*"}));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/", express.static(path.join(__dirname, "/public")));


app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

app.use((req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
})

// const port = process.env.PORT || process.env.APP_PORT;


// // listen to app
// app.listen(port, () => {
//     console.log(`server is listening on port ${port}`);
// })
module.exports = app;