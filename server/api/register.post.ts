import { OpenAI } from 'openai'
import { useSupabase } from '~/server/utils/useSupabase'


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const domain = body.domain

    const supabase = useSupabase()

    const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('domain', domain)
        .single()

    const now = new Date()
    let shouldUpdate = true

    if (data) {
        const lastUpdate = new Date(data.last_update)
        const diff = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)
        shouldUpdate = diff >= 3
    }

    let content = data?.content ?? ''

    if (!data || shouldUpdate) {
        const res = await fetch(`https://${domain}`)
        const html = await res.text()

        // EXTRAI TEXTO BRUTO
        const textOnly = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 3000)

        // USA OPENAI PARA RESUMIR
        const config = useRuntimeConfig()
        const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY })

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{
                role: 'system',
                content: 'Stay concise and helpful. Always focus on the context of the current site.'
            }, {
                role: 'user',
                content: textOnly
            }]
        })

        content = completion.choices[0].message.content ?? ''

        if (data) {
            await supabase.from('site_content').update({
                content,
                last_update: now.toISOString()
            }).eq('domain', domain)
        } else {
            await supabase.from('site_content').insert({
                domain,
                content
            })
        }
    }

    return { success: true }
})
