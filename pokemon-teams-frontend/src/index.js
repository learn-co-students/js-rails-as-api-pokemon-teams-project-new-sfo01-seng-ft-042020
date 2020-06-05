const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const container = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {
  getTrainers();
})

function getTrainers() {
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(obj => {
      for (const t of obj) {
        renderTrainer(t)
      }
    });
}

function renderTrainer(trainer) {
  // console.log(trainer)
  const card = document.createElement('div')
  card.className = "card"
  card.setAttribute('data-id', trainer.id)
  console.log(card)
  
  card.innerHTML = `<p>${trainer.name}</p>`
  container.appendChild(card)

  const add_button = document.createElement('button');
  add_button.setAttribute('data-trainer-id', trainer.id);
  add_button.addEventListener('click', (e) => {
    addPokemon(e.target);
  })
  add_button.innerHTML = "Add Pokemon";
  card.appendChild(add_button);

  const listContainer = document.createElement('ul')
  card.appendChild(listContainer)
  for (const pok of trainer.pokemons) {
    addPokemonToCard(pok, listContainer)
    // console.log(pok)
  

  }
}

function addPokemonToCard(pok, listContainer) {
  // console.log(pok)
  const listItem = document.createElement('li');
  listItem.textContent = `${pok.nickname} (${pok.species})`;
  const release_button = document.createElement('button');
  release_button.className = "release";
  release_button.setAttribute('data-pokemon-id', pok.id);
  release_button.innerHTML = "Release";
  release_button.addEventListener('click', (e) => {
    
    releasePokemon({pokemon: e.target.dataset.pokemonId, trainer: pok.trainer_id})
  })
  listItem.appendChild(release_button);
  listContainer.appendChild(listItem)
}

function addPokemon(target) {
  const trainer_id = target.getAttribute('data-trainer-id')
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
      trainer_id: trainer_id
    })
  }).then(res => res.json())
  .then((obj) => {
    if (obj.error) {
      console.log(obj.error)
      alert(obj.error)

    }
    else {
      const card = document.querySelector(`[data-id="${trainer_id}"]`)
      const list = card.lastElementChild;
      addPokemonToCard(obj, list)
    }
  }).catch( err => {
    
  }
  )
}

function releasePokemon(target) {
  console.log(target.pokemon)
  return fetch(`${BASE_URL}/pokemons/${target.pokemon}`, {
    method: 'delete'
  }).then(res => 
    res.json()).then(
      obj => removePokemon(obj)
    )
}

function removePokemon(pok) {
  // debugger
  const pokemon = document.querySelector(`[data-pokemon-id="${pok.id}"]`);
  const listItem = pokemon.parentElement;
  listItem.remove();
  
}