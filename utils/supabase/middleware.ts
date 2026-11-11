import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // 세션 토큰 갱신 + 로그인 여부 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 인덱스, 폴더별, 새 링크 페이지는 로그인한 사용자만 접근 가능
  const { pathname } = request.nextUrl;
  const isProtected =
    pathname === "/" ||
    pathname === "/new" ||
    pathname === "/reset-password" ||
    pathname.startsWith("/folder/");

  if (!user && isProtected) {
    const redirectResponse = NextResponse.redirect(new URL("/login", request.url));
    // 갱신된 세션 쿠키가 있다면 유지
    supabaseResponse.cookies.getAll().forEach((c) => redirectResponse.cookies.set(c));
    return redirectResponse;
  }

  return supabaseResponse;
};
