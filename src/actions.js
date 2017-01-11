export const drawBoard = () => {
	return {
		type: "DRAW_BOARD"
	}
}

export const initBoard = (x, y, mineCont) => {
	return {
		type: "INIT_BOARD",
		x: x,
		y: y
	}
}

export const resetBoard = () => {
	return {
		type: "RESET_BOARD"
	}
}

export const syncBoard = (width, height, mineCount) => {
	return {
		type: "SYNC_BOARD",
		width: width,
		height: height,
		mineCount: mineCount
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