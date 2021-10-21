// write your code here
const ramenUrl ='http://localhost:3000/ramens'
document.addEventListener('DOMContentLoaded', () => {
    fetch(ramenUrl)
    .then(res => res.json())
    .then(json => renderRamen(json))

    const menu = document.querySelector('#ramen-menu')
    const ramenForm = document.querySelector('#new-ramen')
    const editForm = document.querySelector('#edit-ramen')
    const deleteBtn = document.querySelector('.delete-btn')

    let featuredRamen

    // render page with initial data
    function renderRamen(ramenData) {
        ramenData.forEach(ramenObj => {
            getDetails(ramenData[0])
            ramenImg = createTag('img')
            ramenImg.src = ramenObj.image
            // console.log(ramenImg)
            menu.append(ramenImg)
            ramenImg.addEventListener('click', () => getDetails(ramenObj))
        })
    }
    
    // get data and set to featured ramen
    function getDetails(data) {
        // console.log(data)
        const img = document.querySelector('.detail-image')
        const name = document.querySelector('.name')
        const restaurant = document.querySelector('.restaurant')
        const rating = document.querySelector('#rating-display')
        const comment = document.querySelector('#comment-display')
        const editComment = document.querySelector('#edit-comment')
        const editRating = document.querySelector('#edit-rating')
        
        editComment.value = data.comment
        editRating.value = data.rating
        img.src = data.image
        img.id = data.id
        console.log(img)
        name.textContent = data.name
        restaurant.textContent = data.restaurant
        rating.textContent = data.rating
        comment.textContent = data.comment

        featuredRamen = retrieveFeatured(data)

        // console.log(retrieveFeatured(data))

    }
    // gets featured ramen obj
    function retrieveFeatured(obj) { return obj }
    // creates new element
    function createTag(tag) {
        return document.createElement(tag)
    }
    // form submission handler
    ramenForm.addEventListener('submit', (e) => {
        e.preventDefault()
        submitRamen()
    })
    //edit form submission handler
    editForm.addEventListener('submit', (e) => {
        const editComment = document.querySelector('#edit-comment')
        const editRating = document.querySelector('#edit-rating')
        e.preventDefault()
        updateRamen(editComment, editRating)
    })
    // delete ramen from menu
    deleteBtn.addEventListener('click', () => {
        console.log(menu)
        const removeId = featuredRamen.id
        
    })

    // set new values to current ramen
    function updateRamen(newComment, newRating) {
        // console.log(data)
        const rating = document.querySelector('#rating-display')
        const comment = document.querySelector('#comment-display')
        rating.textContent = newRating.value
        comment.textContent = newComment.value
        featuredRamen.comment = newComment.value
        featuredRamen.rating = newRating.value
        // editForm.reset()
    }
    // creates new ramen object when submitted
    function submitRamen() {
        const nameIn = document.querySelector('#new-name').value
        const restaurantIn = document.querySelector('#new-restaurant').value
        const imgIn = document.querySelector('#new-image').value
        const ratingIn = document.querySelector('#new-rating').value
        const commentIn = document.querySelector('#new-comment').value

        const newRamenObj = {
            id: 8,
            name: nameIn,
            restaurant: restaurantIn,
            image: imgIn,
            rating: ratingIn,
            comment: commentIn
        }
        addNewRamen(newRamenObj)
        ramenForm.reset()
    }
    // adds submitted ramen image to menu
    function addNewRamen(ramenObj) {
        const newImg = createTag('img')
        newImg.src = ramenObj.image
        menu.append(newImg)
        newImg.addEventListener('click', () => getDetails(ramenObj))
    }
})
