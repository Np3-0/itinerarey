import type { FlightType } from "../data/FlightTypes.ts";
import type { AirportType } from "../data/AirportType.ts";

export function saveCookie(obj: object, name: string) {
    const val = encodeURIComponent(JSON.stringify(obj));
    document.cookie = `${name}=${val}; path=/; max-age=604800; samesite=strict; Secure;`;
}

export function getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return JSON.parse(decodeURIComponent(match[2]));
    }
    return null;
}

export function checkIfCookieExists(name: string): boolean {
    return document.cookie.split(';').some(c => c.trim().startsWith(name + '='));
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
}