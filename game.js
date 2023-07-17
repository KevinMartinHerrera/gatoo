let currentPlayer = 'X';
let board = [['', '', ''], ['', '', ''], ['', '', '']];
const cells = document.getElementsByClassName('cell');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
let scoreX = 0;
let scoreO = 0;

let selectedCharacterX = '';
let selectedCharacterO = '';

function selectCharacterX(character) {
    selectedCharacterX = character;
    const selectedCharacterXElement = document.getElementById('selectedCharacterX');
    selectedCharacterXElement.src = 'jugadores/' + character;
    selectedCharacterXElement.alt = character;
    highlightSelectedCharacter('X', character);
  }

function selectCharacterO(character) {
  selectedCharacterO = character;
  document.getElementById('selectedCharacterO').src = 'jugadores/' + character;
  highlightSelectedCharacter('O', character);
}

function highlightSelectedCharacter(player, character) {
  const selectedElements = document.querySelectorAll(`.character[data-character="${character}"]`);
  const unselectedElements = document.querySelectorAll(`.character[data-player="${player}"]:not([data-character="${character}"])`);

  selectedElements.forEach(element => {
    element.classList.add('selected');
  });

  unselectedElements.forEach(element => {
    element.classList.remove('selected');
  });
}

function startGame() {
  if (selectedCharacterX && selectedCharacterO) {
    // Aquí puedes agregar el código para iniciar el juego con los personajes seleccionados
    console.log(`Personaje X: ${selectedCharacterX}`);
    console.log(`Personaje O: ${selectedCharacterO}`);
    window.location.href = 'game.html';
  } else {
    alert('Por favor, selecciona un personaje para ambos jugadores.');
  }
}
function makeMove(row, col) {
  if (board[row][col] === '') {
    board[row][col] = currentPlayer;
    const imageSource = currentPlayer === 'X' ? 'jugadores/jorge.png' : 'jugadores/nicky.png';
    cells[row * 3 + col].innerHTML = `<img src="${imageSource}" alt="${currentPlayer}">`;

    if (checkWin(currentPlayer)) {
      alert(`¡${currentPlayer} ha ganado!`);
      updateScore(currentPlayer);
      resetGame();
    } else if (checkTie()) {
      alert("¡Empate!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin(player) {
  for (let i = 0; i < 3; i++) {
    if (
      (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
      (board[0][i] === player && board[1][i] === player && board[2][i] === player) ||
      (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
      (board[0][2] === player && board[1][1] === player && board[2][0] === player)
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function updateScore(player) {
  if (player === 'X') {
    scoreX++;
    scoreXElement.innerText = scoreX;
  } else if (player === 'O') {
    scoreO++;
    scoreOElement.innerText = scoreO;
  }
}

function resetGame() {
  currentPlayer = 'X';
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
  }
}


  