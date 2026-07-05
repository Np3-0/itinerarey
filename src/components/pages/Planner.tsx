import { useState } from "react";
import Navbar from "../partials/Navbar";

export default function Planner() { 

    const [budgets, setBudgets] = useState({
        overallBudget: 0,
        flightBudget: 0,
        hotelBudget: 0,
        activityBudget: 0,
    });

    return (
        <>
            <Navbar showItems={false} />
            <div className="w-full bg-cerulean min-h-screen flex flex-col items-center justify-start">
                <h1 className="text-4xl font-bold text-white mt-12">Trip Info</h1>
                <form>
                    {/* Basic Info stuff */}
                    
                </form>
            </div>
        </>
    )
}