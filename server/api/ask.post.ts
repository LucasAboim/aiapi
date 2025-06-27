import { OpenAI } from 'openai'
import { useSupabase } from '~/server/utils/useSupabase'


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const domain = body.domain
    const question = body.question

    const supabase = useSupabase()
    const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('domain', domain)
        .single()

    if (!data) return { error: 'Domain not registered' }

    const config = useRuntimeConfig()
    const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY })

    const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: 'system', content: `You are a helpful assistant embedded in a website. Your sole purpose is to answer questions specifically related to this website — including its content, features, functionality, and anything the user can interact with here.
If a user asks a question that is unrelated to this website, such as general knowledge, personal advice, news, or anything not directly tied to the website’s content or purpose, politely decline to answer.
Stay concise and helpful. Always focus on the context of the current site:\n\n${data.content}` },
            { role: 'user', content: question }
        ]
    })

    return { answer: completion.choices[0].message.content }
})
