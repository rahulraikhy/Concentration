/*----- constants -----*/
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector("game-container");
const result = document.getElementById("result");
const controls = document.querySelector("controls-container");

/*----- state variables -----*/
let cards;
let interval;
let firstCard = false;
let secondCard = false;

/*----- cached elements  -----*/
const items = [
    {name: "a", Image: "letter-a.png"},
    {name: "b", Image: "letter-b.png"},
    {name: "c", Image: "letter-c.png"},
    {name: "d", Image: "letter-d.png"},
    {name: "e", Image: "letter-e.png"},
    {name: "f", Image: "letter-f.png"},
    {name: "g", Image: "letter-g.png"},
    {name: "h", Image: "letter-h.png"},
    {name: "i", Image: "letter-i.png"},
    {name: "j", Image: "letter-j.png"},
    {name: "k", Image: "letter-k.png"},
    {name: "l", Image: "letter-l.png"},
];


/*----- functions -----*/
let seconds = 0, minutes = 0;

let movesCount = 0, winCount = 0;

const timeGenerator = () => {
    seconds =+ 1;

    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }

    let secondsValue = seconds < 10 ? `0{seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0{minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`
};

const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;

    for(let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;   
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = " ";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
            <img src="${cardValues[i].image}"class="image"/></div>
        </div>
        `;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => { 
        card.addEventListener("click", () => {
            if(!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if(!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                }
            }
            else{
                movesCounter();
                secondCard = card;
                let secondCardValue = card.getAttribute("data-card-value");
                if(firstCard === secondCardValue) {
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");
                    first
                } else {

                }
            }
        })
    })
};

const initializer = () => {
    result.innerText = " ";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};

initializer(); 