const board = document.getElementById('board');
const solveBtn = document.getElementById('solve-btn');

// Create the Sudoku grid
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const cell = document.createElement('div');
        cell.classList.add('sudoku-cell');
        cell.contentEditable = true;
        board.appendChild(cell);
    }
}

// Function to check if a number can be placed in a cell
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (
            board[row][i] === num ||
            board[i][col] === num ||
            board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)] === num
        ) {
            return false;
        }
    }
    return true;
}

// Function to solve the Sudoku
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Function to extract the current board state
function extractBoard() {
    const cells = document.querySelectorAll('.sudoku-cell');
    const extractedBoard = new Array(9).fill(null).map(() => new Array(9).fill(0));

    cells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        extractedBoard[row][col] = cell.innerText !== '' ? parseInt(cell.innerText) : 0;
    });

    return extractedBoard;
}

// Function to populate the board with the solved Sudoku
function populateBoard(solvedBoard) {
    const cells = document.querySelectorAll('.sudoku-cell');

    cells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        cell.innerText = solvedBoard[row][col] !== 0 ? solvedBoard[row][col] : ' ';
    });
}

// Event listener for the Solve button
solveBtn.addEventListener('click', () => {
    const currentBoard = extractBoard();
    if (solveSudoku(currentBoard)) {
        populateBoard(currentBoard);
    } else {
        alert('No solution exists for the given Sudoku.');
    }
});
