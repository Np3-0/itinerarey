interface InputProps {
    type: string;
    id: string;
    name?: string;
    required: boolean;
    step?: string;
    placeholder?: string;
}

export default function Input({ type, id, name, required, step, placeholder }: InputProps) {
    return (
        <>
            <label htmlFor={id} className="block mb-2.5 mt-4 text-lg text-heading">{name? name : id}</label>
                <input
                type={type}
                step={step}
                id={id}
                name={id}
                className="bg-floral-white text-cerulean text-heading text-lg rounded-lg block w-full px-3 py-2.5 shadow-xs placeholder:text-cerulean"
                placeholder={placeholder}
                required={required}
            />
        </>
    );
}