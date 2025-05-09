// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather/:geonameId" element={<Weather />} />
    </Routes>
  );
}
