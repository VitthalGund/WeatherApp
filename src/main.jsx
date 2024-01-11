import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SetData from "./context/Data/SetData.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SetData>
      <App />
    </SetData>
  </React.StrictMode>,
)
