import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ProposalPage from './pages/ProposalPage.tsx'
import ProposalB2CPage from './pages/ProposalB2CPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/example" element={<ProposalPage />} />
        <Route path="/example2" element={<ProposalB2CPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
