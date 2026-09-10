import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../partials/Navbar.tsx";
import { getCookie, type cookieData } from "../../utils/cookies.ts";
import Hotel from "../partials/Hotel.tsx";

export default function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [cookieData, setCookieData] = useState<cookieData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => { {/* W.I.P */}
            const cookie = getCookie("tripInfo");
            if (!cookie) {
                navigate("/itinerarey");
                return;
            }
            setCookieData(cookie);
        };

        fetchHotels();
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-cerulean">
                <h1 className="text-4xl font-bold text-heading text-white mt-18">Hotels</h1>
                <p className="text-xl font-semibold text-heading text-white mt-6">Select the hotel you want to book.</p>
                <div className="mt-6 w-full max-w-4xl bg-accent-blue rounded-lg shadow-md p-6">
                    <Hotel />
                </div>
            </div>
        </>
    );
}