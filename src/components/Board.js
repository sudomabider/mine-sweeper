import React, { PropTypes } from 'react'
import GridContainer from './GridContainer'
import hash from 'object-hash'

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: this.props.width || '',
			height: this.props.height || '',
			mineCount: this.props.mineCount || ''
		}

		this.status = this.status.bind(this);
		this.action = this.action.bind(this);
		this.drawBoard = this.drawBoard.bind(this);
		this.syncInput = this.syncInput.bind(this);
	}

	status() {
		if (this.props.win) {
			return "You won!"
		}

		if (this.props.dead) {
			return "Game over"
		}

		if (!this.props.initiated) {
			return "Waiting for player"
		}

		return 'Timer'
	}

	action() {
		if (typeof this.props.map === 'undefined' || this.props.map.length === 0) {
			return (
				<div id="control">
					<form onSubmit={this.drawBoard}>
						<span className="label">Width</span><input type="number" name="width" value={this.state.width} onChange={this.syncInput} />
						<span className="label">Height</span><input type="number" name="height" value={this.state.height} onChange={this.syncInput} />
						<span className="label">Mines</span><input type="number" name="mineCount" value={this.state.mineCount} onChange={this.syncInput} />
						<button type="submit">Start</button>
					</form>
				</div>
			);
		}

		if (this.props.map.length >0 && !this.props.initiated) {
			return (
				<div id="control">
					<a href="#" onClick={this.props.resetBoard}>Reset</a>
				</div>
			);
		}		

		if (this.props.map.length >0 && this.props.initiated) {
			return (
				<div id="control">
					<a href="#" onClick={this.drawBoard}>Restart</a> | <a href="#" onClick={this.props.resetBoard}>Reset</a>
				</div>
			);
		}
	}

	drawBoard(e) {
		e.preventDefault();
		this.props.drawBoard(this.state.width, this.state.height, this.state.mineCount);
	}

	syncInput(e) {
		let newState = {};
		newState[e.target.name] = parseInt(e.target.value);
		this.setState(newState);
	}

	render() {
		return (
			<div>
				<div id="header">
					<div id="status">{this.status()}</div>
					{this.action()}
				</div>
			
				{this.props.map.map((row) => {
					return (
						<div className="row" key={row[0].position.y}>
						{
							row.map((grid) =>
	  						<GridContainer grid={grid} key={hash.MD5(grid)} 
	  						initBoard={this.props.initBoard} initiated={this.props.initiated} />
							)
						}
						</div>
					)
				})}
			</div>
		)
	}
}

Board.propTypes = {
	map: PropTypes.array.isRequired,
  drawBoard: PropTypes.func.isRequired
}

Board.defaultProps = {
	map: []
}

export default Board