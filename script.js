/*----- constants -----*/


/*----- state variables -----*/
let board;
let winner; //winner or loser when passed a certain number of turns (60?)

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
	board = [
		[0, 0, 0, 0], //col 0
		[0, 0, 0, 0], //col 1
		[0, 0, 0, 0], //col 2
		[0, 0, 0, 0], //col 3
		[0, 0, 0, 0], //col 4
		[0, 0, 0, 0], //col 5
	];
	winner = null;
	render();
}

function render() {
	renderBoard();
	renderMessage();
	renderControls();
}

function renderBoard() {
  board.forEach(function(colArr, colIdx) {
    console.log(colIdx, colArr);
  });
}

function renderMessage() {

}

function renderControls() {
	
}