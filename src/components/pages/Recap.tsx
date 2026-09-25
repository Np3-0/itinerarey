import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../partials/Navbar.tsx";
import { type cookieData, getCookie } from "../../utils/cookies.ts";
import Flight from "../partials/Flight.tsx";
import Hotel from "../partials/Hotel.tsx";
import Activity from "../partials/Activity.tsx";
import getTotalCost from "../../utils/getTotalCosts.ts";
import Button from "../partials/Button.tsx";
import reset from "../../utils/reset.ts";

export default function Recap() {
    const navigate = useNavigate();
    const [cookieData, setCookieData] = useState<cookieData | null>(null)

    useEffect(() => {
        const getData = () => {
            const cookie = getCookie("tripInfo");
            if (!cookie) return;

            setCookieData(cookie);
        }

        getData();
    }, [navigate])
    
    // variables to hold data in to prevent typescript errors
    if (!cookieData || !cookieData.activities) {
        navigate("/"); 
        return;
    }
    const hotel = cookieData?.hotel;
    const costs = getTotalCost(cookieData)

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-cerulean">
                {cookieData ? (
                    <>
                        <div>
                            <h1 className="text-3xl font-bold text-heading text-white my-6 mx-3">
                                Your trip from {cookieData.origin} to {cookieData.destination}!
                            </h1>
                            <h1 className="text-2xl font-semibold text-heading text-white text-center">
                                {cookieData.dates.startDate} - {cookieData.dates.endDate}
                            </h1>
                        </div>
                        <h1 className="text-3xl font-bold text-heading text-white my-6">Flights</h1>
                        <div className="flex flex-col lg:flex-row m-4 gap-x-6">
                            {cookieData.flights.departure && cookieData.flights.return ? (
                                <>
                                    <Flight
                                        flight={cookieData.flights.departure}
                                        selected={false}
                                        onChosen={() => window.open(cookieData.flights.departure?.booking_url)}
                                        type={2}
                                    />
                                    <Flight
                                        flight={cookieData.flights.return}
                                        selected={false}
                                        onChosen={() => window.open(cookieData.flights.return?.booking_url)}
                                        type={2}
                                    />
                                </>
                            ) : (
                                <h1>No Flights found.</h1>
                            )}
                        </div>

                        <h1 className="text-3xl font-bold text-heading text-white my-6">Hotel</h1>
                        {hotel ? (
                            <Hotel hotelInfo={hotel} onChosen={() => window.open(hotel.link)} selected={false} type={2}/>
                        ) : (
                            <h1>No hotel found.</h1>
                        )}

                        <h1 className="text-3xl font-bold text-heading text-white my-6">Activities</h1>
                        {cookieData.activities ? (
                            <div className="flex flex-col flex-wrap lg:flex-row m-4 mx-48 gap-6">
                                {cookieData.activities.map((activity, key) => {
                                    return <Activity activityData={activity} selected={false} key={key}/>
                                })}
                            </div>
                        ) : (
                            <h1>No activities found.</h1>
                        )}

                        <h1 className="text-3xl font-bold text-heading text-white my-6">Price Information</h1>
                        <div className="bg-floral-white rounded-lg shadow-md px-24 py-12 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h1 className="text-2xl font-semibold text-heading mb-2 text-cerulean">Your Budget:</h1>
                                <p className="text-accent-blue font-semibold text-xl mb-2 mx-4">${cookieData.budgets.overall}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <h1 className="text-2xl font-semibold text-heading mb-2 text-cerulean">Flights:</h1>
                                <p className="text-accent-blue font-semibold text-xl mb-2 mx-4">${costs?.flightsCost}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <h1 className="text-2xl font-semibold text-heading mb-2 text-cerulean">Hotel:</h1>
                                <p className="text-accent-blue font-semibold text-xl mb-2 mx-4">${costs?.hotelCost}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <h1 className="text-2xl font-semibold text-heading mb-2 text-cerulean">Activities:</h1>
                                <p className="text-accent-blue font-semibold text-xl mb-2 mx-4">${costs?.activityCost}</p>
                            </div>
                            <h1 className="text-2xl font-semibold text-heading mt-4 text-cerulean">
                                Your total cost is ${costs?.totalCost}, leaving you with ${costs?.leftover}!
                            </h1>
                        </div>
                    </>
                ) : (
                    <p className="text-xl font-semibold text-heading text-white my-6">Loading trip info... this might be a minute!</p>
                )}
                <div className="flex flex-col md:flex-row mt-6 gap-x-4">
                    <Button text="Save to device!" onClick={() => window.print()} colorway="primary"/>
                    <Button text="Reset and Go  Home!" onClick={() => reset()} colorway="primary"/>
                </div>
                <h1 className="text-floral-white font-semibold text-lg m-4">
                    Thank you for using Itinerarey! Please keep in note that prices may not be accurate. Enjoy your trip! - Nate
                </h1>
            </div>
        </>
    );
}