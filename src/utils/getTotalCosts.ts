import type { cookieData } from "./cookies.ts";

export default function getTotalCost(cookieData: cookieData) {
    if (!cookieData.flights.departure || !cookieData.flights.return || !cookieData.hotel) return;
    
    const flightsCost = cookieData.flights.departure?.price + cookieData.flights.return?.price;
    const hotelCost = cookieData.hotel?.price.total;
    let activityCost = 0;
    cookieData.activities.forEach((activity) => activityCost += activity.price);

    const total = flightsCost + hotelCost + activityCost;

    return {
        flightsCost: flightsCost,
        hotelCost: hotelCost,
        activityCost: activityCost,
        totalCost: total,
        leftover: cookieData.budgets.overall - total,
    }
}