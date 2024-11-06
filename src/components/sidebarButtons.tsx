import Link from "next/link";
import { createClient } from "../../utils/supabase/client";
import { CreateButton } from "./createButton";
import { LogOutButton } from "./logOutButton";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";


export const SidebarButtons = () => {
     const [user, setUser] = useState<User | null>(null);

     useEffect(() => {
       const fetchUser = async () => {
         const supabase = createClient(); 
         const { data } = await supabase.auth.getUser(); 
         setUser(data.user); 
       
       };

       fetchUser();
     }, []); 
    

    return (
      <>
        {user ? (
          <div className="flex flex-col gap-4">
            <div className="w-[110px] mr-2">
              <CreateButton />
            </div>
            <div onClick={() => setUser(null)} className="w-[110px]">
              <LogOutButton />
            </div>
          </div>
        ) : (
          <Link
            href={"/auth/log-in"}
            className="bg-primary flex justify-center hover:bg-primaryhover text-neutral-100 font-mono font-bold py-2 rounded-full shadow-lg transition-all w-full max-w-[110px]"
          >
            Log in
          </Link>
        )}
      </>
    );
};

