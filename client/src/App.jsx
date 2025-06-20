import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import CardsPage from './pages/CardsPage'
import LightDarkToggle from './components/LightDarkToggle';
import './App.css'

function App() {
  return (
    <HashRouter>

      <LightDarkToggle />

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/boards/:id" element={<CardsPage />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
