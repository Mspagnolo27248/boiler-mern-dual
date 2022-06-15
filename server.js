const express = require('express')
const dotenv = require('dotenv').config();
const path = require('path')



require('dotenv').config({ path: path.resolve(__dirname, './.env') });




const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

//Based on env server build
const NODE_ENV = process.env.NODE_ENV
if(NODE_ENV==="prod"){
    app.use(express.static(path.resolve(__dirname, "./client/build")));
}






//Database Connections
const mongoose = require('mongoose')
const userSchema = require('./models/User')
const pw = process.env.PASSWORD
const dbUrl = "mongodb+srv://mspagnolo-admin:"+pw+"@cluster0.lxizv.mongodb.net/BirthdayApp?retryWrites=true&w=majority"
mongoose.connect(dbUrl)
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));
const User = mongoose.model("User", userSchema)



app.get("/", (req, res) => {
    console.log('Server API data here')
    res.send({test:"Mike"})
})






//Use the WebApi to server of react client files
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {       
  

    console.log(`App Listening on ${port}`)
    console.log(dbUrl)


})
