import type { FlightType } from "../data/FlightTypes.ts";
import type { AirportType } from "../data/AirportType.ts";
import type { HotelInfo } from "../data/hotelTypes.ts";
import type { ActivityType } from "../data/ActivityType.ts";

export function saveCookie(obj: object, name: string) {
    try {
        localStorage.setItem(name, JSON.stringify(obj));
    } catch (err) {
        console.error(err);
    }
}

export function getCookie(name: string) {
    const raw = localStorage.getItem(name);
    return raw ? JSON.parse(raw) : null;
}

export function checkIfCookieExists(name: string): boolean {
    return document.cookie.split(';').some(c => c.trim().startsWith(name + '='));
}

export function deleteCookie(name: string) {
    localStorage.removeItem(name)
}

export interface cookieData {
    budgets: {
        overall: number;
        flight: number;
        hotel: number;
        activity: number;
    }
    dates: {
        startDate: string;
        endDate: string;
    }
    destination: string;
    destinationAirport: AirportType | null;
    origin: string;
    originAirport: AirportType | null;
    people: number;
    flights: {
        departure: FlightType | null;
        return: FlightType | null;
    }
    hotel: HotelInfo | null;
    activities: Array<ActivityType>;
}