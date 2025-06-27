// server/utils/useSupabase.ts
import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
    const config = useRuntimeConfig()
    // TODO: fix this...
    return createClient(
        'https://qdwvoduknvvknjcplrhg.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkd3ZvZHVrbnZ2a25qY3BscmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTMxNTAsImV4cCI6MjA2NTgyOTE1MH0.ybbu4ZIrk-KBcJB-5yLpqGFhmn0kfNKLn7Vh6DlT9yI'
    )
}
