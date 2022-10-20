const URL = 'http://localhost:3000/ramens'


//selecting elements
const menu = document.querySelector('#ramen-menu')
const detail = document.querySelector('#ramen-detail')
const detailImage = document.querySelector('.detail-image')
const detailName = document.querySelector('.name')
const restaurant = document.querySelector('.restaurant')
const rating = document.querySelector('#rating-display')
const comment = document.querySelector('#comment-display')

//selecting new ramen form
const newForm = document.querySelector('#new-ramen')

//selecting edit ramen form
const updateForm = document.querySelector('#edit-ramen')

//delete button
const deleteButton = document.querySelector('#delete-ramen')


//fetching all ramens, call displayRamen and return first ramen
function onLoad() {
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        data.forEach(ramen => displayRamen(ramen))
        return data[0]
    })
    .then(data => displayInfo(data))
}

//displaying the menu
function displayRamen(ramen) {
    const img = document.createElement('img')
    img.src = ramen.image
    const button = document.createElement('button')
    button.textContent = "X"
    menu.append(img, button)

    //calling function to display info about each ramen
    img.addEventListener('click', () => {
        displayInfo(ramen)
    })
    //removing ramen from the menu
    button.addEventListener('click', () => {
        img.remove()
        button.remove()
    })
}

//displaying ramen's detail
function displayInfo(ramen) {
detailImage.src = ramen.image
detailName.textContent = ramen.name
restaurant.textContent = ramen.restaurant
comment.textContent = ramen.comment
rating.textContent = ramen.rating
}

//EVENT LISTENERS

//submitting form with the new ramen
newForm.addEventListener('submit',(e) => {
e.preventDefault();

// displaying new ramen in the menu div
// const newImg = document.createElement('img')
// newImg.src = e.target['new-image'].value
// menu.append(newImg)

//creating new ramen object
const newRamen = {
    name: e.target['new-name'].value,
    restaurant: e.target['new-restaurant'].value,
    image: e.target['new-image'].value,
    rating: e.target['new-rating'].value,
    comment: e.target['new-comment'].value,
}

//POST request
fetch(URL, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRamen)
})
.then(res => res.json())
.then(data => displayRamen(data))
})

//submitting form to update the ramen
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

const newObject = { 
    rating: e.target['new-rating'].value,
    comment: e.target['new-comment'].value
}
rating.textContent = newObject.rating
comment.textContent = newObject.comment
})


//calling function to fetch data
onLoad()
