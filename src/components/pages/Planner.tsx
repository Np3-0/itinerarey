import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { saveCookie, checkIfCookieExists, getCookie } from "../../utils/cookies.ts";
import type { cookieData } from "../../data/cookieType.ts"
import Navbar from "../partials/Navbar.tsx";
import Input from "../partials/Input.tsx";
import Button from "../partials/Button.tsx"
import "cally";

export default function Planner() {
    const navigate = useNavigate();
    const calendarRef = useRef<(HTMLElement & { value: string }) | null>(null);
    const [tripInfo, setTripInfo] = useState<cookieData>({
        budgets: {
            overall: 0,
            flight: 0,
            hotel: 0,
            activity: 0,
        },
        dates: {
            startDate: "",
            endDate: "",
        },
        origin: "",
        destination: "",
        people: 1,
    });

    {/* Gets data, checks, and then saves as a cookie*/}
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedTripInfo = {
            ...tripInfo,
            budgets: {
                ...tripInfo.budgets,
                overall: tripInfo.budgets.flight + tripInfo.budgets.hotel + tripInfo.budgets.activity,
            },
        };
        setTripInfo(updatedTripInfo);
        saveCookie(updatedTripInfo, "tripInfo");
        navigate("/itinerarey/flights");
    };



    useEffect(() => {
        const calendar = calendarRef.current;
        if (!calendar) return;

        const handleChange = () => {
            const value = calendar.value;
            const [startDate = "", endDate = ""] = value.split("/");

            setTripInfo(prev => ({
                ...prev,
                dates: {
                    startDate,
                    endDate,
                },
            }));
        };

        calendar.addEventListener("change", handleChange);
        return () =>
            calendar.removeEventListener("change", handleChange);
    }, [tripInfo]);

    useEffect(() => {
        if (!calendarRef.current) return;
        const { startDate, endDate } = tripInfo.dates;
        calendarRef.current.value =
            startDate || endDate
                ? `${startDate}/${endDate}`
                : "";
    }, [tripInfo.dates]);

    useEffect(() => {
        {/* Check if cookie exists, if so, populate the form */}
        const handleCookie = () => {
            if (!checkIfCookieExists("tripInfo")) return;
            const cookie = getCookie("tripInfo");
            if (cookie) {
                setTripInfo(cookie);
            }
        };

        handleCookie();
    }, []);

    return (
        <>
            <Navbar showItems={false} />
            <div className="w-full bg-cerulean min-h-screen flex flex-col items-center justify-start">
                <h1 className="text-4xl font-bold text-floral-white mt-12">Trip Info</h1>
                <p className="text-floral-white text-lg my-6 font-semibold">Before we start planning, please enter some basic information. All prices should exclude taxes and fees.</p>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}>
                    <div className="grid gap-8 mb-6 md:grid-cols-2 mx-auto bg-accent-blue px-12 py-8 rounded-lg shadow-lg text-white font-semibold">
                        <div>
                            <Input id="origin" name="Origin" required={true} type="text" placeholder="New York" value={tripInfo.origin} onChange={(e) => setTripInfo({...tripInfo, origin: e.target.value})}/>
                        </div>
                        <div>
                            <Input id="destination" name="Destination" required={true} type="text" placeholder="Shenzhen?" value={tripInfo.destination} onChange={(e) => setTripInfo({...tripInfo, destination: e.target.value})}/>
                        </div>

                        <div className="bg-floral-white text-accent-blue rounded-xl shadow-lg p-4">
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-lg text-heading">
                                    Travel Dates
                                </label>
                                {/* @ts-expect-error element not in base jsx*/}
                                <calendar-range
                                    name="tripDates"
                                    ref={calendarRef}
                                    class="w-full"
                                >
                                    <svg
                                        aria-label="Previous"
                                        slot="previous"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                                    </svg>
                                    <svg
                                        aria-label="Next"
                                        slot="next"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                                    </svg>
                                    {/* @ts-expect-error element not in base jsx*/}
                                    <calendar-month></calendar-month>
                                {/* @ts-expect-error element not in base jsx*/}
                                <calendar-input
                                    for="tripDates"
                                    class="mt-4 w-full *:bg-floral-white text-accent-blue text-lg rounded-lg block px-3 py-2.5 shadow-xs placeholder:text-accent-blue"  
                                >
                                {/* @ts-expect-error element not in base jsx*/}
                                </calendar-input>
                                {/* @ts-expect-error element not in base jsx*/}
                                </calendar-range>

                                
                            </div>
                        </div>
                        <div>
                            <Input id="people" name="Number of People" required={true} type="number" placeholder="1" value={tripInfo.people} onChange={(e) => setTripInfo({...tripInfo, people: e.target.valueAsNumber})}/>
                            <Input id="hotelPrice" name="Hotel Price (per night)" required={true} type="number" step="0.01" placeholder="$150.00" value={tripInfo.budgets.hotel} onChange={(e) => setTripInfo({...tripInfo, budgets: {...tripInfo.budgets, hotel: e.target.valueAsNumber}})}/>
                            <Input id="flightPrice" name="Flight Price (round trip)" required={true} type="number" step="0.01" placeholder="$150.00" value={tripInfo.budgets.flight} onChange={(e) => setTripInfo({...tripInfo, budgets: {...tripInfo.budgets, flight: e.target.valueAsNumber}})}/>
                            <Input id="activityPrice" name="Activity Budget" required={true} type="number" step="0.01" placeholder="$150.00" value={tripInfo.budgets.activity} onChange={(e) => setTripInfo({...tripInfo, budgets: {...tripInfo.budgets, activity: e.target.valueAsNumber}})}/>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 md:col-span-2">
                            <Button colorway="primary" text="Plan!" type="submit"/>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}