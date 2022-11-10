
const sql = require("./db");
const path = require('path');
const csv=require('csvtojson');

//USERS
const CreateUsersTable = (req,res)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS users (name VARCHAR(255) NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL, password int(8) NOT NULL)";
    sql.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created table');
        res.send("table created");
        return;
    })      
}


const ShowTable = (req,res)=>{
    var Q3 = "SELECT * FROM users";
    sql.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};


const DropTable = (req, res)=>{
    var Q4 = "DROP TABLE users";
    sql.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}

//BabySitters
const CreateBabySittersTable = (req,res)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS babySitters (email varchar(255) NOT NULL PRIMARY KEY, name varchar(255) NOT NULL,stars float (2) NOT NULL, city varchar(255) NOT NULL, age float (3) NOT NULL, price int (2) NOT NULL, phone int (20) NOT NULL, experience int(2) NOT NULL, img varchar(255), blong varchar(255), lat varchar(255))";
    sql.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created table');
        res.send("table created");
        return;
    })      
}


const InsertData = (req,res)=>{
    var Q2 = "INSERT INTO babySitters SET ?";
    const csvFilePath= path.join(__dirname, "data.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "email": element.email,
            "name": element.name,
            "stars": element.stars,
            "city": element.city,
            "age": element.age,
            "price": element.price, 
            "phone": element.phone,
            "experience": element.experience,
            "img": element.img,
            "blong": element.blong,
            "lat": element.lat
        }
        sql.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
 


const ShowBabySittersTable = (req,res)=>{
    var Q3 = "SELECT * FROM babySitters";
    sql.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};


const DropBabySittersTable = (req, res)=>{
    var Q4 = "DROP TABLE babySitters";
    sql.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}


module.exports = {CreateUsersTable, ShowTable,DropTable, CreateBabySittersTable, ShowBabySittersTable, DropBabySittersTable, InsertData};