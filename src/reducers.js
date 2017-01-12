const randomIntFromInterval = (min,max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const markGridAsMine = (map, x, y) => {
	map[y][x].isMine = true;
	return map;
}

const markGridAsClicked = (map, x, y) => {
	map[y][x].isClicked = true;
	return map;	
}

const selectRandomGridFromMap = (map, exceptX, exceptY) => {
	let y = '';
	let x = '';

	do {
		do {
			y = randomIntFromInterval(0, map.length);
		} while (map[y].length === 0);
		do {
			x = randomIntFromInterval(0, map[y].length);
		} while (typeof map[y][x] === 'undefined' || map[y][x] === false)
	} while (x === exceptX && y === exceptY)

	return {x: x, y: y};
}

const layMinesInMap = (map, count, exceptX, excepty) => {
	let grids = [];

	for (let i = 0; i < count; i++) {
		const current = selectRandomGridFromMap(map, exceptX, excepty);
		map = markGridAsMine(map, current.x, current.y);
		grids.push(current);
	}

	return grids;
}

const calculateNeighboringMines = (map, x, y) => {
	const positions = [
		{x: x-1, y: y-1},
		{x: x, y: y-1},
		{x: x+1, y: y-1},
		{x: x-1, y: y},
		{x: x+1, y: y},
		{x: x-1, y: y+1},
		{x: x, y: y+1},
		{x: x+1, y: y+1}
	];

	let count = 0;
	for (const position of positions) {
		if (typeof map[position.y] !== 'undefined' && typeof map[position.y][position.x] !== 'undefined' && map[position.y][position.x].isMine) {
			count++;
		}
	}
	map[y][x].number = count;

	if (count === 0) {
		map[y][x].isBlock = true;
		for (const position of positions) {
			if (typeof map[position.y] !== 'undefined' && typeof map[position.y][position.x] !== 'undefined') {
				map[position.y][position.x].isBlock = true;
			}
		}
	}
}

const layNumbersInMap = (map) => {
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (!map[y][x].isMine) {
				calculateNeighboringMines(map, x, y);
			}
		}
	}
}


const drawBoard = (width, height) => {
	let map = [];

	for (let y = 0; y < height; y++) {
		map[y] = [];
		for (let x = 0; x < width; x++) {
			map[y][x] = {
				position: {
					x: x,
					y: y,
				},
				isMine: false,
				isRevealed: false,
				isMarked: false,
				isBlock: false,
				isFlagged: false,
				number: ''
			}
		}
	}

	return map;
}

const initBoard = (map, x, y, mineCount) => {
	map = markGridAsClicked(map, x, y);
	layMinesInMap(map, mineCount, x, y);
	layNumbersInMap(map);

	return map;
}



const revealGrid = (map, x, y) => {
	if (!map[y][x].isRevealed) {
		map[y][x].isRevealed = true;
	}

	if (!map[y][x].isBlock) {
		return map;
	}

	let right = x+1;
	if (typeof map[y][right] !== 'undefined' && map[y][right].isBlock && !map[y][right].isRevealed) {
		revealGrid(map, right, y);
	}

	let left = x-1;
	if (typeof map[y][left] !== 'undefined' && map[y][left].isBlock && !map[y][left].isRevealed) {
		revealGrid(map, left, y);
	}

	let top = y-1;
	if (typeof map[top] !== 'undefined' && typeof map[top][x] !== 'undefined' && map[top][x].isBlock && !map[top][x].isRevealed) {
		revealGrid(map, x, top);
	}

	let bottom = y+1;
	if (typeof map[bottom] !== 'undefined' && typeof map[bottom][x] !== 'undefined' && map[bottom][x].isBlock && !map[bottom][x].isRevealed) {
		revealGrid(map, x, bottom);
	}

	return map;
}

const flagGrid = (map, x, y) => {
	map[y][x].isFlagged = !map[y][x].isFlagged;
	return map;
}

const killBoard = (map, x, y) => {
	for (let row of map) {
		for (let grid of row) {
			if (!grid.isRevealed) {
				grid.isRevealed = true
			}
			if (grid.isFlagged && !grid.isMine) {
				grid.isFlagged = false;
				grid.warning = true;
			}
		}
	}

	if (x && y) {
		map[y][x].error = true;
	}

	return map;
}

const calculateWin = (map) => {
	for (const row of map) {
		for (const grid of row) {
			if (!grid.isMine && !grid.isRevealed) {
				return false;
			}
		}
	}

	return true;
}

export const gridReducer = (state = {}, action) => {
  	switch (action.type) {
    	case 'CLICK_GRID':
      		return state
    	default:
      		return state
  	}
}

const initialBoardState = {
	map: [],
	initiated: false,
	dead: false,
	win: false,
	width: null,
	height: null,
	mineCount: null,
	flags: 0
}

export const boardReducer = (state = initialBoardState, action) => {
	switch (action.type) {
		case 'DRAW_BOARD':
			return Object.assign({}, state, {
				map: drawBoard(state.width, state.height),
				dead: false,
				win: false,
				initiated: false
			})
		case 'INIT_BOARD':
			return Object.assign({}, state, {
				map: initBoard(state.map.slice(), action.x, action.y, state.mineCount),
				initiated: true,
				dead: false,
				win: false
			})
		case 'RESET_BOARD':
			return Object.assign({}, initialBoardState, {
				width: state.width,
				height: state.height,
				mineCount: state.mineCount
			})
		case 'SYNC_BOARD':
			return Object.assign({}, state, {
				width: action.width,
				height: action.height,
				mineCount: action.mineCount,
			})
		case 'REVEAL_GRID':
			return Object.assign({}, state, {
				map: revealGrid(state.map.slice(), action.x, action.y),
				win: calculateWin(state.map.slice())
			})
		case 'FLAG_GRID':
			const flags = state.map[action.y][action.x].isFlagged ? (state.flags - 1) : (state.flags + 1);
			return Object.assign({}, state, {
				map: flagGrid(state.map.slice(), action.x, action.y),
				flags: flags
			})
		case 'GAME_OVER':
			return Object.assign({}, state, {
				map: killBoard(state.map.slice(), action.x, action.y),
				dead: true,
				win: false
			})
		default:
			return state
	}
}