import Link from "next/link";
import { Search } from "./search";
import CommentComp from "./comments/comment";


export const Header = () => {
    return (
        <header className="p-3 bg-neutral-200  shadow-sm flex items-center justify-between">
            <Link href={'/'}><h1 className="font-mono font-bold">BuzzBoard</h1></Link>
            <Search />
        </header>
    )
};


