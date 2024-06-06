import { createServerClient, type CookieOptions, serialize } from '@supabase/ssr'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { getCookie, setCookie } from 'cookies-next';

export default function createResReqClient(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return getCookie(name, {req, res});
        },
        set(name: string, value: string, options: CookieOptions) {
          setCookie(name, value, {req, res, ...options});
        },
        remove(name: string, options: CookieOptions) {
          setCookie(name, "", {req, res, ...options});
        },
      },
    }
  )

  return supabase
}