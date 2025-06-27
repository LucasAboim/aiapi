// server/utils/useSupabase.ts
import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
    const config = useRuntimeConfig()
    return createClient(config.supabaseUrl, config.supabaseKey)
}
