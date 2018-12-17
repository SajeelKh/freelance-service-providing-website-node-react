const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errorMiddleware } = require('./middlewares');

async function main(){
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    let url = "mongodb://localhost/authDB";

    app.use(express.static(__dirname + "/public"));
    
    require('./routes')(app);
    
    app.use(errorMiddleware.leaf);
    
    try{
        let db = await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    }
    catch(err){
        console.log("Cannot Connect To Database:", err);
        process.exit(1);
    }

    app.listen('3001', () => {
        console.log("Listening On Port 3001...")
    })
}

main();