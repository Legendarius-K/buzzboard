import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  console.log("Middleware is running"); // Add this to check if it's running
  // return NextResponse.next();
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    protectedRoutes.some((route) => route.test(request.nextUrl.pathname))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/log-in";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
};

const protectedRoutes = [/^\/create$/, /^\/post\/[^\/]+\/edit$/];
