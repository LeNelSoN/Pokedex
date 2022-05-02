const poke_container = document.getElementById("poke_container");
const searchPokemon = document.getElementById("pokesearch");

function divPokemon(pokemon) {
    const pokeElt = document.createElement('div');
    pokeElt.classList.add('pokemon');
    const { id, name, sprites, types} = pokemon;
    const type1 = types[0].type.name;
    const pokeCard = `
    <div id="${name}" class="poke">
        <div class="img-container">
            <img src="${sprites.front_default}" alt="${name}">
        </div>
        <div class="info">
         <span class="number"> # ${id}</span></br>
            <h3 class="name">${name}</h3>
        </div>
    </div>`;

    pokeElt.innerHTML = pokeCard;
    poke_container.appendChild(pokeElt);
}

/**
 * Créer une reponse en json depuis l'api
 * @param {string} url url de l'api
 * @param {number} id id du pokemon
 */
async function getPokemon(url,id) {  
    const res = await fetch(`${url}${id}`);
    const pokemon = await res.json();
    divPokemon(pokemon);
};

/**
 * For loop sur la liste des pokemons entre deux valeurs
 * @param {number} theFirst premiere valeur
 * @param {number} theLast seconde valeur
 */
async function listPokemon(theFirst, theLast) {
    for (let i = theFirst; i <= theLast; i++) {
        await getPokemon('https://pokeapi.co/api/v2/pokemon/',i);
    }    
}

// Bouton select generation
function btnGen(btn,FirstPokemon,LastPokemon) {
    this.btn = document.querySelector(`#${btn}`);
    this.FirstPokemon = FirstPokemon;
    this.LastPokemon = LastPokemon;
};

let btn1 = new btnGen("btn1st",1,151);
let btn2 = new btnGen("btn2nd",152,251);
let btn3 = new btnGen("btn3rd",252,386);
let btn4 = new btnGen("btn4th",387,493);
let btn5 = new btnGen("btn5th",484,649);
let btn6 = new btnGen("btn6th",650,721);
let btn7 = new btnGen("btn7th",722,809);
let btn8 = new btnGen("btn8th",810,905);

let btnSelectGen = new Array();
btnSelectGen[0] = btn1
btnSelectGen[1] = btn2
btnSelectGen[2] = btn3
btnSelectGen[3] = btn4
btnSelectGen[4] = btn5
btnSelectGen[5] = btn6
btnSelectGen[6] = btn7
btnSelectGen[7] = btn8

for (let i = 0; i < btnSelectGen.length; i++) {
    btnSelectGen[i].btn.addEventListener('click', () => {
        poke_container.innerText = "";
        listPokemon(btnSelectGen[i].FirstPokemon, btnSelectGen[i].LastPokemon);

    })
};

//input search pour rechercher un pokémon par nom ou numéro
searchPokemon.addEventListener('keyup', () => {
    poke_container.innerText = "";
    const PokemonToSearch = searchPokemon.value
    console.log(PokemonToSearch)
    fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonToSearch}`)
    .then(response => response.json())
    .then(pokemon => divPokemon(pokemon))
    .catch();
})

document.getElementsByClassName('poke').addEventListener('click', () => {})