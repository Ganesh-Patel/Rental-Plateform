import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Header/Header.jsx';
import Home from './Components/Home/home';
import Properties from './Components/AllPages/Properties/Properties';
import Cart from './Components/AllPages/Cart/Cart';
import Account from './Components/AllPages/Account/Account';
import Footer from './Components/Footer/Footer.jsx';
import PropertyDetails from './Components/AllPages/Properties/ProperyDetails/PropertyDetails.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Routes>
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
