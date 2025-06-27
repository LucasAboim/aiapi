(async () => {
    const domain = window.location.hostname

    await fetch('https://nuxt-site-agent.vercel.app/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain })
    })

    const btn = document.createElement('button')
    btn.innerText = 'Fazer pergunta ao site'
    btn.style.position = 'fixed'
    btn.style.bottom = '20px'
    btn.style.right = '20px'
    btn.style.zIndex = 10000
    btn.onclick = async () => {
        const q = prompt('Ask me anything')
        const res = await fetch('https://nuxt-site-agent.vercel.app/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain, question: q })
        })
        const json = await res.json()
        alert(json.answer)
    }
    document.body.appendChild(btn)
})()
