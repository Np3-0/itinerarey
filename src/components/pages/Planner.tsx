import { useState, useEffect } from "react";

export default function Planner() { 

    const [budgets, setBudgets] = useState({
        overallBudget: 0,
        flightBudget: 0,
        hotelBudget: 0,
        activityBudget: 0,
    });

    return (
        <section className="w-full bg-cerulean">
            Planner
        </section>
    )
}