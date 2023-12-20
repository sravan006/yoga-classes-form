// src/components/PaymentStatus.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams ,useNavigate} from 'react-router-dom';
require('dotenv').config();
const backendUrl = process.env.BACKEND_URL;

const PaymentStatus = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation();
//   console.log('Location:', location);
//   const params = useParams();
  // eslint-disable-next-line no-restricted-globals
const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const paymentId = searchParams.get('paymentId');
        // console.log(paymentId);
        const response = await axios.get(`${backendUrl}/api/payment-status?paymentId=${paymentId}`);
        // console.log(response)

        setPaymentStatus(response.data);
      } catch (error) {
        console.error('Error fetching payment status:', error);
      }
    };

    fetchData();
  }, [location]); // The empty dependency array ensures that this effect runs only once after the component mounts

  const handleRedirect = () => {
    // Redirect to the home page
    navigate(`/`);
  };

  return (
    <div>
      <h1>Payment Status</h1>
      {paymentStatus ? (
        <div>
          <p>User Name: {paymentStatus.username}</p>
          <p>selected Month: {paymentStatus.selectedMonth.substring(0,7)}</p>
          <p>Batch:{paymentStatus.batch}</p>
          <p>Status: {paymentStatus.success ? 'Payment successful' : 'Payment failed'}</p>
          <button onClick={handleRedirect}>Register for a friend ?</button>
        </div>
      ) : (
        <p>Loading payment status...</p>
      )}
    </div>
  );
};

export default PaymentStatus;
