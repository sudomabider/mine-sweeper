export const drawBoard = (width, height) => {
	return {
		type: "DRAW_BOARD"
	}
}

export const initBoard = (x, y) => {
	return {
		type: "INIT_BOARD",
		x: x,
		y: y
	}
}

export const revealGrid = (x, y) => {
	return {
		type: "REVEAL_GRID",
		x: x,
		y: y
	}
}

export const flagGrid = (x, y) => {
	return {
		type: "FLAG_GRID",
		x: x,
		y: y
	}
}

export const gameOver = (x, y) => {
	return {
		type: "GAME_OVER",
		x: x,
		y: y
	}
}