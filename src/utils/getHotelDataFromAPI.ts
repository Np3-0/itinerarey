import type { cookieData } from "./cookies.ts";
import type { HotelRes } from "../data/hotelTypes.ts";

export default async function getHotelDataFromAPI(cookieData: cookieData): Promise<HotelRes> {
    console.log(typeof(cookieData.budgets.hotel))
    const res = await fetch(`https://booking-scraper.omkar.cloud/booking/hotels/search?
        query=${encodeURIComponent(cookieData.destination)}&checkin=${cookieData.dates.startDate}&checkout=${cookieData.dates.endDate}&
        adults=1&rooms=1&page=1&sort_by=price&price_max=${cookieData.budgets.hotel}&locale=en-us&currency=USD`,
        {
            method: "GET",
            headers: {
                "API-Key": import.meta.env.VITE_HOTEL_API_KEY,
            }
        }
    )
    const data = await res.json();
    console.log(data)
    return { 
        ...data,
        results: data.results.filter((result) => result.price.total <= cookieData.budgets.hotel)};
}
