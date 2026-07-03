import Hero from '../sections/Hero.tsx'
import Navbar from '../partials/Navbar.tsx'

export default function Home() {
  return (
    <>
      <div className="bg-cerulean">
        <Navbar />
        <Hero />
        <div id="about" className="w-full flex flex-col lg:flex-row mx-auto items-center justify-center py-10">
          <div className="w-full lg:w-1/2 px-4 mx-6 bg-accent-blue rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-floral-white mb-4 ml-4">Itinerarey</h1>
            <p className="text-floral-white text-lg font-semibold ml-4">The better way to plan out your trips!</p>
            <p className="text-floral-white text-lg font-semibold ml-4 mt-4">When going on vacation, spending hours planning every moment can be exhausting. Itinerarey simplifies the process to just a few clicks!</p>
            <p className="text-floral-white text-lg font-semibold ml-4 mt-4">Itinerarey works by employing APIs to get information on flights, hotels, traveling, and more, and then uses AI to help find activities to do! No information is saved on the website to keep your data private, and all purchases are linked to appropriate platforms.</p>
            
          </div>
          <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0">
            <img src="/itinerarey/travel.jpg" alt="Travel" className="rounded-lg shadow-lg" />
          </div>
        </div>

        <div className="w-full mt-12 flex flex-col items-center justify-center py-10 rounded-lg shadow-lg p-8" id="go">
          <h1 className="text-3xl font-bold text-floral-white mb-4">Stop spending time planning your trips.</h1>
          <button className="bg-accent-blue text-floral-white hover:bg-ocean-mist hover:scale-110 py-3 px-12 rounded-full transition duration-300 font-semibold text-lg cursor-pointer">
            Want to get started?
          </button>
        </div>
      </div>
    </>
  )
}