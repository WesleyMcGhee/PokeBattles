const deleteMe = document.querySelectorAll('.delete');
const pikaChoice = document.querySelector('#pikachu');
const charmChoice = document.querySelector('#charmander');
const squirtChoice = document.querySelector('#squirtle');
const charChoice = document.querySelector('#charizard');
const mewChoice = document.querySelector('#mewtwo');
const bulbChoice = document.querySelector('#bulbasuar');
const action = document.querySelector('#action');
const attackbtn = document.querySelector('#attack');
const healbtn = document.querySelector('#heal');
const protectbtn = document.querySelector('#protect');
const winStatus = document.querySelector('#win');

let gameActive = true;
let playerPoke;
let playerHealth = 100;
let computerHealth = 100;
let playerHealLeft = 2;
let computerHealLeft = 2;
let playerProtected = false;
let computerProtected = false;
let playersTurn;

const pokeArr = ['pikachu', 'charmander', 'bulbasaur', 'squirtle', 'mewtwo', 'charizard'];
const removePokeChoice = () => {
    charChoice.remove();
    pikaChoice.remove();
    charmChoice.remove();
    squirtChoice.remove();
    mewChoice.remove();
    bulbChoice.remove();
}
const randomPokemoneChoice = arr => {
    return Math.floor((Math.random() * arr.length));
}

const chosePoke = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${playerPoke}`).then((res) => {
        
        let newDiv = document.createElement('div');
        let newImg = document.createElement('img');
        let newP = document.createElement('p');
        action.appendChild(newDiv);
        newImg.src = `${res.data.sprites.back_default}`
        newDiv.appendChild(newImg);
        newDiv.appendChild(newP).textContent = `${playerHealth} / 100`;
        newP.id = 'player-health';
        newImg.id = 'player-pokemon';
    })
}
const computerPoke = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeArr[randomPokemoneChoice(pokeArr)]}`).then((res) => {
        let newDiv = document.createElement('div');
        let newImg = document.createElement('img');
        let newP = document.createElement('p');
        action.appendChild(newDiv);
        newImg.src = `${res.data.sprites.front_default}`;
        newDiv.appendChild(newImg);
        newDiv.appendChild(newP).textContent = `${computerHealth} / 100`;
        newP.id = 'computer-health';
        newImg.id = 'computer-pokemon';
    })
}
const rollDamage = () => {
    return Math.floor((Math.random() * 5) + 1);
}
const attack = (attacker) => {
    if(attacker === 'player'){
       computerHealth -= 15; 
    }else {
        if(playerProtected === false){
            playerHealth -= 15;
        }
    }
}
const heal = (healer) => {
    if (healer === 'player'){
        if (playerHealLeft > 0){
            playerHealth += 20;
            playerHealLeft--;
        }
    }else{
        computerHealth += 20;
        computerHealLeft--;
    }
}
const protect = (protecter) => {
    if (protecter === 'player'){
        playerProtected = true;
    }else{
        computerProtected = true;
    }
}
const makeSureAboveZero = () => {
    if (playerHealth < 0){
        playerHealth = 0;
    }
    if (computerHealth < 0){
        computerHealth = 0;
    }
}
const computerPlay = () => {
    if (computerHealth <= 20 && computerHealLeft > 0){
        heal('pc');
    }else{
        attack('pc');  
    }
    makeSureAboveZero();
}
const playerPlay = () => {
    if(playersTurn === 'attack'){
        attack('player');
    }else if(playersTurn === 'heal'){
        heal('player');
    }else if(playersTurn === 'protect'){
        protect('player');
    }
    makeSureAboveZero();
    gameActive = false;
    playersTurn = ''
}

const checkStatus = () => {
    if (playerHealth <= 0 && computerHealth <= 0){
        winStatus.textContent = 'Draw'
    }else if (playerHealth > 0 && computerHealth <= 0){
        winStatus.textContent = 'You win!'
    }else if (playerHealth <= 0 && computerHealth > 0){
        winStatus.textContent = 'You lose.'
    }
}
const beginPlay = () => {
    if (playerHealth > 0 && computerHealth > 0){
        gameActive = true;
        while (gameActive === true){
            playerPlay();
            computerPlay();
            checkStatus();
            playerProtected = false; 
            document.querySelector('#computer-health').textContent = `${computerHealth} / 100`;
            document.querySelector('#player-health').textContent = `${playerHealth} / 100`;
        }
    }
}
pikaChoice.addEventListener('click', () => {
    playerPoke = 'pikachu';
    removePokeChoice();
    chosePoke();
    computerPoke();
})
charmChoice.addEventListener('click', () => {
    playerPoke = 'charmander';
    removePokeChoice();
    chosePoke();
    computerPoke();
})
bulbChoice.addEventListener('click', () => {
    playerPoke = 'bulbasaur';
    removePokeChoice();
    chosePoke();
    computerPoke();
})
mewChoice.addEventListener('click', () => {
    playerPoke = 'mewtwo';
    removePokeChoice();
    chosePoke();
    computerPoke();
})
charChoice.addEventListener('click', () => {
    playerPoke = 'charizard';
    removePokeChoice();
    chosePoke();
    computerPoke();
})
squirtChoice.addEventListener('click', () => {
    playerPoke = 'squirtle';
    removePokeChoice();
    chosePoke();
    computerPoke();
})
attackbtn.addEventListener('click', () => {
    playersTurn = 'attack';
    beginPlay();
})
healbtn.addEventListener('click', () => {
    playersTurn = 'heal';
    beginPlay();
})
protectbtn.addEventListener('click', () => {
    playersTurn = 'protect';
    beginPlay();
})
