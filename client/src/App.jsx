import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import CardsPage from './pages/CardsPage'
import './App.css'

//fetch data here and pass through routes
//search can just be using data
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/boards/:id" element={<CardsPage />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
