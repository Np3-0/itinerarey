interface ButtonProps {
    colorway: "primary" | "secondary";
    text: string;
    onClick?: (e?: any) => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean
}

export default function Button({ colorway, text, onClick, type, disabled }: ButtonProps) {
    return (
        <button 
            className={`${colorway === "primary" ? "bg-floral-white text-cerulean" : "bg-cerulean text-floral-white"} hover:scale-110 py-3 px-12 rounded-full transition duration-300 font-semibold text-lg cursor-pointer`}
            onClick={onClick}
            type={type ? type : "button"}
            disabled={disabled}
            >
                {text}
        </button>
    );
}