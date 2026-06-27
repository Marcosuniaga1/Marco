import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Gracias from './pages/Gracias'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/gracias" element={<Gracias />} />
      </Routes>
    </BrowserRouter>
  )
}
