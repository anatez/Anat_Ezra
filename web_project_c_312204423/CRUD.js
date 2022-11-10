const sql = require("./db");

//CREATE USER
const createNewUser = function(req,res){
    if (!req.body) {
    res.status(400).send({
    message: "Content can not be empty!"
    });
    return;
    }
    const newUser = {
    "email": req.body.email,
    "password": req.body.password,
    "name": req.body.name
    };
    sql.query("INSERT INTO users SET ?", newUser, (err, mysqlres) => {
    if (err) {
    console.log("error: ", err);
    res.status(400).send({message: "error in creating user: " + err});
    return;
    }
    console.log("created user: ", { id: mysqlres.insertId, ...newUser });
    res.render('userCreated');
    return;
    });
    };

    
    module.exports = {createNewUser};

