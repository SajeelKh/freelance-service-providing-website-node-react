const express = require('express');
const mongoose = require('mongoose');

function main(){
    const app = express();
    const authRoute = express.Router();
    app.use('/auth', authRoute);
    let url = "mongodb://localhost/authDB";

    app.use(express.static(__dirname + "/public"));

    try{
        let db = await mongoose.connect(url);
    }
    catch(err){
        console.log("Cannot Connect To Database:", err);
        process.exit(1);
    }

    app.listen('3000', () => {
        console.log("Listening On Port 3000...")
    })
}

main();