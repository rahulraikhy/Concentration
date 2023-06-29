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

### Pseudocode Screenshot
<img width="867" alt="Screenshot 2023-06-29 at 22 28 14" src="https://github.com/rahulraikhy/Concentration/assets/121837375/3d210807-3ca7-4cf3-a066-7bc122867b77">

### Interface Screenshot
![Screenshot 2023-06-29 at 20 10 37](https://github.com/rahulraikhy/Concentration/assets/121837375/db13b65a-a270-4dab-99d3-9faaa6661935)
![Screenshot 2023-06-29 at 20 05 06](https://github.com/rahulraikhy/Concentration/assets/121837375/b32b54b2-4c9a-4397-96e8-bd1f21b5aab3)

### Acknowldgements
Letter icons downloaded from Flaticon <a href="https://www.flaticon.com/free-icons/letter-k" title="letter k icons">Letter k icons created by Color creator - Flaticon</a>
