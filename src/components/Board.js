import React, { PropTypes } from 'react'
import GridContainer from './GridContainer'
import hash from 'object-hash'

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: this.props.width || '',
			height: this.props.height || '',
			mineCount: this.props.mineCount || '',
			errors: []
		}

		this.status = this.status.bind(this);
		this.action = this.action.bind(this);
		this.control = this.control.bind(this);
		this.drawBoard = this.drawBoard.bind(this);
		this.syncInput = this.syncInput.bind(this);
		this.errors = this.errors.bind(this);
		this.addErrors = this.addErrors.bind(this);
		this.clearErrors = this.clearErrors.bind(this);
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

		return 'Timer | Flags:' + this.props.flags
	}

	errors() {
		if (this.state.errors.length === 0) {
			return;
		}

		return (
			<ul className="errors" style={{listStyle: "none"}}>
				{this.state.errors.map((error) => {
					return (<li key={hash.MD5(error)}>{error}</li>)
				})}
			</ul>
		)
	}

	addErrors(errors) {
		this.setState({
			errors: errors
		})
	}

	clearErrors() {
		this.setState({
			errors: []
		})
	}

	action() {
		if (!this.props.initiated) {
			return (
				<a href="#" onClick={this.props.resetBoard}>Reset</a>
			);
		}

		return (
			<span><a href="#" onClick={this.drawBoard}>Restart</a> | <a href="#" onClick={this.props.resetBoard}>Reset</a></span>
		);
	}

	control() {
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

		if (this.props.map.length > 0) {
			return (
				<div id="control">
					<span className="label">Board:</span>
					<span className="control">{this.state.width} x {this.state.height}</span>
					<span className="label">Mines:</span>
					<span className="control">{this.state.mineCount}</span>
					{this.action()}
				</div>
			);
		}
	}

	drawBoard(e) {
		e.preventDefault();

		this.clearErrors();

		let errors = [];

		if (typeof this.state.width === 'undefined' || this.state.width <= 1) {
			errors.push("Width must be greater than 1");
		}

		if (typeof this.state.height === 'undefined' || this.state.height <= 1) {
			errors.push("Height must be greater than 1");
		}

		if (errors.length > 0) {
			this.addErrors(errors);
			return false;
		}

		const mineMax = this.state.width * this.state.height - 2;

		if (typeof this.state.mineCount === 'undefined' || this.state.mineCount < 2 || this.state.mineCount > mineMax) {
			errors.push("Mines must be at least 2 and at most " + mineMax);
		}

		if (errors.length > 0) {
			this.addErrors(errors);
			return false;
		}

		this.props.drawBoard(this.state.width, this.state.height, this.state.mineCount);
	}

	syncInput(e) {
		let newState = {};
		newState[e.target.name] = parseInt(e.target.value, 10);
		this.setState(newState);
	}

	render() {
		return (
			<div>
				<div id="header">
					<div id="status">{this.status()}</div>
					{this.control()}
				</div>

				{this.errors()}
			
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