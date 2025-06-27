// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    OPENAI_API_KEY: '',
    SUPABASE_URL: '',
    SUPABASE_SERVICE_ROLE: '',
    public: {},
    // variável privada
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE,
    openaiApiKey: process.env.OPENAI_API_KEY,
  }
})
