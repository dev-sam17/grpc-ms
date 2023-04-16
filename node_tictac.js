// Initialize the game state
let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
let currentPlayer = 'X';

// Function to display the game board
function displayBoard() {
  console.log(` ${board[0][0]} | ${board[0][1]} | ${board[0][2]}`);
  console.log('---+---+---');
  console.log(` ${board[1][0]} | ${board[1][1]} | ${board[1][2]}`);
  console.log('---+---+---');
  console.log(` ${board[2][0]} | ${board[2][1]} | ${board[2][2]}`);
}

// Function to check if the game is over
function checkGameOver() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] !== ' ' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return true;
    }
  }

  // Check diagonals
  if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return true;
  }
  if (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return true;
  }

  // Check for a draw
  let isDraw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === ' ') {
        isDraw = false;
        break;
      }
    }
  }
  return isDraw;
}

// Function to handle player moves
function makeMove(row, col) {
  if (row < 0 || row >= 3 || col < 0 || col >= 3 || board[row][col] !== ' ') {
    console.log('Invalid move. Try again!');
    return;
  }

  board[row][col] = currentPlayer;
  displayBoard();

  if (checkGameOver()) {
    console.log(`Player ${currentPlayer} wins! Game over.`);
    process.exit(0);
  }

  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
}

// Function to start the game
function startGame() {
  console.log('Welcome to Tic-Tac-Toe!');
  console.log('Player X goes first.');

  displayBoard();
  process.stdout.write('Enter row (0-2) for your move: ');
}

// Event listener for handling player input
process.stdin.on('data', (data) => {
  const input = data.toString().trim().split(' ');

  if (input.length !== 2) {
    console.log('Invalid input. Try again!');
    process.stdout.write('Enter row (0-2) for your move: ');
    return;
  }

  const row = parseInt(input[0]);
  const col = parseInt(input[1]);

  makeMove(row, col);
  process.stdout.write(`Player ${currentPlayer}, enter row (0-2) for your move: `);
});

// Start the game
startGame();
