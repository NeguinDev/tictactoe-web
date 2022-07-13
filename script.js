import ttt from './game.js';
const blocks = document.querySelectorAll('.block');
const msgTurn = document.querySelector('h3');

const game = ttt({ j1: 'X', j2: 'O', debug: false }, (winner) => {
	if (winner.player === 'XO') msg('Deu Velha!');
	else msg.innerHTML = msg('Ganhador: '+winner.player, 'success');

	game.reset();
	
	blocks.forEach((block, index) => {
		if (winner.combination.includes(index)) block.style.backgroundColor = '#0f0';
		block.onclick = "";

		setTimeout(() => {
			block.innerHTML = '';
			block.style.backgroundColor = '#fff';
			block.onclick = () => play(index);
		}, 2000);
	});
});

blocks.forEach((block, index) => block.onclick = () => play(index));

function play(index) {
	if (!game.coordIsEmpty(index)) return msg('Posição já ocupada!', 'error');

	const turn = game.getTurn();
	blocks[index].innerHTML = turn;

	game.play(index);
	msgTurn.innerHTML = 'Vez de: ' + game.getTurn();
}

function msg(text, type) {
	const element = document.querySelector('h2');
	element.innerHTML = text;
	let color = '#ff0';
	switch (type) {
		case 'error': color = '#f00'; break;
		case 'success': color = '#0f0'; break;
	}

	element.style.color = color;
	setTimeout(() => element.innerHTML = '', 2000);
}