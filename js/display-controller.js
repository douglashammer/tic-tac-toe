export const displayController = (() => {

  const board = document.querySelector('.game-container');
	board.addEventListener('click', (e) => {
		console.log(e.target.dataset.cellIndex);
	});

})();