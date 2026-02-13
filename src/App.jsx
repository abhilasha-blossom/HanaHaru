import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CharacterLibrary from './pages/CharacterLibrary';
import Practice from './pages/Practice';
import Games from './pages/Games';
import Garden from './pages/Garden';
import { ProgressProvider } from './context/ProgressContext';
import './styles/variables.css'; // Ensure variables are loaded

function App() {
  return (
    <ProgressProvider>
      <Router>
        <div style={{ minHeight: '100vh', position: 'relative' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/characters" element={<CharacterLibrary />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/games" element={<Games />} />
            <Route path="/garden" element={<Garden />} />
          </Routes>
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
