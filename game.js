function createGame({ j0 = '-', j1 = 'x', j2 = 'o', preloadedCoord, debug = false }, onFinished) {
	let board = preloadedCoord || Array.from({ length: 9 }, () => j0);
	let round = j1;

	function play(coord) {
		if (!coordIsEmpty(coord)) {
			printDebug('A coordenada já foi jogada!')
			return false;
		}

		board[coord] = round;
		printDebug(`Jogador da vez: ${round}\nPosição jogada: ${coord}\n${getBoard()}`);
		checkFinished();

		round = round === j1 ? j2 : j1;
		return true;
	}

	function coordIsEmpty(coord) {
		return board[coord] === j0;
	}

	function checkFinished() {
		const winner = getWinner();

		if (winner.player !== j0) {
			printDebug(`Partida finalizada!\nResultado: ${winner.player}`);
			if (onFinished) onFinished(winner);
		}
	}

	function getWinner() {
		const unplayedPositions = board.filter((coord) => coord === j0);
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for (const combination of winningCombinations) {
			const [a, b, c] = combination;
			
			if (board[a] === board[b] && board[b] === board[c])
				return {
					player: board[a],
					combination: combination
				};
		}

		if (unplayedPositions.length === 0) return { player: j1.concat(j2), combination: [] };
		return { player: j0, combination: [] };
	}

	function getBoard() {
		return board.reduce((textBoard, _, i) =>
			textBoard + board[i] + ((i + 1) % 3 === 0 ? '\n' : ' '),
			''
		);
	}

	function reset() {
		round = round === j1 ? j2 : j1;
		board = preloadedCoord || Array.from({ length: 9 }, () => j0);

		printDebug(`Partida reiniciada!\n${getBoard()}`);
	}

	function printDebug(...data) {
		if (debug) console.log(...data);
	}

	return {
		play,
		getBoard,
		getWinner,
		coordIsEmpty,
		getCoords: () => board,
		getTurn: () => round,
		reset: reset,
	};
}

export default createGame;