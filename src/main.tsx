import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';

// Lazy load pages for better performance
const App = lazy(() => import('./App.tsx'));
const ServicesPage = lazy(() => import('./pages/Services.tsx'));
const OfertaLunii = lazy(() => import('./pages/OfertaLunii.tsx'));
const TratamenteCAS = lazy(() => import('./pages/TratamenteCAS.tsx'));
const TurismDentar = lazy(() => import('./pages/TurismDentar.tsx'));
const PlataRate = lazy(() => import('./pages/PlataRate.tsx'));
const Programare = lazy(() => import('./pages/Programare.tsx'));

// Simple loading fallback that matches the background
const PageLoader = () => (
  <div className="min-h-screen w-full bg-cream flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/servicii" element={<ServicesPage />} />
          <Route path="/oferta-lunii" element={<OfertaLunii />} />
          <Route path="/tratamente-cas" element={<TratamenteCAS />} />
          <Route path="/turism-dentar" element={<TurismDentar />} />
          <Route path="/plata-rate" element={<PlataRate />} />
          <Route path="/programare" element={<Programare />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
