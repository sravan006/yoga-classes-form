import React from 'react'
import AdmissionForm from './component/AddmissionForm';
import PaymentStatus from './component/PaymentStatus';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AdmissionForm />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
      </Routes>
    </Router>
  );
}
// ReactDOM.render(<App />, document.getElementById('root'));
export default App