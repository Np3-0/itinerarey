import type { FlightType } from "../../data/FlightTypes.ts"

interface FlightProps {
    flight: FlightType;
}

export default function Flight( { flight }: FlightProps ) {
    return (
        <div className="bg-floral-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-semibold text-heading mb-2 text-cerulean">{flight.airlines.join(", ")}</h1>
                <p className="text-accent-blue font-semibold text-xl mb-2 mx-4">${flight.price}</p>
            </div>
            {flight.legs.map((leg, index) => (
                <div key={index} className="mb-2">
                    <p className="text-accent-blue text-xl mb-1 font-semibold">Leg {index + 1}: {leg.departure.split(" ")[1]} to {leg.arrival.split(" ")[1]}</p>

                    <div className="flex items-center mb-2 mt-4">
                        <h1 className="text-2xl font-semibold text-heading text-cerulean">{leg.from_airport}</h1>

                        <div className="flex-1 flex items-center mx-3">
                            <div className="flex-1 h-1.5 rounded-full bg-accent-blue" />
                            <span className="mx-2 text-sm font-medium text-accent-blue whitespace-nowrap">
                                {Math.floor(leg.duration_minutes / 60)}h {leg.duration_minutes % 60}m
                            </span>
                            <div className="flex-1 h-1.5 rounded-full bg-accent-blue" />
                        </div>

                        <h1 className="text-2xl font-semibold text-heading text-cerulean">{leg.to_airport}</h1>
                    </div>

                </div>
            ))}
            <div className="flex justify-between items-center mb-2">
                <p className="text-cerulean text-lg mb-2 font-semibold">Total Duration: {Math.floor(flight.total_duration_minutes / 60)}h {flight.total_duration_minutes % 60}m</p>
                <button className="bg-accent-blue text-floral-white hover:scale-110 py-3 px-12 rounded-full transition duration-300 font-semibold text-lg cursor-pointer">Select Flight</button>
                
            </div>
            
        </div>
    );
}