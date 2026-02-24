const newsContainer = document.getElementById("news-container")

async function loadNews() {
    // reset UI
    newsContainer.textContent = ""

    const page = Math.floor(Math.random() * 10 + 1)
    const url = `https://api.spaceflightnewsapi.net/v4/articles/?limit=6&offset=${page * 6}`

    try {
        const res = await fetch(url)
        const json = await res.json()

        renderNews(json.results)
    } catch (e) {
        showError()
    }
}

function renderNews(articles) {
    articles.forEach(item => {
        const card = buildCard(item)
        newsContainer.appendChild(card)
    })
}

function buildCard(article) {
    const card = document.createElement("div")
    card.classList.add("card")

    const img = document.createElement("img")
    img.src = article.image_url

    const content = document.createElement("div")
    content.className = "card-content"

    const title = document.createElement("h3")
    title.textContent = article.title

    const summary = document.createElement("p")
    summary.textContent = article.summary.substring(0, 120) + "..."

    const link = document.createElement("a")
    link.href = article.url
    link.target = "_blank"
    link.textContent = "Read More"

    content.append(title, summary, link)
    card.append(img, content)

    return card
}

function showError() {
    newsContainer.innerHTML =
        "<p style='color:white;text-align:center;'>Failed to load news.</p>"
}