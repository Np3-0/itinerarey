import { useState, useEffect } from "react";
import Navbar from "../partials/Navbar";
import getFlightDataFromAPI from "../../utils/getFlightDataFromAPI";
import { getCookie } from "../../utils/cookies.ts";

export default function Flights() {
    const [flights, setFlights] = useState<unknown>(null);

    // checks to see if the cookie exists, routes to home page if not. if it does, sends data to flight API.
    useEffect(() => {
        const fetchFlightData = async () => {
            const cookie = getCookie("tripInfo");
            if (!cookie) {
                window.location.href = "/";
                return;
            }

            const { origin, destination, dates } = cookie;
            const res = await getFlightDataFromAPI(origin, destination, dates.startDate);
            setFlights(res);
        };

    fetchFlightData();
}, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen bg-cerulean">
                <h1 className="text-4xl font-bold text-heading text-white">Flights</h1>
                <p className="text-lg text-white mt-4">This is the Flights page.</p>
                {flights ? (
                    <div className="mt-6 w-full max-w-4xl bg-floral-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-heading mb-4">Available Flights</h2>
                        
                    </div>
                ) : (
                    <p className="text-lg text-white mt-4">Loading flight data...</p>
                )}
            </div>
        </>
    );
}