import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../partials/Navbar.tsx";
import Flight from "../partials/Flight.tsx";
import Button from "../partials/Button.tsx";
import { getFlightDataFromAPI, filterFlights } from "../../utils/getFlightDataFromAPI.ts";
import { getCookie, saveCookie } from "../../utils/cookies.ts";
import type { FlightRes, FlightType } from "../../data/FlightTypes.ts";
import type { cookieData } from "../../data/cookieType.ts";


export default function Flights() {
    const navigate = useNavigate();
    const [flights, setFlights] = useState<FlightRes | null>(null);
    const [cookieData, setCookieData] = useState<cookieData | null>(null);
    const [selectedFlight, setSelectedFlight] = useState<FlightType | null>(null);
    const [flightNum, setFlightNum] = useState<number>(0);

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
            const date = flightNum === 0 ? dates.startDate : dates.endDate;
            const res = await getFlightDataFromAPI(origin, destination, date);
            setFlights(res);
            setFlights(filterFlights(res, cookie));
        };

        fetchFlightData();
    }, [flightNum]);

    const handleFlightSubmission = () => {
        if (!selectedFlight || !cookieData) return;
        const date = selectedFlight.legs[0].departure.split(" ")[0];
        if (date === cookieData.dates.startDate) {
            saveCookie({ ...cookieData, flights: { ...cookieData.flights, departure: selectedFlight } }, "tripInfo");
            setFlightNum(1);
        } else if (date === cookieData.dates.endDate) {
            saveCookie({ ...cookieData, flights: { ...cookieData.flights, return: selectedFlight } }, "tripInfo");
            navigate("/itinerarey/hotels");
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-cerulean">
                <h1 className="text-4xl font-bold text-heading text-white mt-18">Flights for {flightNum === 0 ? cookieData?.dates.startDate : cookieData?.dates.endDate}</h1>
                <p className="text-lg text-white my-4 font-semibold">Choose your flight!</p>
                {selectedFlight && (
                    <Button text="Continue" onClick={() => {handleFlightSubmission()}} colorway="primary" />
                )}
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
                                <Flight key={index} flight={flight} onChosen={() => setSelectedFlight(flight)} selected={selectedFlight === flight} />
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