import "bootstrap";
import "./style.css";

const ROW = document.querySelector(".row");
const DECK = document.querySelector("#number");
const FORM = document.querySelector("form");
const BUTTON = document.querySelector("#bubble");

const SUITS = ["♦", "♥", "♠", "♣"];
const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

let cards = [];
//EVENT
FORM.addEventListener("submit", event => {
  event.preventDefault();
  ROW.innerHTML = "";

  cards = [];

  for (let i = 0; i < DECK.value; i++) {
    cards.push(getCard());
  }

  drawCards(cards);
  console.log(cards);
});
//EVENT
BUTTON.addEventListener("click", event => {
  event.preventDefault();
  //SELECTION ALGORITHM
  let n = cards.length;

  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (cards[j].value < cards[min].value) {
        min = j;
      }
    }
    if (min != i) {
      let tmp = cards[i].value;
      cards[i].value = cards[min].value;
      cards[min].value = tmp;
    }
  }
  ROW.innerHTML = "";
  drawCards(cards);
});

//FUNCTIONS
function getCard() {
  return {
    value: VALUES[getRandom(VALUES)],
    suit: SUITS[getRandom(SUITS)]
  };
}

function getRandom(list) {
  return Math.floor(Math.random() * list.length);
}
//DRAW CARD
function drawCards(cards) {
  for (const card of cards) {
    let cardBody = document.createElement("div");
    cardBody.classList.add("card");
    ROW.appendChild(cardBody);

    let iconHeart = document.createElement("div");
    iconHeart.classList.add("iconHeart");
    let iconText = document.createTextNode(card.suit);
    iconHeart.appendChild(iconText);
    cardBody.appendChild(iconHeart);

    let numberElement = document.createElement("div");
    numberElement.classList.add("numberElement");
    let numberText = document.createTextNode(card.value);
    numberElement.appendChild(numberText);
    cardBody.appendChild(numberElement);

    let inverseElement = document.createElement("div");
    inverseElement.classList.add("inverseElement");
    let inverseText = document.createTextNode(card.suit);
    inverseElement.appendChild(inverseText);
    cardBody.appendChild(inverseElement);
    //CONDITIONAL
    if (card.suit == "♥" || card.suit == "♦") {
      iconHeart.classList.add("red");
      inverseElement.classList.add("red");
      numberElement.classList.add("red");
    } else {
      iconHeart.classList.add("black");
      inverseElement.classList.add("black");
      numberElement.classList.add("black");
    }
  }
}
