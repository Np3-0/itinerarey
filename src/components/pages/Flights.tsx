import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../partials/Navbar";
import { getFlightDataFromAPI, filterFlights } from "../../utils/getFlightDataFromAPI";
import { getCookie } from "../../utils/cookies.ts";
import type { FlightRes } from "../../data/FlightTypes.ts"
import type { cookieData } from "../../data/cookieType.ts"
import Flight from "../partials/Flight";

export default function Flights() {
    const navigate = useNavigate();
    const [flights, setFlights] = useState<FlightRes | null>(null);
    const [cookieData, setCookieData] = useState<cookieData | null>(null);

    // checks to see if the cookie exists, routes to home page if not. if it does, sends data to flight API.
    useEffect(() => {
        const fetchFlightData = async () => {
            const cookie = getCookie("tripInfo");
            if (!cookie) {
                window.location.href = "/";
                return;
            }
            setCookieData(cookie);

            const { origin, destination, dates } = cookie;
            const res = await getFlightDataFromAPI(origin, destination, dates.startDate);
            setFlights(res);
            setFlights(filterFlights(res, cookie));
        };

        fetchFlightData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-cerulean">
                <h1 className="text-4xl font-bold text-heading text-white mt-18">Flights for {cookieData?.dates.startDate}</h1>
                <p className="text-lg text-white mt-4 font-semibold">Choose your flight!</p>
                {flights ? (
                    <div className="mt-6 w-full max-w-4xl bg-accent-blue rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-heading mb-4 text-white">Available Flights: {flights.flights.length}</h2>
                        {flights.flights.length === 0 ? (
                            <>
                                <p className="text-lg text-white mt-4">No flights available for the selected dates. Please change your planned information.</p>
                                <button 
                                    className="bg-floral-white text-cerulean hover:scale-110 py-3 px-12 rounded-full transition duration-300 font-semibold text-lg cursor-pointer" 
                                    onClick={() => navigate("/plan")}
                                >
                                    Go back
                                </button>
                            </>
                            
                        ) : (<>
                            {flights.flights.map((flight, index) => (
                                <Flight key={index} flight={flight} />
                            ))}
                        </>)}   
                    </div>
                ) : (
                    <p className="text-lg text-white mt-4">Loading flight data... This might take a minute!</p>
                )}
            </div>
        </>
    );
}