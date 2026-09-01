import type { FlightType } from "./FlightTypes.ts";

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
    origin: string;
    people: number;
    flights: {
        departure: FlightType | null;
        return: FlightType | null;
    }
}