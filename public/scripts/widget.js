(async () => {
    scriptTag = document.currentScript
    const domain = this.scriptTag.dataset.domain
    const baseUrl = this.scriptTag.dataset.apiUrl

    await fetch(baseUrl + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain })
    })



    const btn = document.createElement('button')
    btn.innerHTML = '?';
    btn.style.position = 'fixed'
    btn.style.top = '20px'
    btn.style.right = '20px'
    btn.style.borderRadius = '50px'
    btn.style.backgroundColor = 'white'
    btn.style.fontSize = '1.2rem'
    btn.style.padding = '0 0.75rem'
    btn.style.zIndex = 10000
    btn.onclick = async () => {
        const q = prompt('Ask me anything')
        const res = await fetch(baseUrl + '/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain, question: q })
        })
        const json = await res.json()
        alert(json.answer)
    }
    document.body.appendChild(btn)
})()
