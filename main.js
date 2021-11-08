const playerCreator = (player, sign, color, turn) => {
	return { player, sign, color, turn };
};

const player1 = playerCreator('Player1', 'X', '#eb4734', true);
const player2 = playerCreator('Player2', 'O', '#202473', false);

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

const gameBoard = (() => {
	let _gameboard = [];

	const checkForWinner = () => {
		turns--;
		let result = winningCombos.find((indices) => {
			if (
				_gameboard[indices[0]] === player1.sign &&
				_gameboard[indices[1]] === player1.sign &&
				_gameboard[indices[2]] === player1.sign
			) {
				winner = player1;
				displayController.displayWinner();

			} else if (
				_gameboard[indices[0]] === player2.sign &&
				_gameboard[indices[1]] === player2.sign &&
				_gameboard[indices[2]] === player2.sign
			) {
				winner = player2;
				displayController.displayWinner();

			} else if (turns === 0 && winner === null) {
				displayController.displayWinner();
			}
		});
		return result;
	};

	// Renders player moves to DOM and checks for winning combo
	const playerTurn = (() => {
		let cells = document.querySelectorAll('.cell');
		cells.forEach((cell) => {
			cell.addEventListener('click', (e) => {
				let square = e.target;
				if (square.textContent === '' && winner === null) {
					if (player1.turn) {
						cell.style.color = player1.color;
						square.textContent = player1.sign;
						player1.turn = false;
						player2.turn = true;
						_gameboard[square.dataset.cellIndex] = player1.sign;
					} else if (player2.turn) {
						cell.style.color = player2.color;
						square.textContent = player2.sign;
						player2.turn = false;
						player1.turn = true;
						_gameboard[square.dataset.cellIndex] = player2.sign;
					}
				}
				checkForWinner();
			});
		});
		return { cells };
	})();

	const resetBoard = () => {
		_gameboard = [];
		player1.turn = true;
		player2.turn = false;
		turns = 9;
		winner = null;

		document.querySelectorAll('.cell').forEach((cell) => {
			cell.textContent = '';
		});
	};

	return { playerTurn, checkForWinner, resetBoard };
})();

const displayController = (() => {
	const gameContainer = document.querySelector('.game-container');
	const startArrows = document.querySelector('.start-arrows');
	const title = document.querySelector('h1');
	let winnerDisplay = document.querySelector('.winner-display');

	const playGame = () => {
		startArrows.classList.add('fadeOut');
		playBtn.classList.add('fadeOut');
		resetBtn.classList.remove('fadeOut');
		gameContainer.classList.remove('fadeOut');
	};

	const displayWinner = () => {
		if (winner) {
			winnerDisplay.textContent = `Winner : ${winner.player} !`;
			winnerDisplay.style.color = winner.color;
			title.classList.add('fadeOut');
			winnerDisplay.classList.remove('fadeOut');

		} else {
			winnerDisplay.textContent = `It's a Tie !`;
			winnerDisplay.style.color = 'black';
			title.classList.add('fadeOut');
			winnerDisplay.classList.remove('fadeOut');
		}
	};

	const resetGame = () => {
		gameBoard.resetBoard();
		title.classList.remove('fadeOut');
		startArrows.classList.remove('fadeOut');
		playBtn.classList.remove('fadeOut');
		resetBtn.classList.add('fadeOut');
		gameContainer.classList.add('fadeOut');
		winnerDisplay.classList.add('fadeOut');
	};

	// Event Listeners
	const playBtn = document.querySelector('.play-btn');
	playBtn.addEventListener('click', playGame);

	const resetBtn = document.querySelector('.reset-btn');
	resetBtn.addEventListener('click', resetGame);

	return { playGame, displayWinner, resetGame };
})();
