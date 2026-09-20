import type { HotelInfo } from "../../data/hotelTypes.ts";
import Button from "../partials/Button.tsx";

interface HotelProps {
    hotelInfo: HotelInfo;
    onChosen: (hotel: HotelInfo) => void;
    selected: boolean;
}

export default function Hotel({ hotelInfo, onChosen, selected } : HotelProps) {

    return (
        <div className={`bg-floral-white rounded-lg shadow-md p-4 mb-4 ${selected ? "border-4 border-cerulean" : ""}`}>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-semibold text-heading mb-2 text-cerulean">
                    {hotelInfo.name}<span className="text-accent-blue font-bold"> - {hotelInfo.rating.score} / 10</span>
                </h1>
                <p className="text-accent-blue font-semibold text-xl mb-2 mx-4">${hotelInfo.price.total}</p>
            </div>
            
            <div className="flex justify-between items-center mb-2">
                <p className="text-cerulean text-lg mb-2 font-semibold">{hotelInfo.location.address}, {hotelInfo.location.city}</p>
                <Button colorway="secondary" text={selected ? "Selected" : "Select Hotel"} type="button" onClick={() => onChosen(hotelInfo)} />
                
            </div>
        </div>
    );
}