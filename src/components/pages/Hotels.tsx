import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../partials/Navbar.tsx";
import { getCookie, saveCookie, type cookieData } from "../../utils/cookies.ts";
import Hotel from "../partials/Hotel.tsx";
import getHotelDataFromAPI from "../../utils/getHotelDataFromAPI.ts";
import type { HotelRes, HotelInfo } from "../../data/hotelTypes.ts";
import Button from "../partials/Button.tsx";

export default function Hotels() {
    const [hotels, setHotels] = useState<HotelRes | null>(null);
    const [selectedHotel, setSelectedHotel] = useState<HotelInfo | null>(null);
    const [cookieData, setCookieData] = useState<cookieData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            const cookie = getCookie("tripInfo");
            if (!cookie) {
                navigate("/itinerarey");
                return;
            }
            setCookieData(cookie);
            const hotelData = await getHotelDataFromAPI(cookie);
            setHotels(hotelData);
        };

        fetchHotels();
    }, [navigate]);

    const handleHotelSubmission = () => {
        if (!selectedHotel || !cookieData) return;
        const updatedCookieData = {
            ...cookieData,
            hotel: selectedHotel
        }
        saveCookie(updatedCookieData, "tripInfo");
        navigate("/itinerarey/activities");
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-cerulean">
                <h1 className="text-4xl font-bold text-heading text-white mt-18">Hotels</h1>
                <p className="text-xl font-semibold text-heading text-white my-6">Select the hotel you want to book. Please be specific with place names.</p>

                {selectedHotel && (
                    <Button text="Continue" onClick={() => { handleHotelSubmission() }} colorway="primary" />
                )}
                {hotels ? (
                    <div className="mt-6 w-full max-w-4xl bg-accent-blue rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-semibold text-heading mb-4 text-white">Available Hotels: {hotels.results.length}</h1>
                        {hotels.results.length === 0 ? (
                            <>
                                <p className="text-lg text-white mt-4">No hotels available for the selected dates. Please change your planned information.</p>
                                <button
                                    className="bg-floral-white text-cerulean hover:scale-110 py-3 px-12 rounded-full transition duration-300 font-semibold text-lg cursor-pointer"
                                    onClick={() => navigate("/itinerarey/plan")}
                                >
                                    Go back
                                </button>
                            </>
                        ) : (
                            <>
                                {hotels.results.map((hotel, index) => (
                                    <Hotel key={index} hotelInfo={hotel} onChosen={() => setSelectedHotel(hotel)} selected={selectedHotel === hotel} />
                                ))}
                            </>
                        )}
                    </div>
                ) : (
                    <p className="text-lg text-white mt-4">Loading hotel data... This might take a minute!</p>
                )}
            </div>
        </>
    );
}