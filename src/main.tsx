import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ServicesPage from './pages/Services.tsx';
import OfertaLunii from './pages/OfertaLunii.tsx';
import TratamenteCAS from './pages/TratamenteCAS.tsx';
import TurismDentar from './pages/TurismDentar.tsx';
import PlataRate from './pages/PlataRate.tsx';
import Programare from './pages/Programare.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/servicii" element={<ServicesPage />} />
        <Route path="/oferta-lunii" element={<OfertaLunii />} />
        <Route path="/tratamente-cas" element={<TratamenteCAS />} />
        <Route path="/turism-dentar" element={<TurismDentar />} />
        <Route path="/plata-rate" element={<PlataRate />} />
        <Route path="/programare" element={<Programare />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
