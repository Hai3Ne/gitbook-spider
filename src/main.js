import React from 'react'
import ReactDOM from 'react-dom/client'
import PDFConverter from './components/PDFConverter'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PDFConverter />
  </React.StrictMode>,
)