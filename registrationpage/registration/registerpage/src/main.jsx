import React from 'react'
import ReactDOM from 'react-dom/client'


// import App from './App.jsx'
import './index.css'
import { Browser } from './browser'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Browser></Browser>
  </React.StrictMode>,
)
