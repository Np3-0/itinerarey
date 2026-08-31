import type { FlightRes } from "../data/FlightTypes";
import type { cookieData } from "../data/cookieType";

export async function getFlightDataFromAPI(origin: string, destination: string, date: string): Promise<FlightRes> {
    const res = await fetch(`https://itinerarey-flightapi.onrender.com/api/flights?origin=${origin}&destination=${destination}&date=${date}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch flight data: ${res.statusText}`);
    }

    return await res.json();
}

export function filterFlights(flightData: FlightRes, cookieData: cookieData): FlightRes {
    const filteredFlights = flightData.flights.filter(flight => {
        return flight.price <= cookieData.budgets.flight;
    });
    return { ...flightData, flights: filteredFlights };
}