const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const users = require("./routers/api/users");
const profile = require("./routers/api/profile");
const posts = require("./routers/api/posts");

//Body-parser middleware
app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

//Database config
const db = require("./config/key").mongoURI;

//DB Connecting
mongoose
    .connect(db)
    .then(()=>console.log("DB connected"))
    .catch(err=>console.log(err));

app.get("/",(req , res )=>{
    res.send("Hello SERVER!!! !");
});

//Routers
app.use("/api/users" , users);
app.use("/api/profile" , profile);
app.use("/api/posts" , posts);

const port = process.env.PORT || 5000;

app.listen(port , ()=>{
    console.log(`Server running on port ${port}`);
});