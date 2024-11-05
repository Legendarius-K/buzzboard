import Link from "next/link";
import { Search } from "./search";
import Image from "next/image";
import logo from '../../public/logo.png'
import { createClient } from "../../utils/supabase/server";
import { LogOutButton } from "./logOutButton";
import { CreateButton } from "./createButton";


export const Header = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    return (
        <header className="px-3 py-2 md:py-4 bg-bgdark fixed top-0 w-full z-30 shadow-sm flex flex-row md:flex-row gap-4 items-center justify-between">
            <Link className="flex items-center gap-1" href={'/'}><Image className="w-10" src={logo} alt="logo" /><h1 className="font-mono text-lg font-bold text-neutral-100">BuzzBoard</h1></Link>
            {/* {user ? (
                <div className="flex">
                    <div className="w-[110px] mr-2">
                        <CreateButton />
                    </div>
                    <div className="w-[110px]">
                        <LogOutButton />
                    </div>
                </div>
            ) : (
                <Link href={'/auth/log-in'} className="bg-primary flex justify-center hover:bg-primaryhover text-neutral-100 font-mono font-bold py-2 rounded-full shadow-lg transition-all w-full max-w-[110px]">
                    Log in
                </Link>
            )} */}
            <Search />
        </header>
    )
};


