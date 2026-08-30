interface FlightLeg {
    arrival: string;
    departure: string;
    duration_minutes: number;
    from_airport: string;
    from_airport_name: string;
    plane_type: string;
    to_airport: string;
    to_airport_name: string;
}

export interface FlightType {
    airline_code: string;
    airlines: Array<string>;
    booking_url: string;
    legs: Array<FlightLeg>;
    price: number;
    stops: number;
    total_duration_minutes: number;
}

export interface FlightRes {
    count: number;
    flights: Array<FlightType>;
}