import Hero from './components/Hero'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <>
        <body id="center" className="bg-floral-white">
            <Navbar />
            <Hero />
            <h1 className="text-3xl font-bold text-cerulean mt-24">The better way to plan out your trips!</h1>
        </body>
    </>
  )
}
