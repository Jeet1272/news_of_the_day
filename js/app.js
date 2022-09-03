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
/* ----------------------Blog Section -------------------- */
const blogDisply = () => {
    const displyElement = document.getElementById('blog')
    displyElement.innerHTML = `
    <p>1.var variables can be re-declared and updated, var variables are hoisted to the top of their scope and initialized with a value of undefined. let is block scoped and let can be updated but not re-declared. const cannot be updated or re-declared</p>
    <p>2.arrow functions do not have their own this but regular function  have. Inside the body of a regular function, arguments is a special array-like object containing the list of arguments with which the function has been invoked. On the other side, no arguments special keyword is defined inside an arrow function.</p>
    <p>3. .map() executes the same code on every element in an array and returns a new array with the updated elements. .forEach(), is used to execute the same code on every element in an array but does not change the array and it returns undefined. .filter() checks every element in an array to see if it meets a certain criteria and returns a new array with the elements that return truthy for the criteria. The .find() method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.</p>
    <p>4.Template literals provide an easy way to interpolate variables and expressions into strings. The method is called string interpolation.</p>
    
    `
}
