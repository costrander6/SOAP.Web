import './amplify.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Callback from './pages/Callback.jsx'
import Login from './pages/Login.jsx'
import RepoResults from './pages/RepoResults.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/login" element={<Login />} />
        <Route path= "/repo/:repo" element={<RepoResults />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)