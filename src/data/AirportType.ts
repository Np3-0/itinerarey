export interface AirportType {
    airport: string
    continent: string
    country_code: string
    elevation_ft: string
    flightaware_url?: string
    flightradar24_url?: string
    iata: string
    icao: string
    latitude: string
    longitude: string
    radarbox_url?: string
    runway_length?: string
    scheduled_service: string | boolean
    time: string
    type: string
    utc: string
    website?: string
    wikipedia?: string
}