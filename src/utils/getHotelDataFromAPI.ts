export default async function getHotels() {
    try {
        const res = await fetch(
            "https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchHotels?adults=1&rooms=1&limit=30&sorting=-relevance&currency=USD&market=en-US&countryCode=US",
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key": import.meta.env.VITE_HOTEL_API_KEY,
                    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(res.text());
    } catch (error) {
        console.error(error);
    }
}