import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-cerulean min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-8xl font-bold text-white">404</h1>
            <p className="text-xl text-white mt-12 font-semibold">We haven't mapped out this trip yet!</p>
            <button 
                className="mt-8 bg-accent-blue text-floral-white hover:bg-ocean-mist hover:scale-110 py-3 px-12 rounded-full transition duration-300 font-semibold text-lg cursor-pointer"
                onClick={() => navigate('/itinerarey')}
                >
                Go to Home
            </button>
        </div>
    );
}