
type ButtonProps = {
    text: string
}

export const SubmitButton = ({ text }: ButtonProps) => {
    return (
        <button type="submit" className="bg-primary hover:bg-primaryhover text-neutral-100 font-mono font-bold py-2 rounded-full shadow-lg transition-all w-full">
            {text}
        </button>
    );
};

