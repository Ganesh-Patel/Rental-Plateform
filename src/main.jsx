import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PropertiesContext } from './Components/MyContext/PropertiesContext.js'
import properties from './Components/Data/Properties.js'
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Components/MyContext/CartContext'
import { AuthProvider } from './Components/MyContext/Authcontext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookingProvider } from './Components/MyContext/BookingContext.jsx'

console.log(properties)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
      />
      <AuthProvider>
        <PropertiesContext.Provider value={{ properties }}>
          <BookingProvider>
            <CartProvider >
              <App />
            </CartProvider>
          </BookingProvider>
        </PropertiesContext.Provider>
      </AuthProvider>

    </Router>
  </StrictMode>,
)
