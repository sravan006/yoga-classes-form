const mysql = require('mysql');

class Payment {
  constructor(userId, selectedBatch, selectedMonth) {
    this.userId = userId;
    this.selectedBatch = selectedBatch;
    this.selectedMonth = selectedMonth;
  }
}

class PaymentModel {
  constructor(connection) {
    this.connection = connection;
  }

  static createTable(dbConnection) {
    const query = `
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        selectedBatch VARCHAR(50) NOT NULL,
        selectedMonth VARCHAR(50) NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `;

    dbConnection.query(query, (err) => {
      if (err) {
        console.error('Error creating payments table:', err);
      } else {
        console.log('Payments table created or already exists');
      }
    });
  }

  addPayment(payment) {
    const query = 'INSERT INTO payments (userId, selectedBatch, selectedMonth) VALUES (?, ?, ?)';
    // const formattedMonth = payment.selectedMonth+'-01';
    const values = [payment.userId, payment.selectedBatch, payment.selectedMonth];

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

  getPaymentById(paymentId){
    const query = 'SELECT * FROM payments WHERE  id = ?';
    const values = [paymentId];

    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  getPaymentsByUserIdAndBatch(userId, selectedBatch, selectedMonth) {
    const query = 'SELECT * FROM payments WHERE userId = ? AND selectedBatch = ? AND selectedMonth = ?';
    // const formattedMonth = payment.selectedMonth+'-01';
    const values = [userId, selectedBatch, selectedMonth];

    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = {
  Payment,
  PaymentModel,
};
