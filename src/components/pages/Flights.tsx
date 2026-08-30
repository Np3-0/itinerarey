import { useState, useEffect } from "react";
import Navbar from "../partials/Navbar";
import getFlightDataFromAPI from "../../utils/getFlightDataFromAPI";
import { getCookie } from "../../utils/cookies.ts";
import type { FlightRes } from "../../data/FlightTypes.ts"
import Flight from "../partials/Flight";

export default function Flights() {
    const [flights, setFlights] = useState<FlightRes | null>(null);
    const [cookieData, setCookieData] = useState<{ origin: string; destination: string; dates: { startDate: string; endDate: string } } | null>(null);

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
            console.log(res);
            setFlights(res);
        };

    fetchFlightData();
}, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-min-screen bg-cerulean">
                <h1 className="text-4xl font-bold text-heading text-white mt-18">Flights for {cookieData?.dates.startDate}</h1>
                <p className="text-lg text-white mt-4 font-semibold">Choose your flight!</p>
                {flights ? (
                    <div className="mt-6 w-full max-w-4xl bg-accent-blue rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-heading mb-4 text-white">Available Flights: {flights.count}</h2>
                        {flights.flights.map((flight, index) => (
                            <Flight key={index} flight={flight} />
                        ))}
                    </div>
                ) : (
                    <p className="text-lg text-white mt-4">Loading flight data...</p>
                )}
            </div>
        </>
    );
}