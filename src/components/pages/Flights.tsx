import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../partials/Navbar.tsx";
import Flight from "../partials/Flight.tsx";
import Button from "../partials/Button.tsx";
import { getFlightDataFromAPI, filterFlights, getAirportsInCity } from "../../utils/getFlightDataFromAPI.ts";
import { getCookie, saveCookie, type cookieData } from "../../utils/cookies.ts";
import type { FlightRes, FlightType } from "../../data/FlightTypes.ts";
import type { AirportType } from "../../data/AirportType.ts";
import Modal from "../partials/Modal.tsx";


export default function Flights() {
    const navigate = useNavigate();
    const [flights, setFlights] = useState<FlightRes | null>(null);
    const [selectedFlight, setSelectedFlight] = useState<FlightType | null>(null);
    const [flightNum, setFlightNum] = useState<number>(0);
    const [airports, setAirports] = useState<AirportType[]>([]);
    const [selectedAirport, setSelectedAirport] = useState<AirportType | null>(null);
    const [airportNum, setAirportNum] = useState<number>(0);
    const [cookieData, setCookieData] = useState<cookieData | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    // checks to see if the cookie exists, routes to home page if not. if it does, sends data to flight API.
    useEffect(() => {
        const fetchFlightData = async () => {
            const cookie = getCookie("tripInfo");
            if (!cookie) {
                navigate("/itinerarey");
                return;
            }
            setCookieData(cookie);
            const airportChoices = await getAirportsInCity(airportNum === 0 ? cookie.origin : cookie.destination);
            setAirports(airportChoices);
            
            if (airportChoices.length > 1 && (!cookie.originAirport || !cookie.destinationAirport)) {
                setShowModal(true);
            } else {
                const { originAirport, destinationAirport, dates } = cookie;
                const date = flightNum === 0 ? dates.startDate : dates.endDate;
                const res = await getFlightDataFromAPI(originAirport.iata, destinationAirport.iata, date);
                setFlights(res);
                setFlights(filterFlights(res, cookie));
            }
        };

        fetchFlightData();
    }, [flightNum, navigate, airportNum]);

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

    const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedAirport || !cookieData) {
            alert("An error occurred. Please try again.");
            return;
        }

        const updatedCookieData = 
            airportNum === 0 
                ? { ...cookieData, originAirport: selectedAirport }
                : { ...cookieData, destinationAirport: selectedAirport };
            
        setCookieData(updatedCookieData);
        if (airportNum === 0) {
            setAirportNum(1);
        } else if (airportNum === 1) {
            setShowModal(false);
        }
        saveCookie(updatedCookieData, "tripInfo");
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
                {showModal && (
                    <Modal 
                        title="Multiple Airports Found" 
                        info={airports} 
                        description="Choose the airport you want to use." 
                        onSubmit={handleModalSubmit} 
                        onChosen={setSelectedAirport} 
                        selectedIndex={selectedAirport ? airports.indexOf(selectedAirport) : -1} 
                    />
                )}
                {flights ? (
                    <div className="mt-6 w-full max-w-4xl bg-accent-blue rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-semibold text-heading mb-4 text-white">Available Flights: {flights.flights.length}</h1>
                        {flights.flights.length === 0 ? (
                            <>
                                <p className="text-lg text-white mt-4">No flights available for the selected dates. Please change your planned information.</p>
                                <button 
                                    className="bg-floral-white text-cerulean hover:scale-110 py-3 px-12 rounded-full transition duration-300 font-semibold text-lg cursor-pointer" 
                                    onClick={() => navigate("/itinerarey/plan")}
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