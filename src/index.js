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
    let ramenList = []
    let firstRender = 0
    let newIds = 0

    // render page with initial data
    function renderRamen(ramenData) {
        menu.replaceChildren()
        // console.log(ramenData)
        ramenData.forEach(ramenObj => {
            newIds += 1
            getDetails(ramenData[0])
            ramenImg = createTag('img')
            ramenImg.src = ramenObj.image
            menu.append(ramenImg)
            ramenImg.addEventListener('click', () => getDetails(ramenObj))
        })
        if (firstRender === 0) {
            ramenList = [...ramenData]
            firstRender += 1
        }
    }
    
    // get data and set to featured ramen
    function getDetails(data) {
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
        
        name.textContent = data.name
        restaurant.textContent = data.restaurant
        rating.textContent = data.rating
        comment.textContent = data.comment

        featuredRamen = retrieveFeatured(data)
        // console.log(featuredRamen)
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
        console.log(featuredRamen.id)
        deleteOldRamen(featuredRamen.id)
        ramenList = ramenList.filter(obj => obj.id !== featuredRamen.id)
        menu.replaceChildren()
        renderRamen(ramenList)
    })

    // set new values to current ramen
    function updateRamen(newComment, newRating) {
        const rating = document.querySelector('#rating-display')
        const comment = document.querySelector('#comment-display')
        rating.textContent = newRating.value
        comment.textContent = newComment.value
        featuredRamen.comment = newComment.value
        featuredRamen.rating = newRating.value
        patchCurrentRamen(featuredRamen)
    }
    // creates new ramen object when submitted
    function submitRamen() {
        const nameIn = document.querySelector('#new-name').value
        const restaurantIn = document.querySelector('#new-restaurant').value
        const imgIn = document.querySelector('#new-image').value
        const ratingIn = document.querySelector('#new-rating').value
        const commentIn = document.querySelector('#new-comment').value
        newIds += 1

        const newRamenObj = {
            id: newIds,
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
        // console.log(ramenList)
        ramenList.push(ramenObj)
        console.log(ramenObj.id)
        renderRamen(ramenList);
        putNewRamen(ramenObj)

        newImg.addEventListener('click', () => getDetails(ramenObj))
    }
    // add new ramen object to json
    function putNewRamen(object) {
        fetch(`${ramenUrl}/#${object.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }

    function deleteOldRamen(id) {
        console.log(id)
        fetch(`${ramenUrl}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }

    function patchCurrentRamen(object) {
        fetch(`${ramenUrl}/${object.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }
})
