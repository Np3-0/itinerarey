import Button from './Button';
import type { AirportType } from '../../data/AirportType';

interface ModalProps {
    info: AirportType[],
    title: string,
    onChosen: (airport: AirportType) => void,
    description: string,
    onSubmit: () => void
    selectedIndex?: number
}

export default function Modal({ info, title, description, onSubmit, onChosen, selectedIndex }: ModalProps) {

    return (
        <div tabIndex={-1} className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-floral-white border border-cerulean rounded-base shadow-sm p-4 md:p-6 rounded-lg">
                    <div className="flex items-center justify-between border-accent-blue border-b-4 pb-4 md:pb-5">
                        <h1 className="text-lg font-semibold text-accent-blue">
                            {title}
                        </h1>
                    </div>
                    <div className="pt-4 md:pt-6">
                        <p className="text-lg font-semibold text-accent-blue mb-4">{description}</p>
                        <ul className="space-y-4 mb-4">
                            {info.map((item, index) => (
                                <li key={index}>
                                <input type="radio" id="job-1" name="job" value="job-1" className="hidden peer" required />
                                <label 
                                    htmlFor="job-1"
                                    onClick={() => onChosen(item)}
                                    className={`inline-flex items-center w-full p-5 text-body bg-neutral-primary-soft border-4 rounded-lg ${selectedIndex === index ? 'border-grapefruit' : 'border-accent-blue'} rounded-base cursor-pointer peer-checked:hover:bg-brand-softer peer-checked:border-brand-subtle peer-checked:bg-brand-softer hover:bg-neutral-secondary-medium peer-checked:text-fg-brand-strong`}>
                                    <div className="block ms-2.5">
                                        <div className="w-full text-base font-medium">{item.airport}</div>
                                        <div className="w-full font-normal">{item.iata}</div>
                                    </div>
                                </label>
                            </li>
                            ))}

                        </ul>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button text="Continue" colorway="secondary" onClick={onSubmit}/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}