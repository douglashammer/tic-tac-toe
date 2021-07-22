export const gameBoard = () => {
	let gameboard = ['X', 'O', 'O', 'X', 'O', 'X', 'X', 'X', 'O'];

	const board = document.querySelector('.game-container');
	board.addEventListener('click', (e) => {
		console.log(e.target.dataset.cellIndex);
	});
};
