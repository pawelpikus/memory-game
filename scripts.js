const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let numOfMatches = 0;

function flipCard() {
  
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;

  checkForMatch();
  
}

function checkForMatch() {

  let isMatch = firstCard.dataset.item === secondCard.dataset.item;
  if (isMatch) {
    disableCards();
    ++numOfMatches;

  } else {
    unflipCards();
  }
}



function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard)
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockBoard = false;
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// IIFE 
(function shuffle() {
  cards.forEach(card => {
    let pos = Math.floor(Math.random() * 12);
    card.style.order = pos;
  });
})();

function reset(){
  //to do
}


cards.forEach(card => card.addEventListener('click', flipCard))