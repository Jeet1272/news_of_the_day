/* ----------- All Categories Disply Function ---------- */
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displyCategories(data.data.news_category))
        .catch(error => console.log(error))
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
/* -------------------- Spiner function ----------------- */
const toogleLoading = (isLoading) => {
    const spinnerElement = document.getElementById('spinner')
    if (isLoading === true) {
        spinnerElement.classList.remove('d-none')
    }
    else { spinnerElement.classList.add('d-none') }
}
/* ------- Category Disply Function ------------- */
const loadCategoryById = (Id) => {
    /* ----Spinner start----- */
    toogleLoading(true)
    url = `https://openapi.programming-hero.com/api/news/category/${Id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryById(data.data))
        .catch(error => console.log(error))
}
const displayCategoryById = (categories) => {
    const categoryElement = document.getElementById('category-container')
    categories.forEach(category => {
        const containerDiv = document.createElement('div')
        containerDiv.classList.add('card')
        containerDiv.innerHTML = `
<div class="row g-2">
    <div class="col-md-4">
        <img src="${category.image_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${category.title}</h5>
            <p class="card-text dot-dot-dot">${category.details}</p>
            <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-evenly w-50">
                    <div>
                        <img class="img-fluid rounded-start rounded-circle" src ="${category.author.img}">
                    </div>
                    <div>
                    <h5 class="card-text"><small class="text-muted">${category.author.name ? category.author.name : 'No namne found'}</small></h5>
                    <p>${category.author.published_date}</p>
                    </div>
                </div>
                <div class="w-25 pt-3">
                <i class="fa-solid fa-eye"></i> ${category.total_view ? category.total_view : 'No viewer'}
                </div>
                <button type="button" class="btn w-25 pb-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i onclick=modalViewrload('${category._id}') class="fa-solid fa-arrow-up-from-bracket"></i>
                </button>
                       
            </div>
        </div>
    </div>
</div>
    `
        categoryElement.appendChild(containerDiv)

    });
    /*------------ Spinner stop ----------*/
    toogleLoading(false)
}
/* -----------Modal function ------------------*/
const modalViewrload = (Id) => {
    const url = `https://openapi.programming-hero.com/api/news/${Id}`
    fetch(url)
        .then(res => res.json())
        .then(data => modalViewrDisply(data.data[0]))
        .catch(error => console.log(error))
}
const modalViewrDisply = (category) => {
    console.log(category)
    const modalTitel = document.getElementById('staticBackdropLabel')
    modalTitel.innerText = `
    ${category.title}
    `
    const modalBody = document.getElementById('modal-body')
    modalBody.innerText = `
    ${category.details}
    `
}

loadCategories()
