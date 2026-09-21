import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type cookieData, getCookie, saveCookie } from "../../utils/cookies.ts";
import Navbar from "../partials/Navbar.tsx";
import { getResponseFromAI } from "../../utils/AI";
import Button from "../partials/Button.tsx";

export default function Activities() {
    const navigate = useNavigate();
    const [cookieData, setCookieData] = useState<cookieData | null>(null);
    const [activities, setActivities] = useState<any | null>(null);
    const [selectedActivities, setSelectedActivities] = useState<any | null>(null);

    useEffect(() => {
        const fetchActivities = async () => {
            const cookie = getCookie("tripInfo");
            if (!cookie) {
                navigate("/");
                return;
            }
            setCookieData(cookie);

            const AIResult = await getResponseFromAI(cookie);
            if (AIResult.length === 0) {
                alert("No activities were found. Please change your search parameters.")
                navigate("/plan");
                return;
            }
            setActivities(AIResult);
        };

        fetchActivities();
    }, [navigate]);

    const handleActivitySubmission = () => {

    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-cerulean">
                <h1 className="text-4xl font-bold text-heading text-white mt-18">Activities</h1>
                <p className="text-xl font-semibold text-heading text-white my-6">Please select as many activities as you would like!</p>

                {selectedActivities && (
                    <Button text="Continue" onClick={() => { handleActivitySubmission() }} colorway="primary" />
                )}
                {activities ? (
                    <div className="mt-6 w-full max-w-4xl bg-accent-blue rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-semibold text-heading mb-4 text-white">Available activities: {activities.length}</h1>
                        {activities.length === 0 ? (
                            <>
                                <p className="text-lg text-white mt-4">No activities available for the selected dates. Please change your planned information.</p>
                                <button
                                    className="bg-floral-white text-cerulean hover:scale-110 py-3 px-12 rounded-full transition duration-300 font-semibold text-lg cursor-pointer"
                                    onClick={() => navigate("/plan")}
                                >
                                    Go back
                                </button>
                            </>
                        ) : (
                            <>
                                /* Add activity mapping here. */
                            </>
                        )}
                    </div>
                ) : (
                    <p className="text-lg text-white mt-4">Loading activity0 data... This might take a minute!</p>
                )}
            </div>
        </>
    )
}