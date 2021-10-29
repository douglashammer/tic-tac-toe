const gameBoard = (() => {
	let _gameboard = ['X', 'O', 'X', 'O', 'O', 'X','O', 'X', 'X'];

	const drawBoard = () => {
    _gameboard.forEach((move, index) => {
      let cell = document.querySelectorAll('.cell')[index];
      cell.textContent = move;
    })
	};

	return {
		drawBoard
	};
})();

gameBoard.drawBoard()