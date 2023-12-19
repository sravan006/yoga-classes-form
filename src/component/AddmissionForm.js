import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Remove this line
import '../AddmissionForm.css'; // Import the styles
import { useNavigate } from 'react-router-dom';


const AdmissionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mobileNumber: '',
    selectedBatch: '',
    selectedMonth: new Date(),
  });

  const [ageError, setAgeError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const [responseMessage, setResponseMessage] = useState(''); // Declare the state variable

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate age and set error message
    if (e.target.name === 'age') {
      const age = parseInt(e.target.value, 10);
      if (age < 16 || age > 65) {
        setAgeError('Only for 16-65 age group');
      } else {
        setAgeError('');
      }
    }
    
    // Validate number and set error message
    if (e.target.name === 'mobileNumber') {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(e.target.value)) {
        setMobileError('Please enter a valid 10-digit mobile number');
      } else {
        setMobileError('');
      }
    }

  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().slice(0, 7);
    setFormData({ ...formData, selectedMonth: date });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ageError || mobileError || !formData.name || !formData.selectedBatch || !formData.selectedMonth) {
      console.log('Form has validation errors. Please check.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/submit-form', formData);

      setResponseMessage(response.data.message);
      // console.log(response)
      if (response.data.message=="") {
        // Use the navigate function to navigate to the payment status page
        // console.log(response.data);
        navigate(`/payment-status?paymentId=${response.data.paymentId}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('An error occurred while submitting the form.');
    }
  };

  // Calculating the max date to allow only 12 months from the current month
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 11);

  return (
    <div>
      <h1>Yoga Classes</h1>
      <p className="subscript">Grab your seat now</p>
      {responseMessage && <span className="error-message">{responseMessage}</span>}
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        {ageError && <span className="error-message">{ageError}</span>}
      </label>
      <br />
      <label>
        Mobile Number:
        <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
        {mobileError && <span className="error-message">{mobileError}</span>}
      </label>
      <br />
      <label>
        Select Month:
        <DatePicker
          selected={formData.selectedMonth}
          onChange={handleDateChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          minDate={new Date()} // To restrict before today's date
          maxDate={maxDate}     // To restrict beyond 12 months from today
          required
        />
      </label>
      <br />
      <label>
        Select Batch:
        <select name="selectedBatch" value={formData.selectedBatch} onChange={handleChange} required>
          <option value="">Select Batch</option>
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>
      </label>
      <br />
      <button type="submit" >Make Payment</button>
    </form>
    
    
    </div>
  );
};

export default AdmissionForm;
