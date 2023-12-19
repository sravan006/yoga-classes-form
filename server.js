const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./config/dbConfig')

const { User, UserModel ,  } = require('./models/User.js'); 
const { Payment, PaymentModel } = require('./models/Payment.js'); 

const app = express();
const port = process.env.PORT || 3001; // Change the port as needed

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Initialize User and Payment models
const userModel = new UserModel(dbConnection);
const paymentModel = new PaymentModel(dbConnection);

// API endpoint to handle form submission
app.post('/api/submit-form', async (req, res) => {
  const formData = req.body;

  // Validate age on the server-side
  const age = parseInt(formData.age, 10);
  if (age < 18 || age > 65) {
    return res.status(400).json({ error: 'Only for 18-65 age group' });
  }

  try {
    // Check if the user already exists
    let user = await userModel.getUserById(formData.name,formData.age,formData.mobileNumber);
    if (!user) {
      // If not, add the user to the database
      const newUser = new User(formData.name, formData.age, formData.mobileNumber);
      const userId = await userModel.addUser(newUser);
      user = { id: userId, ...newUser };
    } else {
      // If user already exists, you can choose to update the user details if needed
      // For now, let's assume you don't want to update the user details
      // console.log('User already exists:', user);
    }
    const formattedMonth = new Date(formData.selectedMonth).toISOString().slice(0, 7);
    // Check if the payment already exists
    const existingPayments = await paymentModel.getPaymentsByUserIdAndBatch(user.id, formData.selectedBatch, formattedMonth);
    // console.log(existingPayments);
    if (existingPayments.length > 0) {
      // console.log('payment already done');
      const paymentId = existingPayments[0].id;
      // console.log(existingPayments[0].id);
      return res.status(200).json({ success: true, userId: user.id,paymentId: paymentId,message: 'you have already paid for this batch in selected month'});
    }

    // If not, add the payment to the database
    // console.log(formattedMonth)
    const newPayment = new Payment(user.id, formData.selectedBatch, formattedMonth);
    const paymentId = await paymentModel.addPayment(newPayment);
    return res.status(200).json({ success: true, userId: user.id, paymentId: paymentId ,message:''});
  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to handle payment-status
app.get('/api/payment-status', async (req, res) => {
  try {
    const paymentId  = req.query.paymentId;
    // console.log('paymentId in payment status api - ',paymentId);
    // Get payment details by paymentId
    const payment = await paymentModel.getPaymentById(paymentId);
    // console.log(payment);
    if (payment.length<=0) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Get user details by userId from payment
    const user = await userModel.getUserBy(payment.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prepare response data
    const responseData = {
      success: true,
      message: 'yay you made it !!',
      username: user.name,
      batch: payment.selectedBatch,
      selectedMonth: payment.selectedMonth,
      paymentStatus: 'Payment successful', // You might want to check the payment status in your database
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching payment status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
