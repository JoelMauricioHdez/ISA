
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/models/supabase'

const supabase = createClientComponentClient<Database>()

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body>
        {children}
    </body>
  )
}
