import Link from "next/link";
import { createClient } from "../../utils/supabase/client";
import { CreateButton } from "./createButton";
import { LogOutButton } from "./logOutButton";
import { useEffect, useState } from "react";


export const SidebarButtons = () => {
     const [user, setUser] = useState(null);
    //  const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchUser = async () => {
         const supabase = createClient(); // Initialize the Supabase client
         const { data } = await supabase.auth.getUser(); // Get user data
         setUser(data.user); // Set the user data
        //  setLoading(false); // Mark loading as complete
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
            <div className="w-[110px]">
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

