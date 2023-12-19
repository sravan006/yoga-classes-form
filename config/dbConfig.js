const mysql = require('mysql');
const url = require('url');
require('dotenv').config(); 
const { UserModel} = require('../models/User.js'); 
const { PaymentModel } = require('../models/Payment.js'); 
const dbUrl = process.env.MYSQL_URL;
const dbhost = process.env.DB_HOST;
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const dbdatabase = process.env.DB_DATABASE;
let dbConnection;
if(dbUrl){
    dbConnection=mysql.createConnection(dbUrl);
}
else{
dbConnection = mysql.createConnection({
  host: 'localhost',// change according to requirement
  user: 'root',
  password: 'zxcvb12345',
  database: 'yoga_classes'
});
}
  
  dbConnection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
  
    console.log('Connected to MySQL database');
  
    // Create the database if it doesn't exist
    // dbConnection.query('CREATE DATABASE IF NOT EXISTS yoga_classes', (err) => {
    //   if (err) {
    //     console.error('Error creating database:', err);
    //     return;
    //   }
  
    //   console.log('Database created or already exists');
  
    //   // Switch to the yoga_classes database
    //   dbConnection.query('USE yoga_classes', (err) => {
    //     if (err) {
    //       console.error('Error switching to yoga_classes database:', err);
    //       return;
    //     }
  
    //     console.log('Using yoga_classes database');
  
    //     // Create tables if they don't exist
        
    //   });
    // });

    UserModel.createTable(dbConnection);
    PaymentModel.createTable(dbConnection);
  });
module.exports = dbConnection;
