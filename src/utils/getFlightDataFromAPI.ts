import type { FlightRes } from "../data/FlightTypes.ts";
import type { cookieData } from "../utils/cookies.ts";
import { findNearbyAirports } from "airport-data-js";

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

export async function getAirportsInCity(city: string) {
    const res = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(city)}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
    );
    const data = await res.json();
    if (!data.features?.length) {
        alert("No airport found for this city. Try a more general location.")
        window.history.back();
        return [];
    }

    // removes any feature that isnt a city.
    const filteredData = data.features.filter((feature) => feature.properties.feature_type === "place" || feature.properties.feature_type === "region");
    if (!filteredData.length) {
        alert("No airport found for this city. Try a more general location.")
        window.history.back();
        return [];
    }

    const [lon, lat] = filteredData[0].geometry.coordinates;
    const airports = await findNearbyAirports(lat, lon, 100);
    if (airports.length <= 5) return airports;
    
    return airports.filter((airport) => airport.type === "large_airport");
    
}