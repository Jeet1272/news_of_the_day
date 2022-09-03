const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displyCategories(data.data.news_category))
}
const displyCategories = (categories) => {
    const categoriesElement = document.getElementById('categorys')
    for (const category of categories) {
        const li = document.createElement('li')
        li.classList.add('nav-item')
        li.innerHTML = `
        <a class="nav-link" href="#">${category.category_name}</a>
        `
        categoriesElement.appendChild(li)
    }
}

loadCategories()
