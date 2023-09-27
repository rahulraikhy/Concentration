# Project 1: Concentration Game

<!-- ABOUT THE PROJECT -->

## Project Overview

For my first individual project as part of General Assembly's Software Engineering Immersive programme, we had been tasked with creating a game in the browser utilising vanilla JavaScript, HTML, and CSS. We were assigned seven days to complete this, as my first real game created using vanilla JavaScript, this was a thoroughly enjoyable (if not occasionally frustrating) project.

![Screenshot 2023-09-27 at 17 39 13](https://github.com/rahulraikhy/Concentration/assets/121837375/3ae8e786-54a8-4a08-bc74-6be2a80fceae)


## Play The Game

<strong><p><a href="https://rahulraikhy.github.io/Concentration/">Click here to play Concentration!</a></p></strong>

## About The Game

Concentration is a simple memory game. Match the pairs together and win! Be careful though, can you keep one eye on the clock and the other on completing in the least moves possible?

The board has 16 cards, 8 pairs, the user has a timer and move counter in the top right hand corner of the screen to track the total amount of time and moves the user takes to complete the game.

The original idea of this game was to incorporate children's learning into a JavaScript game, by targeting letter recognition as well as developing memory skills

![ezgif com-optimize](https://github.com/rahulraikhy/Concentration/assets/121837375/f4e485df-90a7-4ed9-a970-6da0240c710f)

<!-- GETTING STARTED -->

### Built With

For this project, I utilised the following tools:

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<!-- ROADMAP -->

## Project Brief

- Render a game in the browser
- Include win/loss logic and render win/loss messages in HTML
- Include separate HTML, CSS & JavaScript files
- Use vanilla JavaScript
- Have properly indented HTMl, CSS and JavaScript
- No remaining commented out or unused code
- Name functions and variables sensibly
- Code in a consistent manner
- Deploy the game online via GitHub Pages

## Planning

I began by putting together a plan/wireframe of what I'd want the final product to look like, including all buttons, cards, and additional features. Following this, I put together a list of all the different functionalities the game required, and ranked them in order of necessity, with the most important being the basic requirements to get the game live and running, which included the most basic functionality to get the game working (labelled as my MVP), and the extra features/functionality moved into my Nice to have list.

**Wireframe**

<img width="867" alt="Screenshot 2023-06-29 at 22 28 14" src="https://github.com/rahulraikhy/Concentration/assets/121837375/3d210807-3ca7-4cf3-a066-7bc122867b77">

**MVP** - Minimum Viable Product

- [x] A working game board
- [x] Basic gameplay functionality
- [x] A way to register a win
- [x] Live and playable online

**NTH - Nice to have**

- [x] Timer
- [x] Move Counter
- [ ] Multiple categories
- [ ] Leaderboard/Scoreboard

## Getting Started

**Setting the Board**

```
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
```
The above function was used to generate the random array of card values. The size parameter sets the size of game board grid to 4x4, a shallow copy of the items array was created so as to ensure the original items array was unaltered, following this, I initialized an empty array to store the selected card values. As I required pairs of cards to be able to match in the game, I ran:

```
size = (size * size) / 2;
```
This ensured the board contained 16 slots, but only required 8 unique card values in order to facilitate pairs.

Following this, I implemented a matrix generator function to create the grid around the card values.

```
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
```

Beginning by clearing the grid, I doubled the card values array as each card must appear twice, and utilised a simple sort method to ensure the cards were shuffled. 
The for loop generates the cards and appends them to the game board (gameContainer), and finally, set the CSS grid layout for the game board using the size parameter declared above.

**Winning Logic:**

Initially, both, first and second card variables are set to false
```
let firstCard = false;
let secondCard = false;
```

The first statement checks if the first card and second card match, then return out of the function. The second if statement checks if the first card does not match, then flip the card back over.

```
  cards.forEach((card) => {
        card.addEventListener("click", (evt) => {
            if (firstCard && secondCard) return
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                console.log(firstCard.id, evt.target)
                if (!firstCard || firstCard.id === evt.target.id) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
```

The next else statement checks if the first card and the second card have the same value, then have them as matched, run the moves Counter function and one to the moves total, and one to the win counter, once the win count hits 8 (16 cards but divided by 2 as they are in matching pairs), stop the game and run the win message. If the win counter hasn't hit 8 yet, return both first and second card variables to false.

```
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
```

The final else statement initiates the timeout function, if two cards are flipped, allow two seconds to see both cards before flipping them back over.

```
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                            firstCard = false;
                            secondCard = false;
                        }, 1000 * 2);
```

Bugs:

This allowed for 2 bugs:-

1) Double click on a single image to match itself (resolved)
2) Clicking rapidly allowed for more than two clicks to be registered, thus breaking the game logic by turning over more than two cards in one turn (resolved)

Resolution 1)

```
 card.addEventListener("click", (evt) => {
...
                if (!firstCard || firstCard.id === evt.target.id) {
                    firstCard = card;
```

Resolution 2)

```
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                            firstCard = false;
                            secondCard = false;
```

Guard measure inserted to say if first card and second match, no need to run the rest of the function and continue gameplay.

```
   if (firstCard && secondCard) return
```

## Biggest Challenge

The biggest challenge was definitely trying to solve the above two bugs, requiring to "lock" the board so a user was unable to click whilst cards were already flipped and did not match, thus breaking the game and leaving flipped cards that did not match remaining flipped.

## User Feedback

- [ ] Add further categories
- [ ] Add images and the matching words from other languages in order to aid children/adults learn a foreign language

## Next Steps

- Implement the above User Feedback

## Wins

- The biggest challenge, blocker, and eventual win for me was figuring out how to lock the board for enough time for the user to see the flipped cards, register they didn't match, have a long enough time to recognise both letters, but not long enough that memorising the letters becomes too simple, or long enough to lose the user's interest. Moving past this involved factoring in UX/UI design in how to keep the user engaged and active to completing the game (keeping in mind the overall goal was to educate children), as well as technical knowledge.
- A big win for me in this project was the significant increase in my understanding and knowledge of JavaScript, having the challenge of building this game after only two weeks of learning JavaScript, HTML, and CSS really took me out of my comfort zone and I am very happy with the final result.

## Mistakes / Bugs

- There is an issue with the size of the div after it has been clicked, when trying to flip a card around one that has already been flipped
- The timer does not show up in the final winning message

## Key Learnings

- Take breaks and tidy up code, keep it DRY
- Code CSS for mobile first
- Assign time to unit testing
- Getting user feedback is key

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such a brilliant place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some New Feature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

Rahul Raikhy - [LinkedIn](https://www.linkedin.com/in/rahul-raikhy-31ab62197//) - rlraikhy@gmail.com

Project Link: [https://rahulraikhy.github.io/Concentration/](https://rahulraikhy.github.io/Concentration/)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

These resources helped me greatly in the completion of my game.

- [Flaticon](https://www.flaticon.com/)
- [Img Shields](https://shields.io)
- [Trello](https://trello.com/)
- [EZ gif](https://ezgif.com/)
