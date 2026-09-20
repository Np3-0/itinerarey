import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home.tsx'
import Planner from './components/pages/Planner.tsx'
import NotFound from './components/pages/NotFound.tsx'
import Flights from './components/pages/Flights.tsx'
import Hotels from './components/pages/Hotels.tsx'
import Activities from './components/pages/Activities.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan/*" element={<Planner />} />
        <Route path="/flights/*" element={<Flights />} />
        <Route path="/hotels/*" element={<Hotels />} />
        <Route path="/activities/*" element={<Activities />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
