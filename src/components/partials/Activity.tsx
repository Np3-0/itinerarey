import { type ActivityType } from "../../data/ActivityType.ts"
import Button from "./Button.tsx";

interface ActivityProps {
    activityData: ActivityType,
    onChosen: (activity: ActivityType) => void;
    selected: boolean;
}

export default function Activity({ activityData, onChosen, selected } : ActivityProps) {
    return (
        <div className={`bg-floral-white rounded-lg shadow-md p-4 mb-4 ${selected ? "border-4 border-grapefruit" : ""}`}>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-semibold text-heading mb-2 text-cerulean">
                    {activityData.activity}
                </h1>
                <p className="text-accent-blue font-semibold text-xl mb-2 mx-4">${activityData.price}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-xl font-semibold text-heading mb-2 text-cerulean">
                    {activityData.desc}
                </p>
                <p className="text-accent-blue font-semibold text-xl mb-2 mx-4">{activityData.additionalInfo}</p>
            </div>

            <div className="flex justify-between items-center mb-2">
                <p className="text-cerulean text-lg mb-2 font-semibold">{activityData.location}</p>
                <Button colorway="secondary" text={selected ? "Deselect" : "Select"} type="button" onClick={() => onChosen(activityData)} />
            </div>
        </div>
    );
}