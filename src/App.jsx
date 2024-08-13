import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Home from './Components/Home/home';
import Properties from './Components/AllPages/Properties/Properties';
import Cart from './Components/AllPages/Cart/Cart';
import Account from './Components/AllPages/Account/Account';
import Footer from './Components/Footer/Footer.jsx';
import PropertyDetails from './Components/AllPages/Properties/ProperyDetails/PropertyDetails.jsx';
import Login from './Components/Auth/Login.jsx';
import SignUp from './Components/Auth/SignUp.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </ div>
  );
}

export default App;
