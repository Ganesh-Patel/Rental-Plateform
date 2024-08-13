import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PropertiesContext } from './Components/MyContext/PropertiesContext.js'
import properties from './Components/Data/Properties.js'
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Components/MyContext/CartContext'

console.log(properties)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <PropertiesContext.Provider value={{ properties }}>
      <CartProvider >
         <App />
      </CartProvider>
    </PropertiesContext.Provider>

    </Router>
  </StrictMode>,
)
