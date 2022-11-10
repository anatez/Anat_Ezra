const path = require('path');
const express = require("express");
const app = express();
const port=8080;
const bodyParser = require("body-parser");
const sql = require("./db.js");
const connection = require('./db');
const CRUD_operations = require("./CRUD.js");
const fs = require('fs');
const CreateDB = require('./CreateDB');
const JSFunc = require('./funcs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('STATIC'));

//UsersDataBase
app.get('/CreateUsersTable',CreateDB.CreateUsersTable);
app.get('/ShowTable', CreateDB.ShowTable);
app.get('/DropTable', CreateDB.DropTable);

//BabySittersDataBase
app.get('/CreateBabySittersTable', CreateDB.CreateBabySittersTable);
app.get("/InsertData", CreateDB.InsertData);
app.get('/ShowBabySittersTable', CreateDB.ShowBabySittersTable);
app.get('/DropBabySittersTable', CreateDB.DropBabySittersTable);

//to create DB go to this page
app.get('/createDB', (req, res) => {
    res.render('createDB');
    });

//Route
app.get('/', (req,res)=>{
    res.redirect('loginPage');
    });
   
app.get('/loginPage', (req, res) => {
     res.render('loginPage');
    });

app.get('/signUp', (req, res) => {
    res.render('signUp');
  });

app.get('/serchePage', (req, res) => {
    res.render('serchePage');
  });

app.get('/Wating', (req, res) => {
    res.render('Wating');
  });

app.get('/Options', (req, res) => {
    res.render('Options');
  });

app.get('/DidntFind', (req, res) => {
    res.render('DidntFind');
  });

  app.get('/incorectLogin', (req, res) => {
    res.render('incorectLogin');
  });
  

//create new user
app.post("/createNewUser", CRUD_operations.createNewUser);

//login 
app.post("/auth", function(request, response) {
    let name = request.body.name;
    let password = request.body.password;
    let email= request.body.email;
    if (!request.body) {
        response.status(400).send({
        message: "Content can not be empty!"
        });
    }
    // Ensure the input fields exists and are not empty
    if (name && password) {
        connection.query('SELECT * FROM users WHERE name = ? AND password = ? AND email= ?', [name, password, email], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            //If the account exists
            if (results.length > 0) {
                request.body.name = name;
                response.redirect('/serchePage');
            } else {
                response.redirect('/incorectLogin');
               
            }			
            response.end();
            
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
      
    }
    });



//find BabySitter
app.post("/FindBabySitter", function(request, response) {
    let city = request.body.city;
    let experience = request.body.experience;
    let price = request.body.price;
    let distance = request.body.distance;
    let lat = request.body.lat;
    let long = request.body.long;
	if (city && experience && price ) {
		connection.query('SELECT * FROM babySitters WHERE city = ? AND experience >= ? AND price <= ?', [city, experience, price], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
                response.render('Options', {
                    pple: results
                });
			} else {
				response.redirect('/DidntFind');
			}			
			response.end();
		});
	} else if (lat && long && distance && !city && experience && price ) {
        connection.query('SELECT * FROM babySitters WHERE experience >= ? AND price <= ?', [experience, price], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
                console.log("distance:", distance);
                results.forEach((bs, index) => {
                    bs.distance = JSFunc.getDistanceFromLatLonInKm(lat, long, bs.lat, bs.blong);
                });
                results = results.filter(element => 
                    element.distance <= distance 
                )
                if (results.length == 0) {
                    response.redirect('/DidntFind');
                }
                else {
                    // Redirect to BaybySitterOption
                    response.render('Options', {
                        pple: results
                    });
                }
			} else {
				response.redirect('/DidntFind');
			}			
			response.end();
		});
    } else {
		response.send('Please enter Username and Password!');
		response.end();
    }
    });



app.listen(port,()=>{
    console.log("Server is running on port"+port)
});
