export default async function getFlightDataFromAPI(origin: string, destination: string, date: string): Promise<unknown> {
    const res = await fetch(`https://itinerarey-flightapi.onrender.com/api/flights?origin=${origin}&destination=${destination}&date=${date}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch flight data: ${res.statusText}`);
    }

    return await res.json();
}