//############### Global Variables ###################\\
const URL = 'http://localhost:3000/monsters/'
let currentPage = 1 
let monsterData
let container = document.getElementById('monster-container')





//############### functions ###################\\

function numberOfPages(){
    fetch(`${URL}`)
    .then(response => response.json())
    .then(data => monsterData = data)
    
}

function fetchMonsters(limit, page){
    fetch(`${URL}?_limit=${limit}&_page=${page}`)
    .then(response => response.json())
    .then(monsterData => monsterData.forEach(monster => renderMonster(monster)))
}

function renderMonster(monster){
    // const container = document.getElementById('monster-container')

    const thisMonster = document.createElement('div')
    thisMonster.setAttribute('data-monster-id', monster.id)

    const thisName = document.createElement('h2')
    thisName.innerHTML = `Name: ${monster.name}`

    const thisAge = document.createElement('h4')
    thisAge.innerHTML = `Age: ${monster.age}`

    const thisDescription = document.createElement('p')
    thisDescription.innerHTML = `Description: ${monster.description}`

    thisMonster.append(thisName, thisAge, thisDescription)
    container.append(thisMonster)

}

function renderCreateForm(){
    const createForm = document.createElement('form')
    createForm.id = "monster-form"

    const nameField = document.createElement('input')
    nameField.id = "name"
    nameField.placeholder = "name"

    const ageField = document.createElement('input')
    ageField.id = "age"
    ageField.placeholder = "age"

    const descriptionField = document.createElement('input')
    descriptionField.id = "description"
    descriptionField.placeholder = "description"

    const submitBtn = document.createElement('button')
    submitBtn.innerHTML = "Boo"

    createForm.append(nameField, ageField, descriptionField, submitBtn)
    document.getElementById('create-monster').append(createForm)

}

function createMonster(monsterSubmission){
    monsterSubmission.preventDefault()
    const name = monsterSubmission.target.querySelector('input#name').value 

    const age = monsterSubmission.target.querySelector('input#age').value 

    const description = monsterSubmission.target.querySelector('input#description').value 

    const newMonster = {name, age, description}    // renderMonster(newMonster)
    //############### REMEMBER THIS BECAUSE THIS IS ALWAYS THE SAME ###################\\
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMonster)
    })
    .then(response => response.json())
    .then(monsterData => renderMonster(monsterData))
        monsterSubmission.target.reset()
       
}

function nextPage(){
    currentPage ++
        Array.from(container.children).forEach(spooky => spooky.remove())
    fetchMonsters (50, currentPage)
}

function previousPage(){
    if (currentPage > 0) {
        currentPage -- 
        Array.from(container.children).forEach(spooky => spooky.remove())
        fetchMonsters (50, currentPage)
    }
}

renderCreateForm()
fetchMonsters(50, 1)

//############### EVENT LISTNER ###################\\
document.getElementById('monster-form').addEventListener('submit', createMonster)
document.getElementById('back').addEventListener('click', previousPage)
document.getElementById('forward').addEventListener('click', nextPage)
