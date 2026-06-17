import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


import 'bootstrap/js/index.esm.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
