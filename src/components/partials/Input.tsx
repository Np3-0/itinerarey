interface InputProps {
    type: string;
    id: string;
    name?: string;
    required: boolean;
    step?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, id, name, required, step, placeholder, value, onChange }: InputProps) {
    return (
        <>
            <label htmlFor={id} className="block mb-2.5 mt-4 text-lg text-heading">{name? name : id}</label>
                <input
                type={type}
                step={step}
                id={id}
                name={id}
                className="bg-floral-white text-cerulean text-heading text-lg rounded-lg block w-full px-3 py-2.5 shadow-xs placeholder:text-cerulean/80"
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(e) => onChange(e)}
            />
        </>
    );
}