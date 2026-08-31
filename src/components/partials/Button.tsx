interface ButtonProps {
    colorway: "primary" | "secondary";
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export default function Button({ colorway, text, onClick, type }: ButtonProps) {
    return (
        <button 
            className={`${colorway === "primary" ? "bg-floral-white text-cerulean" : "bg-cerulean text-floral-white"} hover:scale-110 py-3 px-12 rounded-full transition duration-300 font-semibold text-lg cursor-pointer`}
            onClick={onClick}
            type={type ? type : "button"}
            >
                {text}
        </button>
    );
}