const playerCreator = (player, sign, turn) => {
	return { player, sign, turn };
};

const player1 = playerCreator('Player1', 'X', true);
const player2 = playerCreator('Player2', 'O', false);

let turns = 9;

let winner = null;

const winningCombos = [
	// horizontal wins
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	// vertical wins
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	// diagonal wins
	[0, 4, 8],
	[2, 4, 6],
];

// gameBoard Object (holds player moves and renders moves to DOM)
const gameBoard = (() => {
	let _gameboard = [];

	const checkForWinner = () => {
		turns--;
		let result = winningCombos.some((indices) => {
			if (
				_gameboard[indices[0]] === player1.sign &&
				_gameboard[indices[1]] === player1.sign &&
				_gameboard[indices[2]] === player1.sign
			) {
				winner = player1;
			} else if (
				_gameboard[indices[0]] === player2.sign &&
				_gameboard[indices[1]] === player2.sign &&
				_gameboard[indices[2]] === player2.sign
			) {
				winner = player2;
			} else if (turns === 0 && winner === null) {
				console.log('TIE! NO WINNER')
			}
		});
		console.log(turns);
		console.log(winner);
		return result;
	};

	const playerTurn = (() => {
		let cells = document.querySelectorAll('.cell');
		cells.forEach((cell) => {
			cell.addEventListener('click', (e) => {
				let square = e.target;
				if (square.textContent === '' && winner === null) {
					if (player1.turn) {
						square.textContent = player1.sign;
						player1.turn = false;
						player2.turn = true;
						_gameboard[square.dataset.cellIndex] = player1.sign;
					} else if (player2.turn) {
						square.textContent = player2.sign;
						player2.turn = false;
						player1.turn = true;
						_gameboard[square.dataset.cellIndex] = player2.sign;
					} 
				} else if(turns = 0) {
					console.log('TIE!')
				}
				checkForWinner();
			});
		});
		return { cells };
	})();

	const resetGame = () => {
		_gameboard = [];
		player1.turn = true;
		player2.turn = false;

		winner = null;
		turns = 9;
		console.clear();
	};

	return { playerTurn, checkForWinner, resetGame };
})();

const displayController = (() => {
	clearBoard = () => {
		gameBoard.resetGame();

		document.querySelectorAll('.cell').forEach((cell) => {
			cell.textContent = '';
		});
	};

	// Event Listeners
	const resetBtn = document.getElementById('reset-btn');
	resetBtn.addEventListener('click', clearBoard);

	return { clearBoard };
})();
