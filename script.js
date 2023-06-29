/*----- constants -----*/
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

/*----- state variables -----*/
let cards;
let interval;
let firstCard = false;
let secondCard = false;

/*----- cached elements  -----*/
const items = [
    { name: "a", image: "letter-a.png" },
    { name: "b", image: "letter-b.png" },
    { name: "c", image: "letter-c.png" },
    { name: "d", image: "letter-d.png" },
    { name: "e", image: "letter-e.png" },
    { name: "f", image: "letter-f.png" },
    { name: "g", image: "letter-g.png" },
    { name: "h", image: "letter-h.png" },
];

/*----- functions -----*/
let seconds = 0,
    minutes = 0;

let movesCount = 0,
    winCount = 0;

const timeGenerator = () => {
    seconds += 1;

    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }

    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
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

    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    const imagesPath = "./img/concentration-images/"
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
            <div id="${i}" class="card-before">?</div>
            <div class="card-after">
            <img src="${imagesPath}${cardValues[i].image}" class="image"/></div>
        </div>
        `;
    }

    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", (evt) => {
            if (firstCard && secondCard) return
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                console.log(firstCard.id, evt.target)
                if (!firstCard || firstCard.id === evt.target.id) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue === secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        secondCard = false;
                        winCount += 1;
                        if (winCount === Math.floor(cardValues.length / 2)) {
                            result.innerHTML = `<h2>You Won</h2>
                        <h4>Moves: ${movesCount}</h4>`;
                            stopGame();
                        }
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                            firstCard = false;
                            secondCard = false;
                        }, 1000 * 2);
                    }
                }
            }
        });
    });
};

startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    controls.classList.add("hide");
    stopButton.classList.remove("hide")
    startButton.classList.add("hide");
    interval = setInterval(timeGenerator, 1000);
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`
    initializer();
});

stopButton.addEventListener("click", (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
})
);

const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};