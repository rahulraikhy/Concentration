# Concentration
Concentration is a simple memory game. Match the pairs together and win! Be careful though, can you keep one eye on the clock and the other on completing in the least moves possible?

### MVP
Winning Logic:

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

### Pseudocode Screenshot
<img width="867" alt="Screenshot 2023-06-29 at 22 28 14" src="https://github.com/rahulraikhy/Concentration/assets/121837375/3d210807-3ca7-4cf3-a066-7bc122867b77">

### Interface Screenshot
![Screenshot 2023-06-29 at 20 10 37](https://github.com/rahulraikhy/Concentration/assets/121837375/db13b65a-a270-4dab-99d3-9faaa6661935)
![Screenshot 2023-06-29 at 20 05 06](https://github.com/rahulraikhy/Concentration/assets/121837375/b32b54b2-4c9a-4397-96e8-bd1f21b5aab3)

### Acknowldgements
Letter icons downloaded from Flaticon <a href="https://www.flaticon.com/free-icons/letter-k" title="letter k icons">Letter k icons created by Color creator - Flaticon</a>
