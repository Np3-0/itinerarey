import Button from "../partials/Button.tsx";
import Modal from "../partials/Modal.tsx";

export default function Hotel() {
    return (
        <div className={`bg-floral-white rounded-lg shadow-md p-4 mb-4 `}>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-semibold text-heading mb-2 text-cerulean">Hotel Name</h1>
                <p className="text-accent-blue font-semibold text-xl mb-2 mx-4">Hotel Price (per night)</p>
            </div>
            
            <div className="flex justify-between items-center mb-2">
                <p className="text-cerulean text-lg mb-2 font-semibold">Amenities: </p>
                <Button colorway="secondary" text={"Select Hotel"} type="button" />
                
            </div>
        </div>
    );
}