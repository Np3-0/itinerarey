import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home.tsx'
import Planner from './components/pages/Planner.tsx'
import NotFound from './components/pages/NotFound.tsx'
import Flights from './components/pages/Flights.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/itinerarey" element={<Home />} />
        <Route path="/itinerarey/plan/*" element={<Planner />} />
        <Route path="/itinerarey/flights/*" element={<Flights />} />
        <Route path="/itinerarey/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
