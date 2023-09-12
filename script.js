const mainBoard = document.querySelector('[data-board]');

const overlay = document.getElementById('gameEndOverlay');
// Assuming you have a reference to the overlay in a variable called 'overlay'
function endGame(message) {
    overlay.textContent = message; // Set the end game message
    overlay.classList.add('show-overlay'); // Trigger the animation
}

function hideOverlay() {
    overlay.classList.remove('show-overlay');
}


// Create the 9 mini-boards
for (let i = 0; i < 9; i++) {
    const miniBoard = document.createElement('div');
    miniBoard.classList.add('mini-board');
    for (let j = 0; j < 9; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell', '');
        miniBoard.appendChild(cell);
    }
    mainBoard.appendChild(miniBoard);
}

const miniBoards = document.querySelectorAll('.mini-board');


const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let activeBoard = null;

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {


    const cell = event.target;
    const miniBoard = cell.parentElement;

    console.log("Cell clicked. Current player:", currentPlayer);

    // If there's an activeBoard set, ensure the move is made within it
    if (activeBoard && miniBoard !== activeBoard) {
        console.log("Invalid board. Exiting function.");
        return;
    }

    // Check if the move is valid within the mini-board
    if (cell.textContent) {
        console.log("Cell already occupied. Exiting function.");
        return;
    }

    // Check if the move is valid
    if (cell.textContent || miniBoard.getAttribute('data-winner') || (activeBoard && miniBoard !== activeBoard)) {
        console.log("Invalid move. Exiting function.");
        return;
    }


    cell.textContent = currentPlayer;

    // Add the class for styling
    if (currentPlayer === 'X') {
        cell.classList.add('x');
    } else {
        cell.classList.add('o');
    }

    // Check for win in the mini-board
    if (checkWin(miniBoard, currentPlayer)) {
        miniBoard.setAttribute('data-winner', currentPlayer);
        miniBoard.classList.add(`won-by-${currentPlayer.toLowerCase()}`);
    }


    // Check for win in the main board
    if (checkWin(mainBoard, currentPlayer)) {
        endGame(`${currentPlayer} Wins the Game!`);
        location.reload();
        return;
    }

    function checkDraw() {
        // Check if all cells in the main board are filled
        const allCellsFilled = Array.from(cells).every(cell => cell.textContent);
    
        // If all cells are filled and no player has won on the main board, it's a draw
        return allCellsFilled && !checkWin(mainBoard, 'X') && !checkWin(mainBoard, 'O');
    }
    

    if (checkDraw()) {
        endGame('It\'s a Draw!');
        setTimeout(() => {
            location.reload();
        }, 3000);  // 3 seconds delay
        return;
    }
    if (activeBoard)
    {
        activeBoard.setAttribute('data-active', 'false');
    }
    // Set the next active board based on the cell that was clicked
    const cellIndex = Array.from(cell.parentElement.children).indexOf(cell);
    if (!miniBoards[cellIndex].getAttribute('data-winner') && !Array.from(miniBoards[cellIndex].children).every(c => c.textContent)) {
        activeBoard = miniBoards[cellIndex];
        // Assuming you have a reference to the active board in a variable called 'activeBoard'
        activeBoard.setAttribute('data-active', 'true');

    } else {
        activeBoard = null;  // If the target mini-board is won or full, allow any board to be played
    }

    // Switch the player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    console.log("Player switched to:", currentPlayer);
}

function checkWin(board, player) {
    const cells = board.querySelectorAll('.cell');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

overlay.addEventListener('click', hideOverlay);
