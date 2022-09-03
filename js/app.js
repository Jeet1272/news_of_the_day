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
        <a onclick="loadCategoryById('${category.category_id}')" class="nav-link" href="#">${category.category_name}</a>
        `
        categoriesElement.appendChild(li)
    }
}
const loadCategoryById = (Id) => {
    url = `https://openapi.programming-hero.com/api/news/category/${Id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryById(data.data))
}
const displayCategoryById = (categories) => {
    const categoryElement = document.getElementById('category-container')
    categories.forEach(category => {
        // console.log(category)
        const containerDiv = document.createElement('div')
        containerDiv.classList.add('row')
        containerDiv.innerHTML = `
    <div class="col-md-4">
        <img src="${category.image_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${category.title}</h5>
            <p class="card-text">${category.details}</p>
            <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-evenly">
                    <div>
                        <img src ="${category.author.img}">
                    </div>
                    <div>
                    <h5 class="card-text"><small class="text-muted">${category.author.name ? category.author.name : 'No namne found'}</small></h5>
                    <p>${category.author.published_date}</p>
                    </div>
                </div>
                <div>
                <i class="fa-solid fa-eye"></i> ${category.total_view ? category.total_view : 'No vewer'}
                </div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i onclick=modalViewrload('${category._id}') class="fa-solid fa-arrow-up-from-bracket"></i>
                </button>
                       
            </div>
        </div>
    </div>
    `
        categoryElement.appendChild(containerDiv)

    });
}
const modalViewrload = (Id) => {
    const url = `https://openapi.programming-hero.com/api/news/${Id}`
    fetch(url)
        .then(res => res.json())
        .then(data => modalViewrDisolay(data.data[0]))
}
const modalViewrDisolay = (category) => {



}

loadCategories()
