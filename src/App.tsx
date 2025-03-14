import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "sonner";
import Index from './pages/Index';
import Vulnerabilities from './pages/Vulnerabilities';
import ThreatModels from './pages/ThreatModels';
import NotFound from './pages/NotFound';
import SecurityTesting from './pages/SecurityTesting';  // Import the new component
import './App.css';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
        <Route path="/threat-models" element={<ThreatModels />} />
        <Route path="/security-testing" element={<SecurityTesting />} />  {/* New route added */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
