const actions = ['run', 'jump', 'swim', 'read', 'write', 'eat', 'sleep', 'dance'];
let board = [];
let firstCard = null;
let lock = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  const doubled = [...actions, ...actions];
  board = shuffle(doubled);
  firstCard = null;
  lock = false;

  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  board.forEach((action, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.word = action;
    card.dataset.index = index;
    card.onclick = () => revealCard(card);
    gameBoard.appendChild(card);
  });
}

function revealCard(card) {
  if (lock || card.classList.contains("matched") || card.classList.contains("revealed")) return;

  card.classList.add("revealed");
  card.textContent = card.dataset.word;

  if (!firstCard) {
    firstCard = card;
  } else {
    lock = true;
    if (card.dataset.word === firstCard.dataset.word) {
      card.classList.add("matched");
      firstCard.classList.add("matched");
      setTimeout(() => {
        card.classList.remove("revealed");
        firstCard.classList.remove("revealed");
        card.textContent = "";
        firstCard.textContent = "";
        lock = false;
        firstCard = null;
        checkWin();
      }, 500);
    } else {
      setTimeout(() => {
        card.classList.remove("revealed");
        firstCard.classList.remove("revealed");
        card.textContent = "";
        firstCard.textContent = "";
        firstCard = null;
        lock = false;
      }, 1000);
    }
  }
}

function checkWin() {
  const matchedCards = document.querySelectorAll('.card.matched');
  if (matchedCards.length === board.length) {
    alert("¡Felicidades! Has encontrado todas las acciones.");
  }
}

startGame();
