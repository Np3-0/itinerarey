import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/itinerarey" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
