import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

// while dev mode we can use browser router for better convenience
// for production we must use memory router
ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </RecoilRoot>
)
