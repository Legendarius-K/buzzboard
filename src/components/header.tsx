import Link from "next/link";


export const Header = () => {
    return (
        <header className="p-3 bg-neutral-200  shadow-sm">
            <Link href={'/'}><h1 className="font-mono font-bold">BuzzBoard</h1></Link>
        </header>
    )
};


