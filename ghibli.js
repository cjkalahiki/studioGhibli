const baseURL = 'https://ghibliapi.herokuapp.com'; //no key needed
let url; //add the /people to grab the people and films endpoints

//Button 
const submitButton = document.querySelector('.submitButton');
const section = document.querySelector('section');
section.style.display = 'none';

//eventListener
submitButton.addEventListener('click', fetchPeople);

function fetchPeople(e) {
    e.preventDefault();
    url = baseURL + '/people';

    // fetchFilms returns an object, need to grab the .people and feed that into fetchPeople()
    fetch(url)
        .then(function(result){
            return result.json();
        })
        .then(function(json){
            let randomNumber = Math.round((Math.random()*42)); //0-42
            console.log(json[randomNumber]); //grabs people endpoint
            displayResults(json[randomNumber]); //grabs a random person from the people endpoint
        })
}

function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    section.style.display = 'block';
 
    let name = document.createElement('h2');
    let age = document.createElement('p');
    let species = document.createElement('p');
    let gender = document.createElement('p');
    let eyeColor = document.createElement('p');

    /*
        need to populate a p tag 
    */

    if (json.name) {
        name.textContent = json.name;
    } else {
        name.textContent = 'No Name';
    }

    if (json.eye_color) {
        eyeColor.textContent = `Eye color: ${json.eye_color}`;
    } else {
        eyeColor.textContent = `Eye color: None`;
    }

    if (json.age) {
        age.textContent = `Age: ${json.age}`;
    } else {
        age.textContent = `Age: Unknown`;
    }
    
    if (json.gender) {
        gender.textContent = `Gender: ${json.gender}`;
    } else {
        gender.textContent = `Gender: Not applicable`;
    }

    fetch(json.species) //because the json.species is a URL, need this promise
        .then(function(result){
            return result.json();
        })
        .then(function(json){
            console.log(json.name);
            species.textContent = `Species: ${json.name}`
        })
    
    section.appendChild(name);
    section.appendChild(age);
    section.appendChild(gender); 
    section.appendChild(eyeColor);
    section.appendChild(species);
}