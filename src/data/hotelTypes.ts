export interface HotelRes {
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    next: unknown | null;
    previous: unknown | null;
    query: string;
    destination: {
        dest_id: number;
        dest_type: string;
        name: string;
        label: string;
    }
    stay: {
        checkin: string;
        checkout: string;
        adults: number;
        children: number[];
        rooms: number;
    }
    locale: string;
    currency: string;
    sort_by: string;
    results: HotelInfo[];
}

export interface HotelInfo {
    id: number;
    name: string;
    link: string;
    page_name: string;
    accommodation_type: string;
    accommodation_type_id: number;
    image: string;
    location: {
        address: string;
        city: string;
        country_code: string;
        latitude: number;
        longitude: number;
        distance_from_center: string;
        nearest_public_transport: unknown | null;
        is_centrally_located: boolean;
    }
    rating: {
        score: number;
        count: number;
        word: string;
        stars: number;
        stars_symbol: string;
    }
    unit: {
        name: string | null;
        beds: number;
        bedrooms: number;
    }
    price: {
        currency: string;
        total: number | null;
        per_night: unknown | null;
        before_discount: unknown | null;
        charges_info: unknown | null;
    }
    is_preferred: boolean;
    is_sponsored: boolean;
    is_new: boolean;
    is_sold_out: boolean;
    is_sustainable: boolean;
}