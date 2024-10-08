import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import { UserProvider } from './contexts/UserContext'; 
import { LandingPage } from './Components/LandingPage/LandingPage';
import SignUp from './Components/SignUp/SignUp';
import ListerDashboard from './Components/Dashboards/ListerDashboard';
import BuyRentDashboard from './Components/Dashboards/BuyRentDashboard/BuyRentDashboard';
import Billings from './Components/Dashboards/AddProperty/Billing/Billings';
import PropertyForm4 from './Components/Dashboards/AddProperty/PropertyForm4';
// import { FirebaseAuthProvider } from './FirebaseAuthContext';

const App: React.FC = () => {

  
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listerdashboard" element={<ListerDashboard />} />
        <Route path="/buyrentdashboard" element={<BuyRentDashboard />} />
        <Route path="/billings" element={<Billings />} />
        <Route path="/propertyf4" element={<PropertyForm4 />} />
      </Routes>
    </Router>
    </UserProvider>
  );
  
};

export default App;
