const mysql = require('mysql');

class User {
  constructor(name, age, mobileNumber) {
    this.name = name;
    this.age = age;
    this.mobileNumber = mobileNumber;
  }
}

class UserModel {
  constructor(connection) {
    this.connection = connection;
  }

  static createTable(dbConnection) {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        mobileNumber VARCHAR(20) NOT NULL
      );
    `;

    dbConnection.query(query, (err) => {
      if (err) {
        console.error('Error creating users table:', err);
      } else {
        console.log('Users table created or already exists');
      }
    });
  }

  addUser(user) {
    const query = 'INSERT INTO users (name, age, mobileNumber) VALUES (?, ?, ?)';
    const values = [user.name, user.age, user.mobileNumber];

    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }

  getUserBy(id){
    const query = 'SELECT * FROM users WHERE id = ? LIMIT 1';
    const values = [id];
    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]); // Assuming there is at most one user with the given combination
        }
      });
    });
  }

  getUserById(name, age, mobileNumber) {
    const query = 'SELECT * FROM users WHERE name = ? AND age = ? AND mobileNumber = ?';
    const values = [name, age, mobileNumber];

    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]); // Assuming there is at most one user with the given combination
          // console.log(results[0]);
        }
      });
    });
  }
}

module.exports = {
  User,
  UserModel,
};
